import chalk from "chalk";
import figlet from "figlet";
import fs from "fs/promises";
import path from "path";
import upload from "./upload.js";

const displayBanner = () => {
  console.log(
    chalk.cyan(
      figlet.textSync("Makmum Airdrop", {
        font: "Slant",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    )
  );
  console.log(chalk.bgBlue("Created by https://t.me/hakaringetroll"));
  console.log("Join To get Info airdrop : https://t.me/makmum");
};

const clearTmpFolder = async () => {
  const tmpDir = "./temp"; // Sesuaikan dengan path folder tmp
  try {
    const files = await fs.readdir(tmpDir);
    for (const file of files) {
      const filePath = path.join(tmpDir, file);
      await fs.unlink(filePath);
      console.log(chalk.magenta(`🗑️ Deleted: ${filePath}`));
    }
  } catch (error) {
    console.log(chalk.red("❌ Error deleting files in tmp folder: "), error);
  }
};

const main = async () => {
  displayBanner();

  const wallet = (await fs.readFile("priv.txt", "utf-8"))
    .replace(/\r/g, "")
    .split("\n")
    .filter(Boolean);

  for (let i = 0; i < wallet.length; i++) {
    try {
      const px = wallet[i];
      console.log(chalk.yellow("🚀 Starting Create and Upload Random file text"));
      
      const uploadMessage = await upload(px);
      console.log(chalk.green(uploadMessage.message));
      console.log(chalk.green(uploadMessage.rootHash));

    } catch (error) {
      console.log(chalk.red("❌ Error occurred, skipping to next wallet: "), error);
    }

    // Hapus semua file di dalam folder tmp sebelum lanjut ke wallet berikutnya
    await clearTmpFolder();
  }

  console.log(chalk.green("✅ Semua wallet selesai diproses!"));
  
  // Kill script setelah selesai
  process.exit(0);
};

main();

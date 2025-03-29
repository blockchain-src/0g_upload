import { Indexer, ZgFile } from "@0glabs/0g-ts-sdk";
import fs from "fs";
import dotenv from "dotenv";
import wallet from "./handle.js";
import crypto from "crypto";
import { join } from "path";
import axios from "axios";

dotenv.config();

// Fetch random username using the randomuser.me API
async function getRandomUsername() {
  try {
    const response = await axios.get("https://randomuser.me/api/?inc=login&noinfo");
    const username = response.data.results[0].login.username; // Extract the username from the response
    return username; // Return the username to use as the file name
  } catch (error) {
    console.error("❌ Failed to fetch random username:", error);
    return "random_file"; // Default if it fails
  }
}

const upload = async (px) => {
  try {
    const { rpcUrl, signer } = await wallet(px);

    function generateSessionHash() {
      return crypto.randomBytes(8).toString("hex");
    }

    const sessionHash = generateSessionHash();
    const compressedBuffer = Buffer.from(sessionHash, "utf-8");

    const randomFileName = await getRandomUsername(); // Fetch random username for the file name
    const tempFilePath = join(`temp`, `${randomFileName}.txt`);

    await fs.promises.writeFile(tempFilePath, compressedBuffer);
    console.log(`✅ Success create Random file text: ${tempFilePath}`);

    const indexer = new Indexer(`https://indexer-storage-testnet-turbo.0g.ai`);
    const zgFile = await ZgFile.fromFilePath(tempFilePath);
    const [tree, treeErr] = await zgFile.merkleTree();

    if (treeErr) {
      console.log(`❌ Failed to create Merkle tree Root File: ${treeErr.message}`);
    } else {
      console.log(`✅ Success create Merkle tree Root File: ${tree.root}`);
    }

    console.log("Wait to Uploading file... 🚀");

    const [tx, txErr] = await indexer.upload(zgFile, rpcUrl, signer);
    if (txErr !== null) {
      console.log(`❌ Failed to upload file: ${txErr.message}`);
    } else {
      const rootHash = tree?.rootHash();
      return {
        message: `File uploaded successfully, https://chainscan-newton.0g.ai/tx/${tx}`,
        rootHash: `Your root hash: ${rootHash}`,
      };
    }
  } catch (error) {
    console.error("❌ Error saat mengunggah file:", error);
  }
};

export default upload;

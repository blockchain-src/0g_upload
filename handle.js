import Web3 from "web3";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
const wallet = async (px) => {
  const rpcUrl = `https://hidden-winter-fire.0g-newton.quiknode.pro/8af0e7ad0ff310122248671fb0169147b6cab49d/`;
  const web3 = new Web3(rpcUrl);
  const privateKey = px;
  const formattedPrivateKey = privateKey.startsWith("0x")
    ? privateKey
    : "0x" + privateKey;
  const account = web3.eth.accounts.privateKeyToAccount(formattedPrivateKey);
  web3.eth.accounts.wallet.add(account);
  const providers = new ethers.JsonRpcProvider(rpcUrl);
  return {
    account: account,
    web3: web3,
    privateKey: formattedPrivateKey,
    providers: providers,
    signer: new ethers.Wallet(formattedPrivateKey, providers),
    rpcUrl: rpcUrl,
  };
};

export default wallet;

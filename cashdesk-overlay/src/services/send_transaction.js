import {Contract, JsonRpcProvider, Wallet} from "ethers";
import PurchaseOrderABI from '../contracts/PurchaseOrder.json'; // Adjust the path as needed

export default async function sendTransactionFromCsvRow(csvRow, buyerAddress) {
    const PRIVATE_KEY = localStorage.getItem('privateKey')
    const contractAddress = localStorage.getItem("contractAddress");
    const sellerName = localStorage.getItem("sellerName");
    const RPC_URL = process.env.REACT_APP_RPC_URL || "https://hardhat.elunesoft.com";
    const [productId, productName, currency, price] = csvRow.split(',');
    console.log(
        productId,
        productName,
        currency,
        price,
        buyerAddress,
        sellerName
    )
    try {
        const provider = new JsonRpcProvider(RPC_URL);
        const wallet = new Wallet(PRIVATE_KEY, provider);
        const contract = new Contract(contractAddress, PurchaseOrderABI.abi, wallet);

        // Send the transaction without waiting for it to be mined
        const tx = await contract.createPurchase(productId, productName, currency, parseInt(price), buyerAddress, sellerName);

        console.log(`Transaction sent for product ID: ${productId}, Product Name: ${productName}, Buyer Address: ${buyerAddress}, Seller: ${sellerName}. Transaction hash: ${tx.hash}`);

        // Optionally, you can return the transaction hash
        return tx.hash;
    } catch (error) {
        console.error("Failed to send transaction:", error.message);
        throw new Error("Failed to send transaction: " + error.message);
    }
}
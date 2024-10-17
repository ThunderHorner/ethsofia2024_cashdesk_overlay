import {Contract, JsonRpcProvider, Wallet} from "ethers";
import PurchaseOrderABI from '../contracts/PurchaseOrder.json'; // Adjust the path as needed

export default async function sendTransactionFromCsvRow(csvRow, buyerAddress) {
    const PRIVATE_KEY = localStorage.getItem('privateKey')
    const contractAddress = localStorage.getItem("contractAddress");
    const RPC_URL = process.env.REACT_APP_RPC_URL || "https://hardhat.elunesoft.com";
    const [productId, productName, currency, price, sellerName] = csvRow.split(',');
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
        const tx = await contract.createPurchase(productId, productName, currency, parseInt(price), buyerAddress, sellerName);
        await tx.wait();
        console.log(`Purchase created for product ID: ${productId}, Product Name: ${productName}, Buyer Address: ${buyerAddress}, Seller: ${sellerName}.`);
    } catch (error) {
        console.error("Failed to send transaction:", error.message);
        throw new Error("Failed to send transaction: " + error.message);
    }
}

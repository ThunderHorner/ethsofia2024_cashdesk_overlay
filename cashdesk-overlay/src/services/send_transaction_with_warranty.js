import {Contract, JsonRpcProvider, Wallet} from "ethers";
import PurchaseOrderABI from '../contracts/PurchaseOrderWithWarranty.json'; // Adjust the path as needed

export default async function sendTransactionFromWithWarrantyCsvRow(csvRow, buyerAddress) {
    const PRIVATE_KEY = localStorage.getItem('privateKey')
    const contractAddress = '0x1f10F3Ba7ACB61b2F50B9d6DdCf91a6f787C0E82';// localStorage.getItem("contractAddress");
    const sellerName = localStorage.getItem("sellerName");
    const RPC_URL = process.env.REACT_APP_RPC_URL || "https://hardhat.elunesoft.com";
    const [productId, currency, serialNumber,expirationDate, price, productName] = csvRow.split(',');

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
        const tx = await contract.createPurchase(productId, productName, currency,serialNumber, parseInt(price), buyerAddress, sellerName, expirationDate);

        console.log(`Transaction sent for product ID: ${productId}, Product Name: ${productName}, Buyer Address: ${buyerAddress}, Seller: ${sellerName}. Transaction hash: ${tx.hash}`);

        // Optionally, you can return the transaction hash
        return tx.hash;
    } catch (error) {
        console.error("Failed to send transaction:", error.message);
        throw new Error("Failed to send transaction: " + error.message);
    }
}
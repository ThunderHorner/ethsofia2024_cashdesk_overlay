import {useState, useEffect} from "react";
import {Button, TextField} from "@mui/material";
import sendTransactionFromCsvRow from "../services/send_transaction";

export default function CustomerWalletPrompt(message) {
    const [customerWallet, setCustomerWallet] = useState("0x976EA74026E726554dB657fA54763abd0C3a0aa9")

    function sendContract() {
        sendTransactionFromCsvRow(message.message, customerWallet)
            .then(() => console.log("Transaction successful"))
            .catch((err) => console.error("Transaction failed", err));
    }

    return (
        <div>
            <p className="mx-0 mt-5 mb-5 h3 fw2 text-center">Setup Wallet</p>
            <TextField
                value={customerWallet} // Use value from state
                onChange={(e) => setCustomerWallet(e.target.value)}
                className="w-100 ml-5 mt-3"
                label="Customer wallet address"
                variant="outlined"
            />
            <div className={'d-flex justify-center w-100'}>
                <Button
                    variant="outlined"
                    onClick={sendContract}
                    className="px-5 mt-5 py-2 mx-auto"
                >
                    Ok
                </Button>
            </div>

        </div>
    );
}

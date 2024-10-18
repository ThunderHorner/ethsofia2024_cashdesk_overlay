import {Button, TextField} from "@mui/material";
import sendTransactionFromCsvRow from "../services/send_transaction";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function CustomerWalletPromptWithParams() {
    const [customerWallet, setCustomerWallet] = useState("0xcd3B766CCDd6AE721141F452C550Ca635964ce71");
    const [message, setMessage] = useState('')
    const location = useLocation();
    const navigator = useNavigate()
    // Function to parse the query parameters from the URL
    const getQueryParams = (search) => {
        const params = new URLSearchParams(search);
        return {
            msg: params.get("msg"), // Assuming the parameter is 'wallet'
        };
    };

    useEffect(() => {
        const queryParams = getQueryParams(location.search);
        console.log(queryParams.msg)
        if (queryParams.msg) {
            setMessage(queryParams.msg); // Set customer wallet from query param
        }
    }, [location.search]);
    const sendContract = () => {
        sendTransactionFromCsvRow(message, customerWallet)
            .then(() => {
                console.log("Transaction initiated");
                window.close()
            })
            .catch((err) => {
                console.error("Transaction failed", err);
            });

        // Immediately reload the page after initiating the transaction
        // window.location.reload();
    };
    return (
        <div>
            <p className="mx-0 mt-5 mb-5 h3 fw2 text-center">Customer's wallet</p>
            <TextField
                value={customerWallet}
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

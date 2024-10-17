import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";

export default function SetupWallet() {
    const [account, setAccount] = useState("");
    const [privateKey, setPrivateKey] = useState("");

    // Use useEffect to update state from localStorage when the component mounts
    useEffect(() => {
        const storedAccount = localStorage.getItem("account");
        const storedPrivateKey = localStorage.getItem("privateKey");

        if (storedAccount) setAccount(storedAccount);
        if (storedPrivateKey) setPrivateKey(storedPrivateKey);
    }, []);

    function UpdateWallet() {
        console.log(privateKey);
        localStorage.setItem("privateKey", privateKey);
    }

    return (
        <div>
            <p className="mx-0 mt-5 mb-5 h3 fw2 text-center">Setup Wallet</p>
            <div className="d-flex justify-between">
                <TextField
                    id="private_key"
                    value={privateKey} // Use value from state
                    onChange={(e) => setPrivateKey(e.target.value)}
                    className="w-100 ml-5"
                    label="Private Key"
                    variant="outlined"
                    // type={'password'}
                />
                <Button
                    variant="outlined"
                    onClick={UpdateWallet}
                    className="px-5"
                >
                    Save
                </Button>
            </div>
        </div>
    );
}

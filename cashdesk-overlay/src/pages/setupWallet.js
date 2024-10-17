import {useState, useEffect} from "react";
import {Button, TextField} from "@mui/material";

export default function SetupWallet() {
    const [account, setAccount] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [contractAddress, setContractAddress] = useState("")
    // Use useEffect to update state from localStorage when the component mounts
    useEffect(() => {
        const storedAccount = localStorage.getItem("account");
        const storedPrivateKey = localStorage.getItem("privateKey");
        const storedContractAddress = localStorage.getItem("contractAddress");

        if (storedAccount) setAccount(storedAccount);
        if (storedPrivateKey) setPrivateKey(storedPrivateKey);
        if (storedContractAddress) setContractAddress(storedContractAddress);
    }, []);

    function UpdateWallet() {
        localStorage.setItem("privateKey", privateKey);
        localStorage.setItem("contractAddress", contractAddress);
    }

    return (
        <div>
            <p className="mx-0 mt-5 mb-5 h3 fw2 text-center">Setup Wallet</p>
            <TextField
                value={privateKey} // Use value from state
                onChange={(e) => setPrivateKey(e.target.value)}
                className="w-100 ml-5 mt-3"
                label="Private Key"
                variant="outlined"
                // type={'password'}
            />
            <TextField
                value={contractAddress} // Use value from state
                onChange={(e) => setContractAddress(e.target.value)}
                className="w-100 ml-5 mt-3"
                label="Contract address"
                variant="outlined"
                // type={'password'}
            />
            <div className={'d-flex justify-center w-100'}>
                <Button
                    variant="outlined"
                    onClick={UpdateWallet}
                    className="px-5 mt-5 py-2 mx-auto"
                >
                    Save
                </Button>
            </div>

        </div>
    );
}

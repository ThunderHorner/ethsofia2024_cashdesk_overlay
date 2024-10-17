import {useState, useEffect} from "react";
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function SetupWallet() {
    const [sellerName, setSellerName] = useState("TEst seller name");
    const [privateKey, setPrivateKey] = useState("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
    const [contractAddress, setContractAddress] = useState("0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1")
    const navigator = useNavigate()
    // Use useEffect to update state from localStorage when the component mounts
    useEffect(() => {
        const storedSellerName = localStorage.getItem("sellerName");
        const storedPrivateKey = localStorage.getItem("privateKey");
        const storedContractAddress = localStorage.getItem("contractAddress");

        if (storedSellerName) setSellerName(storedSellerName);
        if (storedPrivateKey) setPrivateKey(storedPrivateKey);
        if (storedContractAddress) setContractAddress(storedContractAddress);
    }, []);

    function UpdateWallet() {
        localStorage.setItem("privateKey", privateKey);
        localStorage.setItem("contractAddress", contractAddress);
        localStorage.setItem("sellerName", sellerName);
        if (window.location.href == 'http://localhost:3000/settings/') {
            navigator('/')
        } else {
            window.location.reload()
        }
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
                value={sellerName} // Use value from state
                onChange={(e) => setSellerName(e.target.value)}
                className="w-100 ml-5 mt-3"
                label="SellerName"
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

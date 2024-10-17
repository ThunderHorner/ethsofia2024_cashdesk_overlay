import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {Button} from "@mui/material";
import sendTransactionFromCsvRow from "../services/send_transaction";
import CustomerWalletPrompt from "../pages/customerWalletPrompt";

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [socket, setSocket] = useState(null);
    const [lastMessage, setLastMessage] = useState(null)

    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        newSocket.on('message', (message) => {
            console.log('Received message:', message);  // Add a log to see the message
            setMessages((prevMessages) => [...prevMessages, message]);
            setLastMessage(message)
            // return <CustomerWalletPrompt message={message}></CustomerWalletPrompt>
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (socket) {
            socket.emit('message', 'ok');
        }
    };

    if(lastMessage){
        return <CustomerWalletPrompt message={lastMessage}></CustomerWalletPrompt>
    }
    return (
        <div>
            <h2 className={'text-center'}>Tasks</h2>
            <Button
                variant="outlined"
                onClick={sendMessage}
                className="my-5 w-100"
            >
                Ok
            </Button>

            <p>Tasks:</p>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketComponent;

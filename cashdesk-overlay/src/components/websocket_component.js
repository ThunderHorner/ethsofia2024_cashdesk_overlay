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
    const [dots, setDots] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots < 3 ? prevDots + 1 : 1)); // Cycle through 1 to 3 dots
        }, 200); // Update every second

        return () => clearInterval(interval); // Clear the interval on component unmount
    }, []);

    // Create the string with dots and replace dots with &nbsp; for the remaining spaces
    const dotText = '.'.repeat(dots) + '\u00A0'.repeat(3 - dots);

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
            <h2 className={'text-center my-5'}>Listening{dotText}</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketComponent;

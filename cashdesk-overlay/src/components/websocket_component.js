import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import CustomerWalletPrompt from "../pages/customerWalletPrompt";

const WebSocketComponent = () => {
    const [lastMessage, setLastMessage] = useState(null)
    const [dots, setDots] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots < 3 ? prevDots + 1 : 1));
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const dotText = '.'.repeat(dots) + '\u00A0'.repeat(3 - dots);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');

        newSocket.on('message', (message) => {
            console.log('Received message:', message);
            setLastMessage(message)
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);


    if (lastMessage) {
        return <CustomerWalletPrompt message={lastMessage}></CustomerWalletPrompt>
    }
    return (
        <div>
            <h2 className={'text-center my-5'}>Listening{dotText}</h2>
        </div>
    );
};

export default WebSocketComponent;

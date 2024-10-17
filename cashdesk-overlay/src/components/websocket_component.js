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


    return (
        <div>
            <h2 className={'text-center my-5'}>Listening{dotText}</h2>
        </div>
    );
};

export default WebSocketComponent;

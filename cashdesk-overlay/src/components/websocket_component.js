import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Listen for messages from the server
    newSocket.on('message', (message) => {
      console.log('Received message:', message);  // Add a log to see the message
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Function to send a message to the server
  const sendMessage = () => {
    if (socket && inputValue) {
      socket.emit('message', inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <h2>Socket.IO Client</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a message"
      />
      <button onClick={sendMessage}>Send Message</button>

      <h3>Messages:</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;

import React, { useState } from 'react';

const ChatSupport = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'Thanks for reaching out! We will respond shortly.', sender: 'bot' }]);
    }, 1000);
    setInput('');
  };

  return (
    <div className="chat-box">
      <h3>Chat Support</h3>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-msg ${msg.sender}`}>{msg.text}</div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button style={{padding:"5px",borderRadius:"3px",backgroundColor:"green",color:"white"}} onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatSupport;
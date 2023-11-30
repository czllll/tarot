import React, { useState } from 'react';
import './Chat.css'; // 引入样式文件

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      const userMessage = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      try {
        const response = await fetch('http://127.0.0.1:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "message": input }) // 向后端发送用户输入的消息
        });
        console.log("22222");

        const data = await response.json();
        const answer = data.message; // 从后端获取的回答
        console.log(answer);
        const assistantMessage = { role: 'assistant', content: answer };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
        console.error('Error:', error);
      }
      
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="输入你的问题..."
          className="input-field" // 添加样式类名
        />
        <button type="submit" className="submit-button">发送</button>
      </form>
    </div>
  );
}

export default Chat;

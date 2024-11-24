import React, { useState } from 'react';
import './ChatMessages.css';

export default function ChatMessages({ room, setActiveChat }) {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const messageToSend = {
                id: `msg${room.messages.length + 1}`,
                text: newMessage,
                timestamp: timestamp,
                sent: true,
            };

            room.messages.push(messageToSend);
            setNewMessage('');
            setActiveChat({ ...room });

            // Simulate a reply after 4 seconds
            setTimeout(() => {
                const simulatedReply = {
                    id: `msg${room.messages.length + 2}`,
                    text: 'I am great.',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    sent: false,
                };

                room.messages.push(simulatedReply);
                setActiveChat({ ...room });
            }, 4000);
        }
    };

    return (
        <div className='chat-messages'>
            <h5>{room.name}</h5>
            <div className='contact-info'>{room.contactInfo}</div>
            <div className='messages-list'>
                {room.messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.sent ? 'sent' : 'received'}`}
                    >
                        <div className='message-text'>{message.text}</div>
                        <div className='message-timestamp'>{message.timestamp}</div>
                    </div>
                ))}
            </div>
            <div className='input-area'>
                <input
                    type='text'
                    placeholder='Type a message...'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

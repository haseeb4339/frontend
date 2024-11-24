import React from 'react';
import './ChatItem.css'; // Import CSS for styling

export default function ChatItem({ room, activeChat, setActiveChat }) {
    return (
        <div
            className={`chat-item ${activeChat && activeChat.id === room.id ? 'active' : ''}`}
            onClick={() => setActiveChat(room)}
        >
            <h6>{room.name}</h6>
            <p>{room.messages[room.messages.length - 1].text}</p>
        </div>
    );
}

import React from 'react';
import ChatItem from './ChatItem';
import './ChatList.css'; // Import the CSS file for styles

export default function ChatList({ rooms, activeChat, setActiveChat }) {
    return (
        <div className='chat-list primary-light-bg p-3'>
            <h5>Chats</h5>
            <div className='custom-scrollbar mt-2'>
                {rooms.map((room) => (
                    <ChatItem
                        key={room.id}
                        room={room}
                        activeChat={activeChat}
                        setActiveChat={setActiveChat}
                    />
                ))}
            </div>
        </div>
    );
}

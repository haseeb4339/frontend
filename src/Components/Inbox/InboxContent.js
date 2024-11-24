import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatMessages from './ChatMessages';

export default function InboxContent() {
  const [rooms, setRooms] = useState([
    {
      id: '1',
      name: 'Kristen J.',
      contactInfo: 'Director of Member Support @ LinkedIn | Leadership, Customer Service, Sales',
      profileImage: 'https://example.com/kristen.jpg', // Replace with actual image URL
      messages: [
        {
          id: 'msg1',
          text: 'Hi Irtza,\n\nAre you currently exploring new job opportunities? If so, I can introduce you to some of LinkedIn’s tools to help with your search.',
          timestamp: '5:23 PM',
          sent: false,
        },
      ],
    },
    {
      id: '2',
      name: 'Saad Azeem',
      contactInfo: 'Software Engineer',
      profileImage: 'https://example.com/saad.jpg', // Replace with actual image URL
      messages: [
        {
          id: 'msg1',
          text: 'Hi Saad,\n\nIt’s great connecting with you. How have you been?',
          timestamp: '4:08 PM',
          sent: true,
        },
        {
          id: 'msg2',
          text: 'Hey, Irtza',
          timestamp: '4:08 PM',
          sent: false,
        },
        {
          id: 'msg3',
          text: 'How are you?',
          timestamp: '4:09 PM',
          sent: false,
        },
      ],
    },
  ]);
  const [activeChat, setActiveChat] = useState(rooms[0]);

  return (
    <div className='inbox-content d-flex' style={{ height: '90vh' }}>
      <div style={{ width: '20%' }}>
        <ChatList
          rooms={rooms}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
      </div>
      <div style={{ width: '80%', padding: '20px' }}>
        {activeChat ? (
          <ChatMessages room={activeChat} setActiveChat={setActiveChat} />
        ) : (
          <h5>Select a chat to see messages</h5>
        )}
      </div>
    </div>
  );
}

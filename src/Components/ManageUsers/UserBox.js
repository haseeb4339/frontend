import React from 'react';
import { Button } from 'react-bootstrap';
import { MdOutlineLogin } from "react-icons/md";
import Avatar from '../UI/Avatar';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function UserBox({ data, onDelete }) {
    const handleDelete = async () => {
        alert("Are You Sure You want to remove this member?")
        try {
            const token = sessionStorage.getItem('jwtToken'); // Assumes you store the token here
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            
            await axios.delete(`http://13.51.168.143/api/subusers/${data.id}`, config);
            toast.success('Subuser deleted successfully');
            onDelete(data.id); // Notify parent to remove the subuser from state
        } catch (error) {
            console.error('Error deleting subuser:', error);
            toast.error('Failed to delete subuser');
        }
    };

    return (
        <div className='d-flex justify-content-between user-box box-card w-full text-center p-3 me-4 mb-3'>
            <div className='content-main d-flex mb-2'>
                <Avatar image={data.image} imageClass='user-image' />
                <div>
                    <p className='title fw-600 mb-0 ms-3'>{data.title}</p>
                    <div className='labels d-flex flex-wrap ms-3'>
                        <p>{data.active ? 'active' : 'offline'}</p>
                    </div>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='user-actions'>
                    <Button variant='action' onClick={handleDelete}>
                        <MdOutlineLogin size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

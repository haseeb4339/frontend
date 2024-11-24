import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal, Form } from 'react-bootstrap';
import { AiOutlinePlus } from "react-icons/ai";
import Searchbar from '../Inputs/Searchbar';
import Loader from '../UI/Loader';
import { ToastContainer, toast } from 'react-toastify';
import UserBox from './UserBox';
import axios from 'axios';

export default function ManageUsersContent() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({
        title: '',
        email: '',
        password: '', // Add password field
    });


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = sessionStorage.getItem('jwtToken');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get('http://13.51.168.143/api/subusers', config);
                setUsers(response.data.subusers);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Failed to fetch users');
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setNewUser({ ...newUser, image: URL.createObjectURL(file) });
    };

    const handleAddUser = async () => {
        try {
            const token = sessionStorage.getItem('jwtToken');
            const loggedInUserId = sessionStorage.getItem('id'); // Get loggedInUserId from sessionStorage

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };

            const response = await axios.post(
                'http://13.51.168.143/api/subusers',
                { ...newUser, loggedInUserId }, // Include loggedInUserId in the request
                config
            );

            setUsers([...users, response.data.subuser]);

            setNewUser({
                image: '',
                title: '',
                email: '',
            });

            handleCloseModal();
            toast.success('User added successfully!');
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('Error adding user.');
        }
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className='admin-panel-content'>
            <div className='row g-0'>
                <div className='col-md-12'>
                    <div className='content-top d-flex justify-content-end'>
                        <Searchbar />
                        &nbsp;
                        &nbsp;
                        <Button variant='primary' onClick={handleShowModal}>
                            Add User <AiOutlinePlus size={18} />
                        </Button>
                    </div>
                    <div className='content-section main-bg p-4 mt-3 custom-scrollbar'>
                        <div className='d-flex flex-wrap'>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        {
                                            users.length === 0 ? (
                                                <div className='no-data d-flex justify-content-center align-items-center w-100'>
                                                    <p>No Users</p>
                                                </div>
                                            ) : (
                                                users.map((user) => (
                                                    <UserBox key={user.id} data={user} onDelete={handleDeleteUser} />
                                                ))
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle" className='mb-3'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                value={newUser.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={newUser.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={newUser.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddUser}>
                        Add User
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer theme='colored' />
        </div>
    );
}

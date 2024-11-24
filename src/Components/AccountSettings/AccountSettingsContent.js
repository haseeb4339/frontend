import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export const saveLinkedInCredentials = async (linkedinEmail, linkedinPassword) => {
    try {
        const token = sessionStorage.getItem('jwtToken');
        const response = await axios.post(
            'http://13.60.97.199/api/linkedin-credentials',
            {
                linkedinEmail,
                linkedinPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.status === 200) {
            console.log('LinkedIn credentials saved successfully:', response.data);
        }
    } catch (error) {
        console.error('Error saving LinkedIn credentials:', error.response?.data || error.message);
    }
};

export default function AccountSettingsContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showFormModal, setShowFormModal] = useState(false);
    const [isAccountLinked, setIsAccountLinked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    // Sliders state
    const [connectionRequest, setConnectionRequest] = useState(20);
    const [follow, setFollow] = useState(20);
    const [like, setLike] = useState(20);
    const [inmail, setInmail] = useState(20);

    useEffect(() => {
        const savedEmail = localStorage.getItem('linkedAccountEmail');
        const savedName = localStorage.getItem('linkedAccountName');
        if (savedEmail && savedName) {
            setEmail(savedEmail);
            setName(savedName);
            setIsAccountLinked(true);
        }
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.get('http://127.0.0.1:8000/bot/login/', {
                params: {
                    username: email,
                    password: password,
                },
            });

            if (response.status === 200) {
                const responseMessage = response.data.message;
                setName(response.data.name || '');
                localStorage.setItem('linkedAccountEmail', email);
                localStorage.setItem('linkedinPassword', password);
                localStorage.setItem('linkedAccountName', response.data.name || '');
                saveLinkedInCredentials(email, password);
                setResponseMessage(responseMessage);
                setIsAccountLinked(true);
                setShowFormModal(false);
                toast.success(responseMessage);
            } else {
                throw new Error('Unexpected response');
            }
        } catch (error) {
            if (error.response) {
                // Handle responses with a status code outside the 2xx range
                if (error.response.status === 401) {
                    toast.error(error.response.data.message || 'Invalid credentials provided.');
                } else if (error.response.status === 500) {
                    toast.error('An internal server error occurred.');
                } else {
                    toast.error('An unexpected error occurred.');
                }
            } else {
                // Handle network or other unexpected errors
                toast.error('Network error. Please try again.');
            }

            // Clear localStorage and states for incorrect login attempts
            localStorage.removeItem('linkedAccountEmail');
            localStorage.removeItem('linkedinPassword');
            localStorage.removeItem('linkedAccountName');
            setEmail('');
            setName('');
            setIsAccountLinked(false);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('linkedAccountEmail');
        localStorage.removeItem('linkedinPassword');
        localStorage.removeItem('linkedAccountName');
        setEmail('');
        setName('');
        setIsAccountLinked(false);
        setResponseMessage('You have successfully logged out.');
        toast.info('You have successfully logged out.');
    };

    return (
        <div className='account-settings-content'>
            <div className='row g-0'>
                <div className='col-md-12'>
                    <div className='main-bg p-4 custom-scrollbar'>
                        <div className='no-data d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '300px', marginTop: '10px' }}>
                            {isAccountLinked ? (
                                <div className='text-center w-100'>
                                    <h4 className='text-success'>LinkedIn Account Linked Successfully!</h4>
                                    <p>Email: {email}</p>
                                    <p>Name: {name}</p>

                                    {/* Logout Button */}
                                    <Button variant="danger" className="mt-4" onClick={handleLogout}>
                                        Logout
                                    </Button>

                                    <h1 className='w-100' style={{ textAlign: 'left', marginTop: '20px' }}>Settings</h1>

                                    {/* Sliders */}
                                    <Form className="text-left mt-4 w-100">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group controlId="connectionRequestSlider" className="mt-3">
                                                    <Form.Label>Connection request: {connectionRequest}</Form.Label>
                                                    <Form.Range
                                                        className="custom-slider"
                                                        min={1}
                                                        max={50}
                                                        value={connectionRequest}
                                                        onChange={(e) => setConnectionRequest(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </div>

                                            <div className="col-md-6">
                                                <Form.Group controlId="followSlider" className="mt-3">
                                                    <Form.Label>Follow: {follow}</Form.Label>
                                                    <Form.Range
                                                        className="custom-slider"
                                                        min={1}
                                                        max={100}
                                                        value={follow}
                                                        onChange={(e) => setFollow(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group controlId="likeSlider" className="mt-3">
                                                    <Form.Label>Like: {like}</Form.Label>
                                                    <Form.Range
                                                        className="custom-slider"
                                                        min={1}
                                                        max={200}
                                                        value={like}
                                                        onChange={(e) => setLike(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </div>

                                            <div className="col-md-6">
                                                <Form.Group controlId="inmailSlider" className="mt-3">
                                                    <Form.Label>InMail: {inmail}</Form.Label>
                                                    <Form.Range
                                                        className="custom-slider"
                                                        min={1}
                                                        max={50}
                                                        value={inmail}
                                                        onChange={(e) => setInmail(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </Form>

                                </div>
                            ) : (
                                <div className='text-center'>
                                    <p>Please Add a LinkedIn Account</p>
                                    <Button variant="primary" onClick={() => setShowFormModal(true)}>
                                        Link LinkedIn Account
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showFormModal} onHide={() => setShowFormModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>LinkedIn Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your LinkedIn email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3" disabled={loading} block>
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />{' '}
                                    Logging in...
                                </>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <ToastContainer theme='colored' />
        </div>
    );
}

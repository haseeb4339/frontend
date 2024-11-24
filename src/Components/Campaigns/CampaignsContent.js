import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Tabs, Tab, Modal } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import Searchbar from "../Inputs/Searchbar";
import CampaignBox from "./CampaignBox";
import { useNavigate } from "react-router-dom";
import Pagination from "../UI/Pagination";
import Loader from "../UI/Loader";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { selectProfile } from "../../features/profile/profileSlice";

export default function CampaignsContent({ setSelectedForEdit }) {
    const user = useSelector(selectProfile);
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [myCampCurrentItems, setMyCampCurrentItems] = useState([]);
    const [allCampCurrentItems, setAllCampCurrentItems] = useState([]);

    const navigate = useNavigate();

    const fetchCampaigns = async () => {
        if (!sessionStorage.getItem("jwtToken")) {
            console.error("No token found. Unable to fetch campaigns.");
            setIsLoading(false); // Stop loading if no token
            return; 
        }
    
        try {
            const response = await fetch('http://13.51.168.143/api/pending-campaigns', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
                },
            });
    
            if (!response.ok) {
                // If the response status is not OK, log the error
                const errorData = await response.json();
                console.error('Failed to fetch campaigns:', errorData);
                throw new Error('Failed to fetch campaigns'); // Throw an error to be caught in the catch block
            }
    
            const data = await response.json();
            console.log('Fetched campaigns:', data); // Log the fetched data
            setCampaigns(data); // Set the fetched campaigns to state
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        } finally {
            setIsLoading(false); // Always stop loading in finally block
        }
    };
    
    // Load campaigns when the component mounts or user changes
    useEffect(() => {
        fetchCampaigns();
    }, [user]);

    const selectedForDelete = (data) => {
        setIsDeleteModalOpen(true);
        setDeleteId(data.id);
    };

    const deleteCampaignApiCall = async () => {
        return fetch(`http://13.51.168.143/api/pending-campaigns/${deleteId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            },
        });
    };

    const deleteCampaign = async () => {
        try {
            await deleteCampaignApiCall();
            setIsDeleteModalOpen(false);
            fetchCampaigns(); // Refresh campaigns after deletion
        } catch (error) {
            console.error('Error deleting campaign:', error);
        }
    };

    return (
        <div className="campaigns-content">
            <Modal
                show={isDeleteModalOpen}
                onHide={() => setIsDeleteModalOpen(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Campaign</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this campaign?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteCampaign}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="row g-0">
                <div className="col-md-12">
                    <div className="content-top d-flex justify-content-between">
                        <Searchbar />
                        <Button
                            variant="primary"
                            onClick={() => navigate("/campaigns/create")}
                        >
                            Add New <AiOutlinePlus size={18} />
                        </Button>
                    </div>
                    <div className="content-section main-bg p-4 mt-3 custom-scrollbar">
                        <Tabs
                            defaultActiveKey="my-camps"
                            id="campaigns-tabs"
                            className="custom-tabs pb-3"
                        >
                            <Tab eventKey="my-camps" title="My Campaigns">
                                {isLoading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        {campaigns.length === 0 ? (
                                            <div className="no-data d-flex align-items-center justify-content-center">
                                                <p>No Campaigns</p>
                                            </div>
                                        ) : (
                                            myCampCurrentItems.map((item) => (
                                                <CampaignBox
                                                    key={item.id}
                                                    data={item}
                                                    campaignsRefetch={fetchCampaigns}
                                                    setSelectedForEdit={setSelectedForEdit}
                                                    selectedForDelete={selectedForDelete}
                                                />
                                            ))
                                        )}
                                        {campaigns.length > 0 && (
                                            <div className="d-flex justify-content-end">
                                                <Pagination
                                                    data={campaigns}
                                                    setCurrentItems={setMyCampCurrentItems}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </Tab>
                            <Tab eventKey="all-camps" title="All Campaigns">
                                {isLoading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        {campaigns.length === 0 ? (
                                            <div className="no-data d-flex align-items-center justify-content-center">
                                                <p>No Campaigns</p>
                                            </div>
                                        ) : (
                                            allCampCurrentItems.map((item) => (
                                                <CampaignBox
                                                    key={item.id}
                                                    data={item}
                                                    campaignsRefetch={fetchCampaigns}
                                                    setSelectedForEdit={setSelectedForEdit}
                                                    selectedForDelete={selectedForDelete}
                                                />
                                            ))
                                        )}
                                        {campaigns.length > 0 && (
                                            <div className="d-flex justify-content-end">
                                                <Pagination
                                                    data={campaigns}
                                                    setCurrentItems={setAllCampCurrentItems}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />
        </div>
    );
}

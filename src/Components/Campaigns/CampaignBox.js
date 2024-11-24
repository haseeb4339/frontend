import React from "react";
import Button from "react-bootstrap/Button";
import { AiOutlineEye, AiOutlineMore } from "react-icons/ai"; // Import icons if needed
import './CampaignBox.css'; // Import custom styles if needed

const CampaignBox = ({ data, setSelectedForEdit, selectedForDelete }) => {
    // Guard clause to handle undefined data
    if (!data) {
        return <div>No campaign data available</div>;
    }

    return (
        <div className="campaign-box p-3 border rounded shadow-sm mb-3">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="mb-1">{data.campaign_name || "Unnamed Campaign"}</h5>
                    <p className="text-muted mb-1">
                        {/* <span>0% complete</span> - <span>14 hours ago</span> - <span>{data.steps} steps</span> */}
                        <span>0% complete</span>
                    </p>
                    <div className="d-flex align-items-center">
                        <div className="members">
                            {/* Check if members exist and are an array */}
                            {Array.isArray(data.members) && data.members.slice(0, 2).map((member, index) => (
                                <img
                                    key={index}
                                    src={member.avatar}
                                    alt="member"
                                    className="member-avatar rounded-circle"
                                />
                            ))}
                            {data.members && data.members.length > 2 && (
                                <span className="extra-members">+{data.members.length - 2}</span>
                            )}
                        </div>
                        <span className="ms-2">{data.members ? data.members.length : 0} Members</span>
                    </div>
                </div>
                <div className="actions d-flex">
                    <Button variant="outline-primary" className="me-2">
                        <AiOutlineEye size={20} />
                    </Button>
                    <Button variant="outline-secondary" onClick={() => setSelectedForEdit(data)}>
                        <AiOutlineMore size={20} />
                    </Button>
                </div>
            </div>
            <div className="mt-3">
                <div className="d-flex justify-content-between text-center stats">
                    <div>
                        <p className="mb-1">Added</p>
                        <strong>{data.stats?.added || 0}</strong> {/* Optional chaining for safety */}
                    </div>
                    <div>
                        <p className="mb-1">Contacted</p>
                        <strong>{data.stats?.contacted || 0}</strong>
                    </div>
                    <div>
                        <p className="mb-1">Replied</p>
                        <strong>{data.stats?.replied || 0}</strong>
                    </div>
                    <div>
                        <p className="mb-1">Leads</p>
                        <strong>{data.stats?.leads || 0}</strong>
                    </div>
                    <div>
                        <p className="mb-1">Meetings</p>
                        <strong>{data.stats?.meetings || 0}</strong>
                    </div>
                    <div>
                        <p className="mb-1">Deals</p>
                        <strong>{data.stats?.deals || 0}</strong>
                    </div>
                </div>
            </div>
            <div className="mt-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    {/* <img
                        src={data.createdBy?.avatar || "default-avatar.png"} // Fallback avatar
                        alt="creator"
                        className="creator-avatar rounded-circle me-2"
                    /> */}
                    {/* <span>created by <strong>{data.createdBy?.name || "Unknown"}</strong></span> */}
                    <span>created by <strong>Admin</strong></span>
                </div>
                <Button variant="outline-success" className="top-performer">
                    Top Performer
                </Button>
            </div>
        </div>
    );
};

export default CampaignBox;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../utils"; // Utility for showing success message


function AdminDashboard() {
    const [resumes, setResumes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("admintoken");
        console.log("Admin Token:", token); // Debugging log

        if (!token) {
            navigate("/admin/login");
            return;
        }

        fetch("http://localhost:5000/admin/resumes", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("API Response:", data); // Debugging log
                if (data.success) {
                    setResumes(data.resumes);
                } else {
                    navigate("/admin/login");
                }
            })
            .catch((error) => {
                console.error("Error fetching resumes:", error);
                navigate("/admin/login");
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("admintoken");
        handleSuccess("Logout Successful!");
        setTimeout(() => {
          navigate("/admin/login");
        }, 1000);
    };
    return (
        <>
        <button onClick={handleLogout}           style={{ 
            padding: "8px 18px", 
            backgroundColor: "#1abc9c", 
            margin: "8px",
            color: "black", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer", 
            fontSize: "16px" 
          }}>Logout</button>
      <ToastContainer />
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">User Email</th>
                        <th className="p-2 border">Resume ID</th>
                    </tr>
                </thead>
                <tbody>
                    {resumes.length > 0 ? (
                        resumes.map((resume) => (
                            <tr key={resume._id} className="border-b">
                                <td className="p-2 border">
                                    {resume.userId && resume.userId.email ? resume.userId.email : "Unknown User"}
                                </td>
                                <td className="p-2 border">{resume._id}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="p-4 text-center">
                                No resumes found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </>

    );
}

export default AdminDashboard;

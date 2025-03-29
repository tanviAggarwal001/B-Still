import React, { useState, useEffect } from "react";

function YourWork({ setActiveTab }) {
    const [resumes, setResumes] = useState([]);
    const userId = localStorage.getItem("userId"); 
     // ✅ Fetch userId from localStorage
    //  console.log(userId);

    useEffect(() => {
        if (!userId){
          console.log("yourwork line 9 error");
          return;  // Prevent fetch if userId is missing
        } 
          

        const fetchResumes = async () => {
            try {
                const response = await fetch(`http://localhost:5000/resume/all?userId=${userId}`);  // ✅ Send userId in query
                if (!response.ok) throw new Error("Failed to fetch resumes");

                const data = await response.json();
                console.log("✅ Response from backend:", data);

        // // Ensure it's an array before setting state
        // if (!Array.isArray(data)) {
        //     console.error("🚨 Backend did not return an array:", data);
        //     return;
        // }
        setResumes(data.resumes);

                // console.log(resumes.length)
            } catch (error) {
                console.error("Error fetching resumes:", error.message);
            }
        };

        fetchResumes();
    }, [userId]);

    return (
        <div>
            <h1 className="text-4xl text-center text-red-800 mb-6">Your Saved Resumes</h1>
            {resumes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resumes.map((resume, index) => (
                        <div key={index} className="bg-white p-4 shadow rounded-lg">
                            <h3 className="text-xl text-gray-800">{resume.title}</h3>
                            <p className="text-gray-600">{resume.date}</p>
                            <div className="flex justify-between mt-4">
                                <a href={`http://localhost:5000/resume/download/${resume.fileId}`} className="bg-teal-500 text-white px-4 py-2 rounded">View</a>
                                <button onClick={async () => {
                                    try {
                                        const res = await fetch(`http://localhost:5000/resume/delete/${resume._id}`, { method: "DELETE" });
                                        if (!res.ok) throw new Error("Failed to delete resume");

                                        setResumes(resumes.filter((_, i) => i !== index));
                                    } catch (error) {
                                        console.error("Error deleting resume:", error.message);
                                    }
                                }} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                <div className="text-center">
                <button onClick={() => setActiveTab("Create")} style={{ padding: "10px 20px", backgroundColor: "#2c3e50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>Create More!!</button>
            </div>
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="text-2xl text-gray-800 mb-4">No resumes found!</h2>
                    <button onClick={() => setActiveTab("Create")} style={{ padding: "10px 20px", backgroundColor: "#2c3e50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>Get Started</button>
                </div>
            )}
        </div>
    );
}

export default YourWork;

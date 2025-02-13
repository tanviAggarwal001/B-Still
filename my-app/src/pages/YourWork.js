import React from 'react';
import { useState, useEffect } from "react";


function YourWork() {
    const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const savedResumes = JSON.parse(localStorage.getItem("resumes")) || [];
    setResumes(savedResumes);
  }, []);

  return (
    <div >
      <h1 className="text-4xl text-center text-red-800 mb-6">Your Saved Resumes</h1>
      {resumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumes.map((resume, index) => (
            <div key={index} className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl text-gray-800">{resume.title}</h3>
              <p className="text-gray-600">{resume.date}</p>
              <div className="flex justify-between mt-4">
                <a href={resume.link} className="bg-teal-500 text-white px-4 py-2 rounded">View</a>
                <button onClick={() => {
                  setResumes(resumes.filter((_, i) => i !== index));
                  localStorage.setItem("resumes", JSON.stringify(resumes.filter((_, i) => i !== index)));
                }} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl text-gray-800 mb-4">No resumes found!</h2>
          <a href="/create" className="text-red-600 px-6 py-3 rounded">Create a Resume Now</a>
        </div>
      )}
    </div>
  )
}

export default YourWork

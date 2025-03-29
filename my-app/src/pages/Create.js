import React, { useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import ResumeForm from '../components/ResumeForm';

function Create() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");


  const handleAICreate = async (formData) => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId"); // Retrieve userId
      if (!userId) {
        handleError("User ID is missing. Please log in again.");
        setIsLoading(false);
        return;
      }
      // Send the resume data to create the AI-generated resume
      console.log(selectedTemplate);
      const response = await fetch('http://localhost:5000/resume/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          userId,  // ✅ Added userId here
          personal_information: formData.personal_information,
          education: formData.education,
          technical_skills: formData.technical_skills,
          projects: formData.projects,
          work_experience: formData.work_experience,
          achievements: formData.achievements,
          publications: formData.publications,
          references: formData.references,
          extracurricular_activities: formData.extracurricular_activities,
        }),
        credentials: 'include',
      });

      const result = await response.json();

      if (result.success && result.resume.fileId) { // ✅ Change result.fileId -> result.resume.fileId
        handleSuccess("Resume created successfully!");
        setPreviewUrl(`http://localhost:5000/resume/download/${result.resume.fileId}`);
    }
     else {
        handleError(result.message || "Failed to create resume.");
      }
    } catch (error) {
      handleError("Failed to create resume.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Choose a Resume Template</h1>
      <div>
        <button onClick={() => setSelectedTemplate("template1")}>Template 1</button>
        <button onClick={() => setSelectedTemplate("template2")}>Template 2</button>
        <button onClick={() => setSelectedTemplate("template3")}>Template 3</button>
      </div>
      <h1 className="text-2xl font-bold mb-6">Create Your Resume</h1>
      <ResumeForm onSubmit={handleAICreate} />
      
      {isLoading && (
        <div className="my-4 p-4 bg-blue-50 rounded">
          <p className="text-center">Creating your resume...</p>
          <p className="text-center text-sm text-gray-600 mt-1">
            Our AI is generating your professional resume. This may take a moment...
          </p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      )}
      
      {previewUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Resume Preview</h2>
          <iframe 
            src={previewUrl} 
            title="Resume Preview" 
            className="w-full h-screen border border-gray-300 rounded"
          />
          <div className="mt-2 flex gap-4">
            <a 
              href={previewUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              Open in new tab
            </a>
            <a 
              href={previewUrl} 
              download="my_resume.pdf"
              className="text-blue-600 hover:underline"
            >
              Download PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Create;
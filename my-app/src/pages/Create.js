import React, { useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import ResumeForm from '../components/ResumeForm';
// import './Create.css'; // Import normal CSS

function Create() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleAICreate = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://b-still-backend.onrender.com/resume/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        handleSuccess('Resume created successfully!');
        setPreviewUrl(`https://b-still-backend.onrender.com${result.pdfPath}`);
        
        // Save to localStorage for YourWork page
        const savedResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
        savedResumes.push({
          title: formData.personal_information.full_name + "'s Resume",
          date: new Date().toLocaleDateString(),
          link: result.pdfPath,
          data: result.texCode
        });
        localStorage.setItem('resumes', JSON.stringify(savedResumes));
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError('Failed to create resume');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-4_5 py-10">
      <h1 className="text-4xl text-center text-gray-800 mb-6">Create Your Resume</h1>
      
      
      <ResumeForm onSubmit={handleAICreate} />

      {isLoading && <div className="text-center mt-4">Creating your resume...</div>}
      
      {previewUrl && (
        <div className="mt-6">
          <iframe src={previewUrl} className="w-full h-screen" title="Resume Preview" />
          <div className="flex gap-4 mt-4">
            <a href={previewUrl} download className="bg-green-500 text-white px-6 py-2 rounded">
              Download PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Create;

import React, { useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import ResumeForm from '../components/ResumeForm';

function Create() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleAICreate = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/resume/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Backend response:', result);

      if (result.success && result.pdfPath) {
        handleSuccess('Resume created successfully!');
        
        // Use local backend for preview URL
        setPreviewUrl(`http://localhost:5000${result.pdfPath}`);
        
        // Save to localStorage for "Your Work" page
        const savedResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
        savedResumes.push({
          title: `${formData.personal_information.full_name}'s Resume`,
          date: new Date().toLocaleDateString(),
          link: result.pdfPath,
          data: result.texCode,
        });
        localStorage.setItem('resumes', JSON.stringify(savedResumes));
      } else {
        handleError(result.message || 'Failed to generate resume.');
      }
    } catch (error) {
      handleError('Failed to create resume.');
      console.error('Error:', error);
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

import React from "react";

const tutorials = [
  {
    id: "resume-tips",
    title: "How to Make a Great Resume",
    description:
      "Creating a great resume is key to making a good first impression with potential employers. Here are some tips:",
    tips: [
      "Keep it concise: Limit your resume to 1-2 pages.",
      "Highlight key skills: Focus on your achievements and key competencies.",
      "Use bullet points: Make your resume easier to scan.",
      "Customize it for each job: Tailor your resume for the specific job you're applying for."
    ],
    image: "resume-example.jpg",
    video: "https://www.youtube.com/embed/8f2tOvc1x9Y"
  },
  {
    id: "ats-score-tips",
    title: "How to Improve Your ATS Score",
    description:
      "ATS (Applicant Tracking System) is used by many employers to screen resumes. Here are some tips to improve your ATS score:",
    tips: [
      "Use relevant keywords: Incorporate keywords from the job description.",
      "Use a clean format: ATS can have trouble reading fancy fonts or designs. Stick to standard fonts like Arial or Times New Roman.",
      "Include a skills section: List your skills clearly to help the ATS identify them.",
      "Save your resume in the right format: Submit your resume as a .docx or .pdf file, as they are more ATS-friendly."
    ],
    image: "ats-score-example.jpg",
    video: "https://www.youtube.com/embed/t4Mji4ytUJM"
  },
  {
    id: "cover-letter-tips",
    title: "Writing a Strong Cover Letter",
    description:
      "Your cover letter is your chance to introduce yourself to potential employers and highlight why you’re a great fit for the position. Here’s how to make it stand out:",
    tips: [
      "Start with a strong introduction: Grab the employer's attention from the start.",
      "Show your enthusiasm: Express why you're excited about the role and company.",
      "Keep it professional: Use a formal tone, but make it personal enough to show your passion.",
      "Be concise: Aim for one page with a clear structure."
    ],
    image: "cover-letter-example.jpg",
    video: "https://www.youtube.com/embed/O3g7-SdkY1w"
  }
];

const Tutorials = () => {
  return (
    <div className="w-4/5 mx-auto py-10">
      {tutorials.map((tutorial) => (
        <div key={tutorial.id} className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{tutorial.title}</h2>
          <p className="text-lg text-gray-700 mb-4">{tutorial.description}</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {tutorial.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <img src={tutorial.image} alt={tutorial.title} className="w-full max-w-2xl mx-auto mb-6 rounded-lg shadow-md" />
          <div className="w-full max-w-2xl mx-auto">
            <iframe
              src={tutorial.video}
              title={tutorial.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-96 rounded-lg"
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tutorials;

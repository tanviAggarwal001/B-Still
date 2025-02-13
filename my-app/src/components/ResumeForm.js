import React, { useState } from 'react';
import './ResumeForm.css'; // Import our new CSS

const ResumeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    personal_information: {
      full_name: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      location: {
        city: '',
        state: '',
        country: 'India'
      }
    },
    summary: {
      short_bio: '',
      objective: ''
    },
    education: [{
      degree: '',
      university: '',
      start_year: '',
      expected_graduation_year: '',
      GPA: '',
      certifications: []
    }],
    technical_skills: {
      programming_languages: [],
      frameworks_and_libraries: [],
      tools: [],
      operating_systems: []
    },
    projects: [{
      name: '',
      description: '',
      technologies_used: [],
      link: ''  // Added project link field
    }],
    work_experience: [{
      role: '',
      organization: '',
      start_date: '',
      end_date: '',
      responsibilities: ['']
    }],
    achievements: [{
      title: '',
      description: '',
      year: ''
    }],
    publications: [{
      title: '',
      conference: '',
      year: '',
      link: ''
    }],
    references: [{
      name: '',
      position: '',
      university: '',
      email: ''
    }],
    extracurricular_activities: [{
      role: '',
      organization: '',
      start_date: '',
      end_date: '',
      description: '',
      achievements: []
    }]
  });

  const handleChange = (section, field, value, index = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (index !== null && Array.isArray(newData[section])) {
        if (field === 'technologies_used' || field === 'responsibilities' || field === 'achievements') {
          newData[section][index][field] = Array.isArray(value) ? value : [value];
        } else {
          newData[section][index][field] = value;
        }
      } else if (section === 'personal_information' && field in newData.personal_information.location) {
        newData.personal_information.location[field] = value;
      } else if (section === 'personal_information') {
        newData.personal_information[field] = value;
      } else if (section === 'technical_skills' && Array.isArray(newData.technical_skills[field])) {
        newData.technical_skills[field] = value.split(',').map(item => item.trim());
      } else if (section === 'summary') {
        newData.summary[field] = value;
      }
      
      return newData;
    });
  };

  const addListItem = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], getEmptyItem(section)]
    }));
  };

  const removeListItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const getEmptyItem = (section) => {
    const emptyItems = {
      education: {
        degree: '',
        university: '',
        start_year: '',
        expected_graduation_year: '',
        GPA: '',
        certifications: []
      },
      projects: {
        name: '',
        description: '',
        technologies_used: [],
        link: ''  // Added project link field
      },
      work_experience: {
        role: '',
        organization: '',
        start_date: '',
        end_date: '',
        responsibilities: ['']
      },
      achievements: {
        title: '',
        description: '',
        year: ''
      },
      publications: {
        title: '',
        conference: '',
        year: '',
        link: ''
      },
      references: {
        name: '',
        position: '',
        university: '',
        email: ''
      },
      extracurricular_activities: {
        role: '',
        organization: '',
        start_date: '',
        end_date: '',
        description: '',
        achievements: []
      }
    };
    return emptyItems[section];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            value={formData.personal_information.full_name}
            onChange={(e) => handleChange('personal_information', 'full_name', e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={formData.personal_information.email}
            onChange={(e) => handleChange('personal_information', 'email', e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            className="input-field"
            value={formData.personal_information.phone}
            onChange={(e) => handleChange('personal_information', 'phone', e.target.value)}
          />
          <input
            type="url"
            placeholder="LinkedIn URL"
            className="input-field"
            value={formData.personal_information.linkedin}
            onChange={(e) => handleChange('personal_information', 'linkedin', e.target.value)}
          />
          <input
            type="url"
            placeholder="GitHub URL"
            className="input-field"
            value={formData.personal_information.github}
            onChange={(e) => handleChange('personal_information', 'github', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <input
            type="text"
            placeholder="City"
            className="input-field"
            value={formData.personal_information.location.city}
            onChange={(e) => handleChange('personal_information', 'city', e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            className="input-field"
            value={formData.personal_information.location.state}
            onChange={(e) => handleChange('personal_information', 'state', e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            className="input-field"
            value={formData.personal_information.location.country}
            onChange={(e) => handleChange('personal_information', 'country', e.target.value)}
          />
        </div>
      </section>

    

      {/* Education Section with Certifications */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="space-y-4 mb-4 pb-4 border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Degree"
                className="input-field"
                value={edu.degree}
                onChange={(e) => handleChange('education', 'degree', e.target.value, index)}
              />
              <input
                type="text"
                placeholder="University"
                className="input-field"
                value={edu.university}
                onChange={(e) => handleChange('education', 'university', e.target.value, index)}
              />
              <input
                type="number"
                placeholder="Start Year"
                className="input-field"
                value={edu.start_year}
                onChange={(e) => handleChange('education', 'start_year', e.target.value, index)}
              />
              <input
                type="number"
                placeholder="Expected Graduation Year"
                className="input-field"
                value={edu.expected_graduation_year}
                onChange={(e) => handleChange('education', 'expected_graduation_year', e.target.value, index)}
              />
              <input
                type="text"
                placeholder="GPA"
                className="input-field"
                value={edu.GPA}
                onChange={(e) => handleChange('education', 'GPA', e.target.value, index)}
              />
            </div>
            
            {/* Certifications Subsection */}
            <div className="mt-4">
              <h4 className="text-lg font-medium mb-2">Certifications</h4>
              {edu.certifications.map((cert, certIndex) => (
                <div key={certIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                  <input
                    type="text"
                    placeholder="Certification Name"
                    className="input-field"
                    value={cert.name}
                    onChange={(e) => {
                      const newCerts = [...edu.certifications];
                      newCerts[certIndex] = { ...cert, name: e.target.value };
                      handleChange('education', 'certifications', newCerts, index);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Issuer"
                    className="input-field"
                    value={cert.issuer}
                    onChange={(e) => {
                      const newCerts = [...edu.certifications];
                      newCerts[certIndex] = { ...cert, issuer: e.target.value };
                      handleChange('education', 'certifications', newCerts, index);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Year"
                    className="input-field"
                    value={cert.year}
                    onChange={(e) => {
                      const newCerts = [...edu.certifications];
                      newCerts[certIndex] = { ...cert, year: e.target.value };
                      handleChange('education', 'certifications', newCerts, index);
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newCerts = [...edu.certifications, { name: '', issuer: '', year: '' }];
                  handleChange('education', 'certifications', newCerts, index);
                }}
                className="small-rounded-btn text-blue-500 mt-2"
              >
                Add Certification
              </button>
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeListItem('education', index)}
                className="small-rounded-btn text-red-500"
              >
                Remove Education
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem('education')}
          className="small-rounded-btn text-blue-500"
        >
          Add Education
        </button>
      </section>

      {/* Technical Skills */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Programming Languages (comma-separated)
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.technical_skills.programming_languages.join(', ')}
              onChange={(e) => handleChange('technical_skills', 'programming_languages', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frameworks & Libraries (comma-separated)
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.technical_skills.frameworks_and_libraries.join(', ')}
              onChange={(e) => handleChange('technical_skills', 'frameworks_and_libraries', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tools (comma-separated)
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.technical_skills.tools.join(', ')}
              onChange={(e) => handleChange('technical_skills', 'tools', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Operating Systems (comma-separated)
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.technical_skills.operating_systems.join(', ')}
              onChange={(e) => handleChange('technical_skills', 'operating_systems', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index} className="space-y-4 mb-4 pb-4 border-b">
            <input
              type="text"
              placeholder="Project Name"
              className="input-field"
              value={project.name}
              onChange={(e) => handleChange('projects', 'name', e.target.value, index)}
            />
            <textarea
              placeholder="Project Description"
              className="input-field h-24"
              value={project.description}
              onChange={(e) => handleChange('projects', 'description', e.target.value, index)}
            />
            <input
              type="text"
              placeholder="Technologies Used (comma-separated)"
              className="input-field"
              value={project.technologies_used.join(', ')}
              onChange={(e) => handleChange('projects', 'technologies_used', e.target.value.split(',').map(t => t.trim()), index)}
            />
            <input
              type="url"
              placeholder="Project Link (GitHub, Demo, etc.)"
              className="input-field"
              value={project.link}
              onChange={(e) => handleChange('projects', 'link', e.target.value, index)}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeListItem('projects', index)}
                className="small-rounded-btn text-red-500"
              >
                Remove Project
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem('projects')}
          className="small-rounded-btn text-blue-500"
        >
          Add Project
        </button>
      </section>

      {/* Work Experience Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
        {formData.work_experience.map((exp, index) => (
          <div key={index} className="space-y-4 mb-4 pb-4 border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Role"
                className="input-field"
                value={exp.role}
                onChange={(e) => handleChange('work_experience', 'role', e.target.value, index)}
              />
              <input
                type="text"
                placeholder="Organization"
                className="input-field"
                value={exp.organization}
                onChange={(e) => handleChange('work_experience', 'organization', e.target.value, index)}
              />
              <input
                type="month"
                placeholder="Start Date"
                className="input-field"
                value={exp.start_date}
                onChange={(e) => handleChange('work_experience', 'start_date', e.target.value, index)}
              />
              <input
                type="month"
                placeholder="End Date"
                className="input-field"
                value={exp.end_date}
                onChange={(e) => handleChange('work_experience', 'end_date', e.target.value, index)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsibilities (one per line)
              </label>
              <textarea
                placeholder="Enter each responsibility on a new line"
                className="input-field h-24"
                value={exp.responsibilities.join('\n')}
                onChange={(e) => handleChange('work_experience', 'responsibilities', e.target.value.split('\n'), index)}
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeListItem('work_experience', index)}
                className="text-red-500"
              >
                Remove Experience
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem('work_experience')}
          className="small-rounded-btn text-blue-500"
        >
          Add Work Experience
        </button>
      </section>

      {/* Achievements Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Achievements</h3>
        {formData.achievements.map((achievement, index) => (
          <div key={index} className="space-y-4 mb-4 pb-4 border-b">
            <input
              type="text"
              placeholder="Achievement Title"
              className="input-field"
              value={achievement.title}
              onChange={(e) => handleChange('achievements', 'title', e.target.value, index)}
            />
            <textarea
              placeholder="Achievement Description"
              className="input-field h-24"
              value={achievement.description}
              onChange={(e) => handleChange('achievements', 'description', e.target.value, index)}
            />
            <input
              type="number"
              placeholder="Year"
              className="input-field"
              value={achievement.year}
              onChange={(e) => handleChange('achievements', 'year', e.target.value, index)}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeListItem('achievements', index)}
                className="text-red-500"
              >
                Remove Achievement
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem('achievements')}
          className="small-rounded-btn text-blue-500"
        >
          Add Achievement
        </button>
      </section>

      {/* Publications Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Publications</h3>
        {formData.publications.map((pub, index) => (
          <div key={index} className="space-y-4 mb-4 pb-4 border-b">
            <input
              type="text"
              placeholder="Publication Title"
              className="input-field"
              value={pub.title}
              onChange={(e) => handleChange('publications', 'title', e.target.value, index)}
            />
            <input
              type="text"
              placeholder="Conference"
              className="input-field"
              value={pub.conference}
              onChange={(e) => handleChange('publications', 'conference', e.target.value, index)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Year"
                className="input-field"
                value={pub.year}
                onChange={(e) => handleChange('publications', 'year', e.target.value, index)}
              />
              <input
                type="url"
                placeholder="Publication Link"
                className="input-field"
                value={pub.link}
                onChange={(e) => handleChange('publications', 'link', e.target.value, index)}
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeListItem('publications', index)}
                className="text-red-500"
              >
                Remove Publication
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem('publications')}
          className="small-rounded-btn text-blue-500"
        >
          Add Publication
        </button>
      </section>

      {/* References Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">References</h3>
        {formData.references.map((ref, index) => (
          <div key={index} className="space-y-4 mb-4 pb-4 border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Reference Name"
                className="input-field"
                value={ref.name}
                onChange={(e) => handleChange('references', 'name', e.target.value, index)}
              />
              <input
                type="text"
                placeholder="Position"
                className="input-field"
                value={ref.position}
                onChange={(e) => handleChange('references', 'position', e.target.value, index)}
              />
              <input
                type="text"
                placeholder="University"
                className="input-field"
                value={ref.university}
                onChange={(e) => handleChange('references', 'university', e.target.value, index)}
              />
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={ref.email}
                onChange={(e) => handleChange('references', 'email', e.target.value, index)}
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeListItem('references', index)}
                className="text-red-500"
              >
                Remove Reference
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem('references')}
          className="small-rounded-btn text-blue-500"
        >
          Add Reference
        </button>
      </section>

      {/* Extracurricular Activities Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Extracurricular Activities</h3>
          
        </div>
        
        {formData.extracurricular_activities.map((activity, index) => (
          <div key={index} className="space-y-4 mb-6 pb-6 border-b relative">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-medium">Activity {index + 1}</h4>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeListItem('extracurricular_activities', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Activity
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Role"
                className="input-field"
                value={activity.role}
                onChange={(e) => handleChange('extracurricular_activities', 'role', e.target.value, index)}
              />
              <input
                type="text"
                placeholder="Organization"
                className="input-field"
                value={activity.organization}
                onChange={(e) => handleChange('extracurricular_activities', 'organization', e.target.value, index)}
              />
              <input
                type="month"
                placeholder="Start Date"
                className="input-field"
                value={activity.start_date}
                onChange={(e) => handleChange('extracurricular_activities', 'start_date', e.target.value, index)}
              />
              <input
                type="month"
                placeholder="End Date"
                className="input-field"
                value={activity.end_date}
                onChange={(e) => handleChange('extracurricular_activities', 'end_date', e.target.value, index)}
              />
            </div>
            <textarea
              placeholder="Description of your role and responsibilities"
              className="input-field h-24"
              value={activity.description}
              onChange={(e) => handleChange('extracurricular_activities', 'description', e.target.value, index)}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievements (one per line)
              </label>
              <textarea
                placeholder="Enter each achievement on a new line"
                className="input-field h-24"
                value={activity.achievements.join('\n')}
                onChange={(e) => handleChange('extracurricular_activities', 'achievements', e.target.value.split('\n'), index)}
              />
            </div>
          </div>
        ))}
        <button
            type="button"
            onClick={() => addListItem('extracurricular_activities')}
            className="small-rounded-btn"
          >
            Add New Activity
          </button>
      </section>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover_bg-blue-600 transition-colors"
      >
        Generate Resume
      </button>
    </form>
  );
};

export default ResumeForm;
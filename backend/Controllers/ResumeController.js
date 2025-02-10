// backend/Controllers/ResumeController.js
const Resume = require('../Models/resume');
const askPrompt = require('../config/geminiConfig');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const createResume = async (req, res) => {
    try {
        // 1. Save resume data to MongoDB
        const newResume = new Resume(req.body);
        await newResume.save();

        // 2. Read the LaTeX template
        const template = fs.readFileSync(path.join(__dirname, '../template/template.txt'), 'utf8');

        // 3. Prepare data for Gemini API
        const resumeData = JSON.stringify(req.body, null, 2);
        // console.log("Resume Data:", resumeData);
        const prompt = `modify the below resume with the following data, make sure it looks aesthetically similar and add (if empty or less) or modify relevant descriptions in bullet points in all the sections & a minimal formatting wherever necessary. You can remove empty sections also. Respond with only the LaTeX code, without any formatting or triple backticks.
        \ntemplate:\n${template}\nData:\n${resumeData}`;

        // 4. Call Gemini API and wait for response
        let generatedLatex = await askPrompt(prompt);
        
        if (!generatedLatex) {
            throw new Error('No LaTeX content generated');
        }
// Clean up the response by removing Markdown formatting
generatedLatex = generatedLatex
    .replace(/```latex\s*/g, '') // Remove opening ```latex
    .replace(/```\s*$/g, '')     // Remove closing ```
    .replace(/^LaTeX:\s*/gi, '') // Remove "LaTeX:" prefix if present
    .trim();                     // Remove extra whitespace

if (!generatedLatex.startsWith('\\documentclass')) {
    throw new Error('Invalid LaTeX content generated');
}
        // 5. Create output directory if it doesn't exist
        const outputPath = path.join(__dirname, '../output');
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }

        // 6. Save LaTeX to a temporary file
        const tempFilePath = path.join(outputPath, `resume_${newResume._id}.tex`);
        fs.writeFileSync(tempFilePath, generatedLatex);

        // 7. Compile LaTeX to PDF
        exec(`pdflatex -output-directory="${outputPath}" "${tempFilePath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error compiling LaTeX: ${error}`);
                return res.status(500).json({ message: "PDF generation failed", success: false });
            }

            // 8. Create response with file paths
            const pdfFileName = `resume_${newResume._id}.pdf`;
            
            res.status(201).json({
                message: "Resume created successfully",
                success: true,
                resume: newResume,
                pdfPath: `/output/${pdfFileName}`, // URL path for frontend
                texCode: generatedLatex
            });
        });

    } catch (error) {
        console.error("❌ Error in createResume:", error);
        res.status(500).json({ 
            message: "Internal Server Error", 
            success: false,
            error: error.message 
        });
    }
};

module.exports = { createResume };
const Resume = require('../Models/resume');
const askPrompt = require('../config/geminiConfig');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const createResume = async (req, res) => {
    try {
        // Step 1: Save resume data to MongoDB
        const newResume = new Resume(req.body);
        await newResume.save();

        // Step 2: Read the LaTeX template and prepare the prompt for the Gemini API
        const template = fs.readFileSync(path.join(__dirname, '../template/template.txt'), 'utf8');
        const resumeData = JSON.stringify(req.body, null, 2);
        const prompt = `Modify the below resume with the following data. Ensure it looks aesthetically similar and add (if empty or insufficient) or modify relevant descriptions in bullet points in all sections. Use minimal formatting wherever necessary. Remove empty sections. Respond with only the LaTeX code, without any formatting or triple backticks.\ntemplate:\n${template}\nData:\n${resumeData}`;

        let generatedLatex = await askPrompt(prompt);
        if (!generatedLatex) throw new Error('No LaTeX content generated');

        // Clean up the response
        generatedLatex = generatedLatex
            .replace(/```latex\s*/g, '')
            .replace(/```\s*$/g, '')
            .replace(/^LaTeX:\s*/gi, '')
            .trim();
        if (!generatedLatex.startsWith('\\documentclass')) throw new Error('Invalid LaTeX content generated');

        // Step 3: Save the LaTeX to a temporary file
        const outputPath = path.join(__dirname, '../output');
        if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

        const tempFilePath = path.join(outputPath, `resume_${newResume._id}.tex`);
        fs.writeFileSync(tempFilePath, generatedLatex);

        // Step 4: Compile LaTeX to PDF using pdflatex
        exec(`pdflatex -output-directory="${outputPath}" "${tempFilePath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error compiling LaTeX: ${stderr}`);
                return res.status(500).json({ message: "PDF generation failed", success: false });
            }

            console.log(`pdflatex output: ${stdout}`);

            const pdfFilePath = path.join(outputPath, `resume_${newResume._id}.pdf`);

            // Step 5: Check if the PDF file exists and is valid
            if (!fs.existsSync(pdfFilePath) || fs.statSync(pdfFilePath).size === 0) {
                console.error("PDF file not found or empty:", pdfFilePath);
                return res.status(500).json({ message: "PDF file not found or empty", success: false });
            }

            // Step 6: Respond with the generated PDF path and LaTeX code
            res.status(201).json({
                message: "Resume created successfully",
                success: true,
                resume: newResume,
                pdfPath: `/output/resume_${newResume._id}.pdf`,
                texCode: generatedLatex
            });
        });

    } catch (error) {
        console.error("Error in createResume:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};

module.exports = { createResume };

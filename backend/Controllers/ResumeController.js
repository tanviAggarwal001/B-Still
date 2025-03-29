const Resume = require('../Models/resume');
const { ensureConnection } = require("../Models/db");
const askPrompt = require('../config/geminiConfig');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const createResume = async (req, res) => {
    try {
        // Ensure DB connection is ready before proceeding
        const { bucket } = await ensureConnection();
        const { templateId } = req.body;
        // ✅ Step 1: Create the Resume entry in MongoDB first
        let newResume = new Resume({ ...req.body, fileId: null,  userId: req.body.userId, });
        // await newResume.save(); // Now, newResume._id is available
        
        // Step 2: Read the LaTeX template and prepare the prompt for the Gemini API
        const template = fs.readFileSync(path.join(__dirname, `../template/${templateId}.txt`), 'utf8');

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
        exec(`pdflatex -output-directory="${outputPath}" "${tempFilePath}"`, async (error, stdout, stderr) => {
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

            // Step 6: Store PDF in GridFS using the bucket
            
            const uploadStream = bucket.openUploadStream(`resume_${newResume._id}.pdf`, {
                metadata: { userId: req.body.userId } // ✅ Store userId in GridFS
            });
            
            const readStream = fs.createReadStream(pdfFilePath);
            
            readStream.pipe(uploadStream);

            uploadStream.on("finish", async () => {
                if (!uploadStream.id) {
                    return res.status(500).json({ message: "Failed to retrieve fileId", success: false });
                }
            
                console.log("✅ PDF successfully uploaded to GridFS");

                // Step 5: Create Resume entry **AFTER** file upload
                newResume = new Resume({
                    ...req.body,
                    fileId: uploadStream.id, // ✅ Now fileId is correctly assigned
                    userId: req.body.userId,
                    
                });

                await newResume.save();

                res.status(201).json({
                    message: "Resume created successfully",
                    success: true,
                    resume: { ...newResume._doc, fileId: uploadStream.id },
                    pdfPath: `/resume/download/${uploadStream.id}`,
                });
            
                // Optional cleanup - uncomment if you want to delete temporary files
                fs.unlinkSync(tempFilePath);
                fs.unlinkSync(pdfFilePath);
            });
            
            uploadStream.on("error", (error) => {
                console.error("Error uploading file:", error);
                res.status(500).json({ message: "Error uploading PDF to GridFS", success: false });
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
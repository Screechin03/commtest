import express from "express";
import { Packer, Document, Paragraph, TextRun } from "docx";
import fs from "fs";

const router = express.Router();

router.post("/submit", async (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;

    try {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({ text: "Contact Form Submission", bold: true, size: 32 }),
                            ],
                        }),
                        new Paragraph({ text: `First Name: ${firstName}` }),
                        new Paragraph({ text: `Last Name: ${lastName}` }),
                        new Paragraph({ text: `Email: ${email}` }),
                        new Paragraph({ text: `Phone: ${phone}` }),
                        new Paragraph({ text: `Message: ${message}` }),
                    ],
                },
            ],
        });
        const buffer = await Packer.toBuffer(doc);
        const fileName = `ContactForm_${Date.now()}.docx`;
        fs.writeFileSync(`./documents/${fileName}`, buffer);
        res.status(200).json({ message: "Form data saved successfully.", fileName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving form data.", error });
    }
});

export default router;

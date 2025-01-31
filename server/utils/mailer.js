import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gamil.com',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
});


export const sendEmail = async (from, to, subject, content) => {
    try {
        const info = await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: content
        })
        return info;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}
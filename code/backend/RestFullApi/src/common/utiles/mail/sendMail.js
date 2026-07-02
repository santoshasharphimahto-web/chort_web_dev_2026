import nodemailer from "nodemailer";
import "dotenv/config";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  // FIX: Use an environment variable for the host, or paste your real provider host string
  host: process.env.SMTP_HOST || "smtp.gmail.com", 
  port: parseInt(process.env.SMTP_PORT) || 587, // Best practice: use a dedicated SMTP port var
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, token, name) => {
  const verificationToken = `http://localhost:3000/verifyUserEmail?token=${token}`;

  // FIXED: Changed sendEmail to sendMail
  await transporter.sendMail({
    from: `${process.env.SMPT_FROM_EMAIL}`, 
    to, // This is correct
    // FIXED: Added missing closing quote after ${verificationToken}
    html: `  
    <h1>Welcome to Our App, ${name}!</h1>
    <p>Apna account verify karne ke liye neeche diye gaye link par click karein. Yeh link 1 ghante me expire ho jayegi.</p>
    <a href="${verificationToken}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block;">Verify Email</a>
    `
  });
};

const VerfiyPasswordEmail = async (email, token) => {
  const verificationToken = `http://localhost:3000/verifyPasswordEmail?token=${token}`;

  // FIXED: Changed sendEmail to sendMail
  await transporter.sendMail({
    from: `${process.env.SMPT_FROM_EMAIL}`,
    to: email, // FIXED: Changed 'email' to 'to' (Nodemailer expects 'to')
    html: `
    <h1>Reset your password</h1>
    <p>Reset password karne ke liye neeche diye gaye link par click karein. Yeh link 1 ghante me expire ho jayegi.</p>
    <a href="${verificationToken}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block;">Reset Password</a>
    `
  });
};

export {
  sendEmail,
  VerfiyPasswordEmail
};  
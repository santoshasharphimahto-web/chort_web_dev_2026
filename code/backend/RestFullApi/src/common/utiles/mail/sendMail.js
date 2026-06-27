import {nodemailer} from "nodemailer";
import "dotenv/config"



//  Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: process.env.PORT,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const sendEmail=async(to,token)=>{
    const verficationToken=`http://localhost:3000/verifyUserEmail?token=${token}`

     await transporter.sendEmail({
        from:`${process.env.SMPT_FROM_EMAIL }`,
        to,
        html:`
        <h1>Welcome to Our App, ${name}!</h1>
        <p>Apna account verify karne ke liye neeche diye gaye link par click karein. Yeh link 1 ghante me expire ho jayegi.</p>
        <a href="${verificationToken}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block;">Verify Email</a>
        `
    
    })

}
const VerfiyPasswordEmail=async(email,token)=>{
    const verficationToken=`http://localhost:3000/verifyPasswordEmail?token=${token}`

     await transporter.sendEmail({
        from:`${process.env.SMPT_FROM_EMAIL }`,
        email,

        html:`
        <h1>Reset you password</h1>
        <p>reset passawor karnye  liye neeche diye gaye link par click karein. Yeh link 1 ghante me expire ho jayegi.</p>
        <a href="${verificationToken}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block;">Verify Email</a>
        `
    
    })

}

export{
    sendEmail,
    VerfiyPasswordEmail
}
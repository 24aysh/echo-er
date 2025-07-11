const nodeMailer = require("nodemailer");
const sendEmail = async (details) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure: false,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_APP_PASS,
        },
        authMethod: 'LOGIN',
    });
    const maildetails = {
        from: process.env.SMPT_MAIL,
        to: details.to,
        subject: details.subject,
        html: details.message,
    };
    await transporter.sendMail(maildetails);
};
module.exports = sendEmail;
// sendEmail.js

const nodemailer = require("nodemailer");
const { google } = require("../config/config");

const createTransporter = async () => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: google.email,
            clientId: google.clientID,
            clientSecret: google.clientSecret,
            refreshToken: google.refreshToken,
        },
    });

    return transporter;
};

const sendEmail = async (emailOptions) => {
    const transporter = await createTransporter();
    await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;

const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY, SENGRID_EMAIL_FROM } = process.env;

function sendEmail({ to, subject, html }) {
    sgMail.setApiKey(SENDGRID_API_KEY);

    sgMail.send({
        from: SENGRID_EMAIL_FROM,
        to,
        subject,
        html,
    });
}

module.exports = sendEmail;

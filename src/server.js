const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sendEmailConfirmation = async (userEmail, messageDetails) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password', // Your email password or app password
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: userEmail,
        subject: 'Confirmation of Your Message',
        text: `Thank you for your message! Here are the details:\n\n${messageDetails}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

app.post('/send-email', async (req, res) => {
    const { userEmail, messageDetails } = req.body;
    try {
        await sendEmailConfirmation(userEmail, messageDetails);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
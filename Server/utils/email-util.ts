import nodemailer from 'nodemailer'

const sendEmail = async (email: string, subject: string, body: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: subject,
        html: body,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Verification email sent successfully!');
        }
    });
}

export const prepareEmail = async (email: string, subject: string, body: string): Promise<void> => {

    if (subject === 'user') {
        subject = 'New user added to the application'
    }
    if (subject === 'quiz') {
        subject = 'New quiz added to the application'
    }

    await sendEmail(email as string, subject, body);


}

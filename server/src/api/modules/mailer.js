import nodemailer from 'nodemailer';

const ZOHO_EMAIL = process.env.ZOHO_EMAIL;
const ZOHO_PASSWORD = process.env.ZOHO_PASSWORD;

export const sendInvoiceMail = ({ customerEmail, deliveryAmount, purchaseAmount }) => new Promise((resolve, reject) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: ZOHO_EMAIL,
            pass: ZOHO_PASSWORD
        }
    });

    let mailOptions = {
        from: 'Pipepay <hello@pipepay.africa>',
        to: customerEmail,
        subject: 'Your Invoice Is Ready',
        text: `Your invoice is worth ${deliveryAmount+purchaseAmount}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error', error)
            return reject(new Error("Couldn't send mail"));
        }

        resolve(info);
    });

});
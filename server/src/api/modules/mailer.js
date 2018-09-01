import nodemailer from 'nodemailer';

const ZOHO_EMAIL = process.env.ZOHO_EMAIL;
const ZOHO_PASSWORD = process.env.ZOHO_PASSWORD;

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: ZOHO_EMAIL,
        pass: ZOHO_PASSWORD
    }
});

export const sendInvoiceMail = ({ customerEmail, deliveryAmount, purchaseAmount }) => new Promise((resolve, reject) => {
    let mailOptions = {
        from: 'Pipepay <hello@pipepay.africa>',
        to: customerEmail,
        subject: 'Your Invoice Is Ready',
        text: `Your invoice is worth ${deliveryAmount+purchaseAmount}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return reject(new Error(error));
        }

        resolve(info);
    });
});

const sendTo = (mailOption) => new Promise((resolve, reject) => {
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            return reject(new Error(error));
        }

        resolve(info);
    });
});

export const sendReceiptMail = (customerName, customerEmail, marchantEmail, amount) => new Promise(async (resolve, reject) => {
    let mailOption = {
        from: 'Pipepay <hello@pipepay.africa>',
        subject: 'Your Receipt Is Ready',
        text: `${customerName} made payment of ${amount}`,
    };


    try {
        await Promise.all([
            sendTo({ ...mailOption, to: customerEmail }),
            sendTo({ ...mailOption, to: marchantEmail })
        ]);
        resolve();
    } catch(err) {
        reject(err);
    }
});

export const sendTransferMail = (customerEmail, marchantEmail) => new Promise((esolve, reject) => {

});

export const sendDisputeMail = (customerEmail, marchantEmail, reason, supportEmail = 'support@pipepay.africa') => new Promise(async (resolve, reject) => {
    let mailOption = {
        from: 'Pipepay <hello@pipepay.africa>',
        subject: 'Payment Dispute',
        text: `New dispute from ${customerEmail} reason being that: "${reason}"`
    };

    try {
        await Promise.all([
            sendTo({ ...mailOption, to: customerEmail }),
            sendTo({ ...mailOption, to: marchantEmail })
        ]);
        resolve();
    } catch(err) {
        reject(err);
    }
});
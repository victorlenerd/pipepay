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
            console.log('error', error)
            return reject(new Error("Couldn't send mail"));
        }

        resolve(info);
    });
});

export const sendReceiptMail = ({ customerEmail }, marchantEmail) => new Promise(async (resolve, reject) => {
    let mailOption = {
        from: 'Pipepay <hello@pipepay.africa>',
        subject: 'Your Receipt Is Ready',
        text: `Your invoice is worth ${deliveryAmount+purchaseAmount}`,
    };

    const sendToMarchant = new Promise((resolve, reject) => {
        mailOption.to = marchantEmail;

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('error', error)
                return reject(new Error("Couldn't send mail"));
            }
    
            resolve(info);
        });
    });

    const sendToCustomer = new Promise((resolve, reject) => {
        mailOption.to = customerEmail;

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('error', error)
                return reject(new Error("Couldn't send mail"));
            }
    
            resolve(info);
        });
    });

    try {
        await Promise.all([sendToMarchant, sendToCustomer]);
        resolve();
    } catch(err) {
        reject(err);
    } 
});

export const sendTransferMail = (customerEmail, marchantEmail) => new Promise((esolve, reject) => {

});

export const sendDisputeMail = (customerEmail, marchantEmail, supportEmail = 'support@pipepay.africa') => new Promise((resolve, reject) => {

});
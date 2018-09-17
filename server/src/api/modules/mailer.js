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

const from = 'Pipepay <hello@pipepay.africa>';

export const sendInvoiceMail = ({ customerEmail, totalPrice }) => new Promise((resolve, reject) => {
    let mailOptions = {
        from,
        to: customerEmail,
        subject: 'Your Invoice Is Ready',
        text: `Your invoice is worth ${totalPrice }`,
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
        from,
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

export const sendDisputeMail = (marchantEmail, customerEmail, customerName, reason, disputeFrom, supportEmail = 'hello@pipepay.africa') => new Promise(async (resolve, reject) => {
    let mailOption = {
        from,
        subject: 'Payment Dispute',
    };

    try {
        if (disputeFrom !== 'marchant') {
            await Promise.all([
                sendTo({ ...mailOption, to: customerEmail,  text: 'Your dispute has been received, you will hear from our support rep soon.' }),
                sendTo({ ...mailOption, to: marchantEmail, text: `New dispute from ${customerName} reason being that: "${reason}"` }),
                sendTo({ ...mailOption, to: supportEmail, text: `New dispute from ${customerEmail} reason being that: "${reason}" marchant email is ${marchantEmail}` })
            ]);
        } else {
            await Promise.all([
                sendTo({ ...mailOption, to: customerEmail,  text: 'Your dispute has been received, you will hear from our support rep soon.' }),
                sendTo({ ...mailOption, to: marchantEmail, text: `New dispute from ${customerName} reason being that: "${reason}"` }),
                sendTo({ ...mailOption, to: supportEmail, text: `New dispute from ${marchantEmail} reason being that: "${reason}" customer email is ${customerEmail}` })
            ]);
        }
        resolve();
    } catch(err) {
        reject(err);
    }
});

export const sendCustormerVerificationCode = (customerEmail, code) => new Promise(async (resolve, reject) => {
    let mailOption = {
        from,
        subject: 'Invoice Mail Verification',
        text: `Your invoice verfication code is ${code}`
    };

    try {
        await sendTo({ ...mailOption, to: customerEmail });
        resolve();
    } catch(err) {
        reject(err);
    }
});

export const sendPaymentRequest = ({ amount, name }, customerEmail, marchantName) => new Promise(async (resolve, reject) => {
    let mailOption = {
        from,
        subject: 'Payment Request',
        text: `${marchantName} is requesting for payment for milestone "${name}"`
    };

    try {
        await sendTo({ ...mailOption, to: customerEmail });
        resolve();
    } catch(err) {
        console.log('err', err);
        reject(err);
    }
});
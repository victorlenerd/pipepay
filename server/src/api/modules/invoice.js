import request from 'superagent';
import addDays from 'date-fns/add_days';
const secret = process.env.PAYSTACK_SECRET;

const CreateCustomer = ({ name, email, phone }) => new Promise((resolve, reject) => {
    request
        .post(`https://api.paystack.co/customer`)
        .set("Authorization", `Bearer ${secret}`)
        .send({
            name,
            email,
            phone
        })
        .end((err, { body }) => {
            if (err) reject(err);
            resolve(body);
        });
});

export const CreateInvoice = (customer, amount, description) => new Promise(async (resolve, reject) => {
    const { data: { customer_code } } = await CreateCustomer(customer);
    const due_date = addDays(new Date(), 7);

    request
        .post(`https://api.paystack.co/paymentrequest`)
        .set("Authorization", `Bearer ${secret}`)
        .send({
            customer: customer_code,
            description,
            amount,
            due_date
        })
        .end((err, { body }) => {
            if (err) reject(err);
            resolve(body);
        });
});
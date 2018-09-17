import React from 'react';

class NewInvoice extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            stage: 0,
            type: null,
            milstones: [{
                description: '',
                amount: 0,
                dueDate: new Date()
            }]
        };
    }

    render () {
        const { stage, milstones } = this.state;
        return (
            <section>
                <div className="container">
                    <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
                        {stage === 0 && 
                        (<form name="invoice-type">
                            <h4 className="section-title">Type Of Invoice</h4>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <input id="invoice_type_good" type="radio" name="invoice_type" value="good" />
                                    &nbsp;&nbsp;
                                    <label htmlFor="invoice_type_good">Good / Marchandise</label>
                                    <p>Fugiat voluptate nisi magna pariatur incididunt occaecat aliqua veniam proident. </p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <input id="invoice_type_service" type="radio" name="invoice_type" value="service" />
                                    &nbsp;&nbsp;
                                    <label htmlFor="invoice_type_service">Service / Milestone</label>
                                    <p>Fugiat voluptate nisi magna pariatur incididunt occaecat aliqua veniam proident. </p>
                                </div>
                            </div>
                        </form>)}
                        {stage === 1 &&
                        (<form name="delivery-fee">
                            <h4 className="section-title">Who Pays Delivery Fee</h4>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <input id="who_pays_delivery_fee_customer" type="radio" name="who_pays_delivery_fee" value="buyer" />
                                    &nbsp;&nbsp;
                                    <label htmlFor="who_pays_delivery_fee_customer">Buyer</label>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <input id="who_pays_delivery_fee_both" type="radio" name="who_pays_delivery_fee" value="both" />
                                    &nbsp;&nbsp;
                                    <label htmlFor="who_pays_delivery_fee_both">Both (50 / 50)</label>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <input id="who_pays_delivery_fee_marchant" type="radio" name="who_pays_delivery_fee" value="marchant" />
                                    &nbsp;&nbsp;
                                    <label htmlFor="who_pays_delivery_fee_marchant">Marchant</label>
                                </div>
                            </div>
                        </form>)}
                        {stage === 3 &&
                        (<form name="pipepay-fee">
                            <h4 className="section-title">Who Pays PipePay Fee</h4>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <input id="who_pays_pipepay_fee_customer" type="radio" name="who_pays_pipepay_fee" value="buyer" />
                                    &nbsp;&nbsp;
                                    <label htmlFor="who_pays_pipepay_fee_customer">Buyer</label>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <input id="who_pays_pipepay_fee_both" type="radio" name="who_pays_pipepay_fee" value="both" />
                                    &nbsp;&nbsp;
                                    <label htmlFor="who_pays_pipepay_fee_both">Both (50 / 50)</label>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <input id="who_pays_pipepay_fee_marchant" type="radio" name="who_pays_pipepay_fee" value="marchant" />
                                    &nbsp;&nbsp;
                                    <label htmlFor="who_pays_pipepay_fee_marchant">Marchant</label>
                                </div>
                            </div>
                        </form>)}
                        {stage === 4 && 
                        (<form name="purchase-form">
                            <h4 className="section-title">Purchase Info</h4>
                            <textarea placeholder="Description"></textarea>
                            <input type="number" name="purchase-fee" placeholder="Purchase Price" className="text-input" />
                            <input type="number" name="delivery-fee" placeholder="Delivery Price" className="text-input" />
                        </form>)}
                        {stage === 5 &&
                        (<form name="costomer-form">
                            <h4 className="section-title">Customer Info</h4>
                            <input type="text" name="customer-name" placeholder="Customer Name" id="c-name" className="text-input" />
                            <input type="text" name="customer-phone" placeholder="Customer Phone Number" id="c-phone" className="text-input" />
                            <input type="text" name="customer-email" placeholder="Customer Email" id="c-email" className="text-input" />
                        </form>)}
                        {stage === 6 && 
                        (<form name="milstone-form">
                            <h4 className="section-title">Milestones</h4>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    <label>Amount</label>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    <label>Name or Description</label>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    <label>Due Date</label>
                                </div>
                            </div>
                            <ol className="milestones">
                                {milstones.map(({ description, amount, dueDate }) => {
                                    return (
                                        <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                                <input type="number" value={amount} name="milestone-amount" placeholder="Amount" className="text-input" />
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                                <input type="text" name="milestone-name" value={description} placeholder="Name or Description" id="c-name" className="text-input" />
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                                <input type="date" id="milestone-due-date" value={dueDate} name="milestone-due-date" placeholder="Due Date" className="text-input" />
                                            </div>
                                        </li>
                                    )
                                })}
                            </ol>
                        </form>)}
                        <div className="form-buttons">
                            <input type="submit" value="NEXT" id="send" className="text-submit" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default NewInvoice;
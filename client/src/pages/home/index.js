import React from 'react';
import 'styles/home.css';
import 'styles/bootstrap-grid.css';

class Home extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <section class="intro">
                    <div class="image-holder">
                        <div class="intro-content-container">
                            <div class="intro-container">
                                <div class="row noPad">
                                    <div class="heading">
                                        <h1>PIPEPAY.AFRICA</h1>
                                    </div>
                                </div>
            
                                <div class="row noPad">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-12 noPad">
                                        <div class="description">
                                            <div class="warning">
                                                <h2>Never buy or sell anything online
                                                    <br/> without using Pipepay.
                                                </h2>
                                            </div>
                                            <div class="about">
                                                <p>With Pipepay you can buy or sell anything
                                                    <br />online without the risk of chargebacks.
                                                    <br /> Truly secure payment.
                                                </p>
                                            </div>
                                            <div class="sign-buttons">
                                                <button class="sign-button signIn">
                                                    SIGN IN
                                                </button>
                                                <button class="sign-button">
                                                    SIGN UP
                                                </button>
                                            </div>
                                        </div>
                                    </div>
            
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="rate-container">
                                            <div class="rate-info">
                                                <h2>5%</h2>
                                                <p>Per Transaction.</p>
                                                <br />
                                                <br />
                                                <p>&#x20A6;50 Bank Charges
                                                    <br /> Apply.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="howItWorks">
                    <div class="row noPad">
                        <div class="col-lg-6 col-md-6 col-sm-12 col-12 noPad">
                            <div class="pay-goods-container">
                                <div class="pay-goods">
                                    <p>Complete protection for merchandise
                                        <br /> transactions
                                    </p>
                                    <ol>
                                        <li>Buyer and seller agree on terms</li>
                                        <li>Buyer pays Pipepay.africa</li>
                                        <li>Seller ships the merchandise</li>
                                        <li>Buyer inspects & approves goods</li>
                                        <li>Pipepay.africa pays the seller</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
            
                        <div class="col-lg-6 col-md-6 col-sm-12 col-12 noPad">
                            <div class="pay-services-container">
                                <div class="pay-services">
                                    <p>Complete protection for merchandise
                                        <br /> transactions.
                                    </p>
                                    <ol>
                                        <li>Buyer and seller agree on terms</li>
                                        <li>Buyer pays Pipepay.africa</li>
                                        <li>Seller ships the merchandise</li>
                                        <li>Buyer inspects & approves goods</li>
                                        <li>Pipepay.africa pays the seller</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="contacts">
                    <div class="row ">
                        <div class="col-lg-3 col-md-3 col-sm-6 col-6 noPad shrink">
                            <div class="icons">
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-6 noPad shrink">
                            <div class="contact-info">
                                <h5>Mail:</h5>
                                <p>hello@pippay.africa</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-6 noPad shrink">
                            <div class="contact-info">
                                <h5>Phone:</h5>
                                <p>+234 909 861 2833</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-6 noPad shrink">
                            <div class="contact-info">
                                <h5>Address:</h5>
                                <p>Akoka, Lagos, Nigeria.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default Home;
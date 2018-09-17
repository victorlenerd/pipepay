import React from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends React.PureComponent {
    render() {
        return (
            <section>
                <div className="container">
                    <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <p>Pending Transactions</p>
                                <h3>NGN 0</h3>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <Link to="newinvoice" className="pbtn pull-right">Create New Invoice</Link>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
                    <hr />
                    <ul type="none">
                        <li>
                            <h4>Victor Nwaokocha</h4>
                            <p>Amet ullamco reprehenderit officia ipsum laborum. Esse irure et tempor ex nisi reprehenderit tempor et ullamco mollit et. Minim proident officia quis eu occaecat esse sit sint sit.</p>
                            <span className="label-success">NGN 6000</span><span className="label-warning">Pending</span>
                        </li>
                        <li>
                            <h4>Victor Nwaokocha</h4>
                            <p>Amet ullamco reprehenderit officia ipsum laborum. Esse irure et tempor ex nisi reprehenderit tempor et ullamco mollit et. Minim proident officia quis eu occaecat esse sit sint sit.</p>
                            <span className="label-success">NGN 6000</span><span className="label-warning">Pending</span>
                        </li>
                    </ul>
                </div>
                </div>
            </section>
        );
    }
}

export default Dashboard;
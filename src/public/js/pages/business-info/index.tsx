import React from "react";
import { RouteComponentProps } from "react-router";
import BusinessInfoForm from "../../components/business-info";
import { withRouter } from "react-router-dom";
import { withAppContext, IWithAppContext } from "../../contexts/app.context";

class BusinessInfo extends React.PureComponent<RouteComponentProps & IWithAppContext> {

	handleOnComplete = () => {
		this.props.history.push("/invoices");
	};

	render() {
		const { user } = this.props.appContext;

		return (
			<div id="container">
				<div className="container-main">
					<div className="container">
						<div className="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2 col-sm-12 col-xs-12">
							<div className="header">
								<h1>Tell us more about your business.</h1>
							</div>
							<br />
							<br />
							{user && <BusinessInfoForm onComplete={this.handleOnComplete} />}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withAppContext(withRouter(BusinessInfo));

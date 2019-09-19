import React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import ReportComponent from "../../components/report";

type IState = {
	invoiceId: string
};

class Report extends React.PureComponent<RouteComponentProps> {
	state: IState = {
		invoiceId: ""
	};

	componentDidMount() {
		const {
			match: {
				// @ts-ignore: Match
				params: { invoiceId }
			}
		} = this.props;

		this.setState({ invoiceId });
	}

	render() {
		return <ReportComponent from="merchant" invoiceId={this.state.invoiceId} />;
	}
}

export default withRouter(Report);

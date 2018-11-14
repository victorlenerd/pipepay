//@flow
import React from "react";
import { withRouter } from "react-router-dom";
import type { RouterHistory } from "react-router-dom";
import ReportComponent from "../../components/report";

type Props = {
	match: {
		params: {
			invoiceId: string
		}
	}
};

type State = {
	invoiceId: string
};

class Report extends React.PureComponent<Props, State> {
	state = {
		invoiceId: ""
	};

	componentWillMount() {
		const {
			match: {
				params: { invoiceId }
			}
		} = this.props;

		this.setState({ invoiceId });
	}

	render() {
		return <ReportComponent from="marchant" invoiceId={this.state.invoiceId} />;
	}
}

export default withRouter(Report);

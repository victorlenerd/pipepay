import React from "react";

const ReAuthModal = (props) => {
	const {error, loginAgain, confirmPasswordEl} = props;

	return (
		<div
			id="confirm-password-modal"
			className="modal fade bs-example-modal-sm"
			tabIndex={-1}
			role="dialog"
			aria-labelledby="mySmallModalLabel"
		>
			<div className="modal-dialog modal-sm" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 className="modal-title" id="myModalLabel">
							Enter Password
						</h4>
					</div>
					<form>
						<div className="modal-body">
							{error && <div className="alert alert-danger">{error}</div>}
							<input
								autoComplete="current-password"
								type="password"
								className="form-control"
								ref={confirmPasswordEl}
							/>

						</div>
						<div className="modal-footer">
							<input
								type="button"
								className="btn btn-small btn-primary"
								value="Submit"
								onClick={loginAgain}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ReAuthModal;

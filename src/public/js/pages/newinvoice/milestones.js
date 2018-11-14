//@flow
import React from "react";

type Props = {
	milestones: Array<{
		amount: number,
		description: string,
		dueDate: string
	}>,
	submit: (e: {}) => void,
	addMilestone: () => void,
	updateMilestone: (index: number) => void,
	removeMilestone: (index: number) => void,
	back: () => void
};

const Milestones = ({
	milestones,
	submit,
	back,
	removeMilestone,
	addMilestone,
	updateMilestone
}: Props) => (
	<form name="milstone-form" onSubmit={submit}>
		<div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
			<h3 className="section-title">Milestones</h3>
			<br />
			<ol className="milestones">
				{milestones.map(({ description, amount, dueDate }, i) => {
					return (
						<li className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={i}>
							<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
								<label className="text-center">Amount</label>
								<input
									type="number"
									value={amount}
									name="milestone-amount"
									placeholder="e.g 1000"
									id={`milestone-amount-${i}`}
									className="text-input"
									onChange={e => {
										milestones[i].amount = Number(e.target.value);
										updateMilestone(milestones);
									}}
									required
								/>
							</div>
							<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
								<label className="text-center">Description</label>
								<input
									type="text"
									value={description}
									name="milestone-name"
									placeholder="e.g Web Design"
									id={`milestone-name-${i}`}
									className="text-input"
									onChange={e => {
										milestones[i].description = e.target.value;
										updateMilestone(milestones);
									}}
									required
								/>
							</div>
							<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
								<label className="text-center">Due Date</label>
								<input
									type="date"
									value={dueDate}
									id={`milestone-date-${i}`}
									name="milestone-dueDate"
									placeholder="Due Date"
									className="text-input"
									onChange={e => {
										milestones[i].dueDate = e.target.value;
										updateMilestone(milestones);
									}}
									required
								/>
							</div>
							<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center">
								<button
									className="milestone-remove-btn"
									onClick={() => removeMilestone(i)}
								>
									REMOVE
								</button>
							</div>
						</li>
					);
				})}
			</ol>
			<button className="add-milestone-btn" onClick={addMilestone}>
				Add Milestone
			</button>
			<div className="clearfix" />
			<div className="form-buttons">
				<input
					name="back-button"
					type="button"
					value="BACK"
					className="text-submit-inverse"
					onClick={back}
				/>
				<input type="submit" value="NEXT" id="send" className="text-submit" />
			</div>
		</div>
	</form>
);

export default Milestones;

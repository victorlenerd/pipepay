import React from "react";
import ReactDom from "react-dom";
import { render } from "react-testing-library";
import NewInvoice from "./index";

test("Create New Invoice", () => {

	const { container } = render(<NewInvoice />);

	it("Can submit with valid milestones", () => {
        
	});

});
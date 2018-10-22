import React from "react";
import Signup from "./index";
import { Simulate } from "react-dom/test-utils";
import { renderWithRouter } from "../../utils/testutils";

xdescribe("Sign Up Page", () => {
	const { getByPlaceholderText, container } = renderWithRouter(<Signup />);

	const fakeUser = {
		firstName: "Victor",
		lastName: "Nwaokocha",
		email: "vnwaokocha@gmail.com",
		pass: "javascript"
	};

	let inputFirstName;
	let inputLastName;
	let inputEmail;
	let inputPass;
	let form;

	beforeEach(() => {
		inputFirstName = getByPlaceholderText("First Name");
		inputLastName = getByPlaceholderText("Last Name");
		inputEmail = getByPlaceholderText("Email");
		inputPass = getByPlaceholderText("Password");
		form = container.querySelector("form");

		inputFirstName.value = fakeUser.firstName;
		inputLastName.value = fakeUser.lastName;
		inputEmail.value = fakeUser.email;
	});

	it("Show error message for invalid form", () => {
		Simulate.submit(form);
		expect(container.innerHTML).toMatch("Please fill all the required fields.");
	});

	it("Submit valid form", () => {
		inputPass.value = fakeUser.pass;
		Simulate.submit(form);
		// expect(Signup.proptotype.state.error).to.be.equal(true);
	});
});

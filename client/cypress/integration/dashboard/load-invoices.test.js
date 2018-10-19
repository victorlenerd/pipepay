describe("Dashboard", () => {
	before(() => {
		cy.visit("http://localhost:3004");
	});

	context("Login", () => {
		it("Show All Invoices", () => {
			cy.get(".action-header.login-btn").click();
			cy.url().should("include", "/signin");
			cy.get("[name='email']").type("vnwaokocha@gmail.com");
			cy.get("[name='password']").type("javascript");
			cy.get("[type='submit']").click();

			cy.wait(5000);
			cy.contains("Victor");
		});
	});
});

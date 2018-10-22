describe("Dashboard", () => {
	before(() => {
		cy.visit("http://localhost:3004");
	});

	context("Login", () => {
		it("Login", () => {
			cy.get(".action-header.login-btn").click();
			cy.url().should("include", "/signin");
			cy.get("[name='email']").type("vnwaokocha@gmail.com");
			cy.get("[name='password']").type("javascript");
			cy.get("[type='submit']").click();

			cy.wait(5000);
		});
	});

	context("Invoices", () => {
		it("Create New Invoice Good Invoice", () => {
			cy.url().should("include", "/invoices");

			cy.get("[href='/newinvoice']").click();

			cy.get("#invoice_type_good").check();
			cy.get("[name='invoice-type-submit']").click();

			cy.contains("Who Pays Delivery Fee");
			cy.get("#who_pays_delivery_fee_customer").check();
			cy.get("[name='invoice-type-delivery']").click();

			cy.contains("Who Pays PipePay Fee");
			cy.get("#who_pays_pipepay_fee_customer").check();
			cy.get("[name='invoice-type-pipepay']").click();

			cy.contains("Purchase Info");
			cy.get("[name='description']").type("Well this is tes invoice");
			cy.get("[name='purchase_amount']").type(10000);
			cy.get("[name='delivery_fee']").type(500);
			cy.get("#send").click();

			cy.contains("Customer Info");
			cy.get("[name='customerName']").type("Victor");
			cy.get("[name='customerPhone']").type("08147144177");
			cy.get("[name='customerEmail']").type("vnwaokocha@gmail.com");
			cy.get("#send").click();

			cy.contains("Summary");
			cy.get("#send").click();

			cy.get("#back_to_invoices").click();
			cy.url().should("include", "/invoices");
		});
	});
});

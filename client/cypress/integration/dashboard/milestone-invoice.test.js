describe("Dashboard", () => {

	before(() => {
		cy.visit("http://localhost:3004");
	});

	context("Login", () => {

		it("Login", () => {
			cy.get(".action-header.login-btn").click();
			cy
				.url()
				.should("include", "/signin");
			cy.get("[name='email']").type("vnwaokocha@gmail.com");
			cy.get("[name='password']").type("javascript");
			cy.get("[type='submit']").click();
            
			cy.wait(2000);

		});
        
	});

	context("Invoices", () => {

		it("Create New Invoice Milestone Invoice", () => {
			cy
				.url()
				.should("include", "/invoices");
        
			cy.get("[href='/newinvoice']").click();
            
			cy.get("#invoice_type_service").check();
			cy.get("[name='invoice-type-submit']").click();
            
			cy.contains("Customer Info");
			cy.get("[name='customerName']").type("Victor");
			cy.get("[name='customerPhone']").type("08147144177");
			cy.get("[name='customerEmail']").type("vnwaokocha@gmail.com");
			cy.get("#send").click();

			cy.contains("Milestones");
			cy.get("#milestone-amount-0").type(1000);
			cy.get("#milestone-name-0").type("Web Design");
			cy.get("#milestone-date-0").type("2018-10-10");
            
			cy.get("#milestone-amount-1").type(2000);
			cy.get("#milestone-name-1").type("Web Design");
			cy.get("#milestone-date-1").type("2018-10-10");
            
			cy.get("#milestone-amount-2").type(3000);
			cy.get("#milestone-name-2").type("Web Design");
			cy.get("#milestone-date-2").type("2018-10-10");
            
			cy.get(".add-milestone-btn").click();
			cy.get("#milestone-amount-3").type(4000);
			cy.get("#milestone-name-3").type("Web Design");
			cy.get("#milestone-date-3").type("2018-10-10");
			cy.get("#send").click();

			cy.contains("Summary");
		});
        
	});
    

});
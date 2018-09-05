describe.skip('Upate Account Number', ()=> {

    before(() => {
        cy.visit('http://localhost:3004/signin');

        cy.get("[name='email']")
          .type('vnwaokocha@gmail.com');

        cy.get("[name='password']")
          .type('javascript');

        cy.get('[name="sign-in"]')
            .click()
    })
    
    it('Navigate to account number setup page', () => {
        cy.contains('Account Number');
    });

    it('Enter account details', () => {
        cy.get('select').select('Access Bank');
        cy.get("[name='accountnumber']").type('0695257934');
        cy.get('#next-btn').click()
    });

    it('Show account name', () => {
        cy.contains('VICTOR');
    });

    it.skip('Check other account number', () => {
        cy.get('select').select('Diamond Bank');
        cy.get("[name='accountnumber']").clear();
        cy.get("[name='accountnumber']").type('00374150o3');
        cy.get('#next-btn').click()
    });

    it.skip('Show cannot resolve account', () => {
        cy.contains('Cannot resolve account', { timeout: 10000 });
    });

    it('Set Atributes For Account Details', () => {
        cy.get('#submit-btn')
        .click().then(() => {
            cy.url().should('include', '/dashboard');
        });
    });

});
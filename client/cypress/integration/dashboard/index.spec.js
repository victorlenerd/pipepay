describe('Dashboard', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3004/')
    });

    context('Invoice', () => {
        it('Show No Invoice Message', () => {
            cy.contains('You don\'t have any invoice yet press the plus button to create one');
        });
    });

})
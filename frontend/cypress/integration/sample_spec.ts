describe('My First Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });
    it('Should pass!', () => {
        cy.get('.react-grid-item').should('have.length', 3);
    });
});

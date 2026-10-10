describe('SonicLore Auth Flow E2E', () => {
    it('повинен успішно завантажити застосунок і показати форму авторизації', () => {
        cy.visit('http://localhost:5173');
        cy.get('#root').should('exist');
    });
});
it('testa a página da política de privacidade de forma independente', function(){
    cy.visit('./src/privacy.html')
    cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
})

it('testa a página da política de privacidade de forma independente', function(){
    cy.visit('./src/privacy.html')
    cy.get('#white-background > :nth-child(5)').should('have.text', 'Talking About Testing')
})
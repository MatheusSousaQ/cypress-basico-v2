/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
      })

    it('verifica o título da aplicação', function() {
                
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT') 
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
                
        cy.get('#firstName').type('Matheus')
        cy.get('#lastName').type('Quintanilha')
        cy.get('#email').type('matheus@gmail.com')
        cy.get('#phone').type('123456789')
        cy.get('#open-text-area').type('testando com cypress, pois alem de saber selenium com C# e Java, notei no mercado a importancia de saber automacao de teste com Cypress também, afinal é uma excelente ferramenta da qual é muito requisitada atualmente',{ delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
                
        cy.get('#firstName').type('Matheus')
        cy.get('#lastName').type('Quintanilha')
        cy.get('#email').type('matheus.gmail.com')
        cy.get('#phone').type('123456789')
        cy.get('#open-text-area').type('testando com cypress, pois alem de saber selenium com C# e Java, notei no mercado a importancia de saber automacao de teste com Cypress também, afinal é uma excelente ferramenta da qual é muito requisitada atualmente',{ delay: 0 })
        cy.get('.button').click()
        cy.get('.error').should('be.visible')

    })

    it('campo telefone fica vazio ao digital algo nao numerico', function() {
                
        cy.get('#firstName').type('Matheus')
        cy.get('#lastName').type('Quintanilha')
        cy.get('#email').type('matheus.gmail.com')
        cy.get('#phone').type('testeteste', { delay: 100 }).should('have.text', '')
        
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
                
        cy.get('#firstName').type('Matheus')
        cy.get('#lastName').type('Quintanilha')
        cy.get('#email').type('matheus@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Enviando qualquer info')
        cy.get('.button').click()
        
        cy.get('.error').should('have.text'.trim, 'Valide os campos obrigatórios!')
        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
                
        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus').clear().should('have.value','')
        cy.get('#lastName').type('Quintanilha').should('have.value', 'Quintanilha').clear().should('have.value','')
        cy.get('#email').type('matheus@gmail.com').should('have.value', 'matheus@gmail.com').clear().should('have.value','')
        cy.get('#phone').type('123456789').should('have.value', '123456789').clear().should('have.value', '')             
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
                
        cy.get('.button').click()
        cy.get('.error').should('have.value'.trim, 'Valide os campos obrigatórios!')           
        
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
                
        cy.fillMandatoryFieldsAndSubmit('Nath', 'Quintanilha', 'nath@gmail.com', '987654321', 'teste sobrancelha')
        cy.get('.success').should('be.visible')
        
    })

    it('identifica o enviar pelo cy.contains', function() {
                
        cy.get('#firstName').type('Cypress')
        cy.get('#lastName').type('io')
        cy.get('#email').type('cypress@gmail.com')
        cy.get('#phone').type('123456789')
        cy.get('#open-text-area').type('Cypress io test.',{ delay: 0 })
        cy.contains('.button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        
    })

    //secao 4

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    //secao 5
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked') // check para radio box
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(($radio) =>{   //each joga os elementos no array, e recebe uma funcao
                cy.wrap($radio).check().should('be.checked') //passa por cada elemento do array
            })        
    })

    //secao 6
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked')
        .last().uncheck().should('not.be.checked')

    })

    //secao 7
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('campo de futebol.jpg').as('futebol')
        cy.get('input[type="file"]').selectFile('@futebol')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('campo de futebol.jpg')
            })
    })   

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target')
            .click()
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
    })

    it('testa a página da política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
    })

    it('testa a página da política de privacidade de forma independente3', function(){
        cy.visit('./src/privacy.html')
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
    })
})
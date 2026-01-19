describe('all frontend tests', () => {

  beforeEach('visit page', () => {
    cy.visit('http://localhost:4200/')
  })

  it('visits page', () => {
    cy.get('h1').should('contain', 'IPA Help Page')
  })

  it('login', () => {
    const username = "caroline";

    cy.get("input#username")
      .should("be.visible")
      .clear()
      .type(`${username}{enter}`);

    cy.url().should("include", username);
  })
})

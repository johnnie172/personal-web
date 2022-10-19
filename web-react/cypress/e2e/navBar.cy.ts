describe("navbar component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  // check url change when clicking different pages
  it("check navbar buttons", () => {
    cy.get("#navbar");
    cy.get("button")
      .contains("Contact")
      .click()
      .then(() => cy.url().should("include", "/Contact"));
    cy.get("button")
      .contains("Locations")
      .click()
      .then(() => cy.url().should("include", "/Locations"));
    cy.get("button")
      .contains("Home")
      .click()
      .then(() => cy.url().should("include", "/Home"));
    });
    // on click of theme button check if set to dark after clearing local storage
    it("check theme change", () => {
    cy.get("#navbar");
    cy.clearLocalStorage().should(localStorage => {
        expect(localStorage.getItem('theme')).to.be.null;
    });
    cy.wait(1000)
    cy.get('button[id="btn-theme"]')
    .click().should(() => {
        expect(localStorage.getItem('theme')).to.eq('"dark"');
    });
    cy.get("#navbar")
      .should("have.css", "background-color")
      .and("eq", "rgb(18, 18, 18)");
  })
});
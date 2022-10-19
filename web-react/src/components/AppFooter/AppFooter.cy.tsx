import AppFooter from "./AppFooter";
import { mount } from "@cypress/react18";

describe("<AppFooter>", () => {
    beforeEach(() => {
        mount(<AppFooter {...{title: "Footer", subtitle: "subtitle", link: ""}}/>);
      });
  it("mounts", () => {
  });
  it("check for strings", ()=>{
    cy.get("#footer-title").should("have.text", "Footer");
    cy.get("#footer-subtitle").should("have.text", "subtitle");
    cy.get("#footer-copyright").should('include.text', `${new Date().getFullYear()}.`)
})
});

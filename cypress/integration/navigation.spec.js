describe("Navigation", () => {
  // before(() => {
  //   cy.visit("/");
  // });
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.contains("li", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});

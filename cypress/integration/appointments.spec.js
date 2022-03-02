describe("Appointments", () => {
  it("should book an interview", () => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/")
      .contains("Monday")
      .get("[alt=Add]")
      .first()
      .click()
      .get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones", { delay: 50 })
      .get("[alt='Sylvia Palmer']")
      .click();

    cy.contains("Save").click();
    // .contains("img", "Add")
    // .click()
    // .should("have.class", "day-list__item--selected");
  });
});

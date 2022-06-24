const TEST_EMAIL = "test@email.com";
const INVALID_EMAIL = "foo@bar";

const successfulFormSubmit = () => {
  cy.intercept("POST", "/api/newsletter", {
    statusCode: 200,
    body: {
      success: true,
      message: "Success message",
    },
  });

  cy.get('[data-test="emailInput"]').type(TEST_EMAIL);
  cy.get('[data-test="formSubmit"]').click();
};

describe("Newsletter signup", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays a message explaining the form's purpose", () => {
    cy.get('[data-test="newsletter"]').contains("Sign up for our newsletter");
  });

  it("allows for completing a newsletter signup", () => {
    successfulFormSubmit();
    cy.get('[data-test="successMessage"]').should("exist");
  });

  it("allows for submitting the form by using the enter key", () => {
    cy.intercept("POST", "/api/newsletter", {
      statusCode: 200,
      body: {
        success: true,
        message: "Success message",
      },
    });

    cy.get('[data-test="emailInput"]').type("test@email.com{enter}");
    cy.get('[data-test="successMessage"]').should("exist");
  });

  it("displays an error message if input value is not a valid email address on submit", () => {
    cy.get('[data-test="emailInput"]').type(`${INVALID_EMAIL}{enter}`);
    cy.get('[data-test="errorMessage"]').should("exist");
  });

  it("displays an error message if the input field is empty on submit", () => {
    cy.get('[data-test="emailInput"]').type("{enter}");
    cy.get('[data-test="errorMessage"]').should("exist");
  });

  it("clears the email input if signup is successful", () => {
    successfulFormSubmit();
    cy.get("#emailInput").should("have.value", "");
  });

  it("persists the email input value if there is an error", () => {
    cy.get('[data-test="emailInput"]').type(`${INVALID_EMAIL}{enter}`);
    cy.get("#emailInput").should("have.value", INVALID_EMAIL);
  });
});

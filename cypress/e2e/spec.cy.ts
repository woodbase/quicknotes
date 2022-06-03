describe("Site is running", () => {
  it("should visit", () => {
    cy.visit("http://localhost:8081/");
  });

  it("should contain a table with the word content", () => {
    cy.visit("http://localhost:8081/");
    const table = cy.get("table");
    table.contains("Content");
  });
});

describe("Appointments", () => {
    beforeEach(() => {
        cy.request("GET", "/api/debug/reset")
            .visit("/")
            .contains("Monday");
    });

    it("should book an interview", () => {
        cy.get("[alt=Add]")
            .first()
            .click()
            .get("[data-testid=student-name-input]").type("Lydia Miller-Jones")
            .get('[alt="Sylvia Palmer"]').click()
            .get("[class = 'button button--confirm']")
            .click()

        cy.contains(".appointment__card--show", "Sylvia Palmer")
            .request("GET", "/api/debug/reset");

    });

    it("should edit an interview", () => {
        cy.get("[alt=Edit]")
            .click({ force: true })
            .get("[data-testid=student-name-input]").clear()
            .type("Lydia Miller-Jones")
            .get('[alt="Tori Malcolm"]').click()
            .get("[class = 'button button--confirm']")
            .click()

        cy.contains(".appointment__card--show", "Lydia Miller-Jones")
            .contains(".appointment__card--show", "Tori Malcolm")
            .request("GET", "/api/debug/reset");
    })
    it("should cancel an interview", () => {
        cy.get("article")
            .first()
            .get("[alt=Delete]").click({ force: true })
            .get("button").last()
            .click()

        cy.contains(".appointment__card--show", "Archie Cohen")
            .should("not.exist")
            .request("GET", "/api/debug/reset");


    })
});


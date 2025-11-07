import users from '../../fixtures/users.json'

describe("Main page", () => {
    const expectedNavLinks = [
        " Garage ",
        " Fuel expenses ",
        " Instructions ",
        " Log out ",
        ]
    beforeEach(() => {
        console.log(users)
        // cy.visit("/");
        // cy.contains("Guest log in").click()
        cy.loginAsGuest()
    });

    // it("all nav links should be visible", () => {
    //   cy.get("nav.sidebar a").then(($links) => {
    //     const linkTexts = $links.map((index, link) => link.textContent).get();
    //     expect(linkTexts, "Navigation links should be valid").to.be.deep.eq(expectedNavLinks);
    //   })
    // })

    for (const {input, expected, title} of users) {
        it(title, () => {
           cy.get("#emailInput").type(input.email)
            cy.get('.error-message').should('have.text', expected.message)
        })
    }

    it("all nav links should be visible", () => {
        cy.get("nav.sidebar a").each(($link) => {
            cy.wrap(expectedNavLinks).should('contain', $link.text());
        })
    })
})

describe("Main page", () => {
    const expectedNavLinks = [
        " Garage ",
        " Fuel expenses ",
        " Instructions ",
        " Log out ",
        ]
    beforeEach(() => {
        cy.visit("/");
        cy.contains("Guest log in").click()
    });

    // it("all nav links should be visible", () => {
    //   cy.get("nav.sidebar a").then(($links) => {
    //     const linkTexts = $links.map((index, link) => link.textContent).get();
    //     expect(linkTexts, "Navigation links should be valid").to.be.deep.eq(expectedNavLinks);
    //   })
    // })

    it("all nav links should be visible", () => {
        cy.get("nav.sidebar a").each(($link) => {
            cy.wrap(expectedNavLinks).should('contain', $link.text());
        })
    })
})
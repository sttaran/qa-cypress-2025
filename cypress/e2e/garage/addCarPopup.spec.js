import fakeCarBrands from '../../fixtures/fakeCarBrands.json';

describe("Garage page", () => {
    beforeEach(() => {
        cy.loginAsGuest()
    });

    it("brands response should be successful", () => {
        cy.intercept("GET", "/api/cars/brands").as("getBrandsRequest")

        cy.get('.btn-primary').click();

        cy.wait("@getBrandsRequest").its("response.statusCode").should("equal", 200)
    })

    it("popup should display data from the API", () => {
        cy.intercept("GET", "/api/cars/brands", {fixture: 'fakeCarBrands.json'})

        cy.get('.btn-primary').click();

        cy.get("#addCarBrand option").then(($options) => {
            const brands = $options.map((index, link) => link.textContent).get();
            expect(brands, "Displayed brands should be valid").to.be.deep.eq(
                fakeCarBrands.data.map(({title}) => title)
            );
        })

    })

    it("select should be disabled when brands response status code is 404", () => {
        cy.intercept("GET", "/api/cars/brands", {statusCode: 404})

        cy.get('.btn-primary').click();

        cy.get(".modal-content").should("be.visible")
            .within(()=>{
                cy.get("#addCarBrand").should("be.disabled");
            })

    })
})
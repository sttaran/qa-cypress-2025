import validBrandsResponse from '../../fixtures/validBrandsResponse.json';

describe("Cars API", () => {
    it("brands response should be successful", () => {
        // cy.request("GET", "/api/cars/brands", )
        //     .its("body")
        //     .should("deep.equal", validBrandsResponse);

        // cy.request({
        //     log: true,
        //     url: `/api/cars/brands`,
        //     method: 'GET',
        // })
        //     .its("body")
        //     .should("deep.equal", validBrandsResponse);

        cy.api({
            url: '/api/cars/brands',
            method: 'GET',
        })
            .its("body")
            .should("deep.equal", validBrandsResponse);
    })
})
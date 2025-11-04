import { faker } from '@faker-js/faker';

describe("Authentication - Login", () => {
    const password = `Qwerty${faker.number.int({min: 100, max: 999})}`
    const userData = {
        "name": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "email": faker.internet.email(),
        "password": password,
        "repeatPassword": password
    }

    beforeEach(() => {
        cy.visit("/");
        // cy.get(".btn-primary").click()
        cy.get(".btn-primary").as("loginBtn");
        cy.get("@loginBtn").click();

        cy.get('.modal-content').within(($form)=>{
            cy.wrap($form).should("have.class", "modal-content");
            cy.get("#signupName").type(userData.name)
            cy.get("#signupLastName").type(userData.lastName)
            cy.get("#signupEmail").type(userData.email)
            cy.get("#signupPassword").type(userData.password)
            cy.get("#signupRepeatPassword").type(userData.password)

            cy.get(".btn-primary").click()
        })
        // cy.get('.modal-content').as("modal");
        // cy.get("@modal").find("#signupName").type(userData.name)
        // cy.get("@modal").find("#signupLastName").type(userData.lastName)
        // cy.get("@modal").find("#signupEmail").type(userData.email)
        // cy.get("@modal").find("#signupPassword").type(userData.password)
        // cy.get("@modal").find("#signupRepeatPassword").type(userData.password)
        //
        // cy.get("@modal").find(".btn-primary").click()

        cy.get("#userNavDropdown").click()
        cy.get(".user-nav_menu .user-nav_link").contains("Logout").click();
    });

    it("should log in successfully with valid credentials", () => {
        cy.get(".header_signin").click();

        cy.get('.modal-content').within(()=>{
            cy.get("#signinEmail").type(userData.email)
            cy.get("#signinPassword").type(userData.password)

            cy.get(".btn-primary").click()

            cy.location().its("pathname").should("eq", "/panel/garage")
        })
        cy.get(".btn-primary").filter(':contains("Add car")').should("be.visible")
    })
})
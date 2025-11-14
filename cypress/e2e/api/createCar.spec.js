import {faker} from "@faker-js/faker";

describe("Cars API", () => {
     before(()=>{
         const password = `Qwerty${faker.number.int({min: 100, max: 999})}`
         const userData = {
             "name": faker.person.firstName(),
             "lastName": faker.person.lastName(),
             "email": faker.internet.email(),
             "password": password,
             "repeatPassword": password
         }

         cy.api({
            method: 'POST',
            url: '/api/auth/signup',
            body: userData
         }).its("status").should('equal', 201)

         cy.api({
            method: 'POST',
             url:"/api/auth/signin",
             body: {
                 "email": userData.email,
                 "password": userData.password,
                 "remember": false
             }
         })
     })

    it("create car", () => {
        cy.api({
            url: '/api/cars/brands',
            method: 'GET',
        })
            .its("body.data").as("brandsData")

        cy.api({
            url: '/api/cars/models',
            method: 'GET',
        })
            .its("body.data").as("modelsData")

        cy.get("@brandsData").then((brands)=>{
          const brand = brands[0];

            cy.get("@modelsData").then((models)=>{
                const model = models.find(m => m.carBrandId === brand.id);

                const requestBody = {
                    carBrandId: brand.id,
                    carModelId: model.id,
                    mileage: faker.number.int({ min: 1, max: 200_000 }),
                }

                cy.api({
                    method: 'POST',
                    url: '/api/cars',
                    body: requestBody
                }).then((response)=>{
                    expect(response.status).to.eq(201);
                    console.log(response)
                })
            })

        })
    })
})
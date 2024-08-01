Cypress.Commands.add('postUser', (user) => {
    cy.api({
        url: 'http://localhost:3333/users',
        method: 'POST',
        body: user,
        failOnStatusCode: false
    }).then(response => { return response }) // escapsulamento para reaproveitar codigo
})


Cypress.Commands.add('postSession', (user) => {
    cy.api({
        url: '/sessions',
        method: 'POST',
        body: {
            email: user.email,
            password: user.password
        },
        failOnStatusCode: false
    }).then(response => { return response }) // escapsulamento para reaproveitar codigo
})


Cypress.Commands.add('postTask', (task, token) => {
    cy.api({
        url: '/tasks',
        method: 'POST',
        body: task,
        headers: {
            Authorization: token
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('getUniqueTask', (taskId, token) => {
    cy.api({
        url: '/tasks/' + taskId,
        method: 'GET',
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('deleteTask', (taskId, token) => {
    cy.api({
        url: '/tasks/' + taskId,
        method: 'DELETE',
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    }).then(response => { return response })
})


Cypress.Commands.add('getTasks', (token) => {
    cy.api({
        url: '/tasks',
        method: 'GET',
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('putTaskDone', (taskId, token) => {
    cy.api({
        // url: '/tasks' + taskId + '/done', // concatenação 
        url: `/tasks/${taskId}/done`, // interpolação de string
        method: 'PUT',
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    }).then(response => { return response })
})
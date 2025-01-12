describe('GET /tasks', () => {

    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks
        })
    })
    it('get my tasks', function () {

        const { user, tasks } = this.tasks.list

        cy.task('removeTaskLike', 'estud4r')

        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user)
            .then(respUser => {

                tasks.forEach(function (task) {
                    cy.postTask(task, respUser.body.token)
                })

                cy.getTasks(respUser.body.token)
                    .then(response => {
                        expect(response.status).to.eq(200)
                    }).its('body')  // função .its(serve para obter uma propriedade )
                    .should('be.an', 'array')
                    .and('have.length', tasks.length)
            })
    });
});

describe('GET /tasks/:id', () => {

    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks
        })
    })

    it('get unique task', function () {
        const { user, task } = this.tasks.unique

        cy.task('removeTask', task.name, task.email)
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user)
            .then(userResp => {
                cy.postTask(task, userResp.body.token)
                    .then(taskResp => {
                        cy.getUniqueTask(taskResp.body._id, userResp.body.token)
                            .then(response => {
                                expect(response.status).to.eq(200)
                            })

                    })
            })
    })


    it('task not found', function () {

        const { user, task } = this.tasks.not_found


        cy.task('removeTask', task.name, task.email)
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user)
            .then(userResp => {

                cy.postTask(task, userResp.body.token)
                    .then(taskResp => {

                        cy.deleteTask(taskResp.body._id, userResp.body.token)
                            .then(response => {
                                expect(response.status).to.eq(204)
                            })

                        cy.getUniqueTask(taskResp.body._id, userResp.body.token)
                            .then(response => {
                                expect(response.status).to.eq(404)
                            })

                    })
            })
    })

})
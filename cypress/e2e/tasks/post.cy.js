describe('POST /tasks', () => {

    beforeEach(function () {
        cy.fixture('tasks/post').then(function (tasks) {
            this.tasks = tasks
        })
    })

    it('register a new task', function () {

        const { user, task } = this.tasks.create

        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.task('removeTask', task.name, user.email)

        cy.postSession(user) // se coloca dentro do callback, consegue acessar o token, e atribuir no cabecario
            .then(userResp => {
                cy.postTask(task, userResp.body.token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                        expect(response.body.name).to.eq(task.name)
                        expect(response.body.tags).to.eql(task.tags)
                        expect(response.body.is_done).to.be.false
                        expect(response.body.user).to.eq(userResp.body.user._id)
                        expect(response.body._id.length).to.eq(24)
                    })
            })
    })
    it.only('duplicate task', function (duplicate) {
        const { user, task } = this.tasks.duplicate
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user) // se coloca dentro do callback, consegue acessar o token, e atribuir no cabecario
            .then(userResp => {
                cy.task('removeTask', task.name, user.email)
                
                cy.postTask(task, userResp.body.token)
                cy.postTask(task, userResp.body.token)
                    .then(response => {
                        expect(response.status).to.eq(409)
                        expect(response.body.message).to.eq('Duplicated task!')
                    })
            })
    })
})


    //it('login via API', function (){ OBS: PODEMOS FAZER DESSA FORMA, PORÉM, É MELHOR FAZER O TESTE SEM DEPENDÊNCIA. 
    // para usar a tecnica de variavel de ambiente do cypress, precisa fazer a chamada d elogin dentro do it, que vai ser excutado primeiro ou gancho, para pegar o token
    //  const { user, task } = this.tasks.create

    //    cy.postSession(user) 
    //    .then(response => {
    //        cy.log(response.body.token)
    //        Cypress.env('token', response.body.token) 
    //    })
    // })
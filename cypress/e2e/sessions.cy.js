describe('POST /sessions', () => {

    beforeEach(function() {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })

    it('user session', function () {
        const userData = this.users.login

        cy.task('removeUser', userData.email)
        cy.postUser(userData)

        cy.postSession(userData)
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.user.name).to.eq(userData.name)
                expect(response.body.user.email).to.eq(userData.email)
                expect(response.body.token).not.to.be.empty
            })
    })

    it('invalid password', function () {
        const user = this.users.inv_pass

        cy.postSession(user)
            .then(response => {
                expect(response.status).to.eq(400)
            })
    })

    it('email not found', function () {
        const user = this.users.inv_email

        cy.postSession(user)
            .then(response => {
                expect(response.status).to.eq(400)
            })
    })
})
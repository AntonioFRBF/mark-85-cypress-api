describe('POST /users', () => {

  beforeEach(function () {
    cy.fixture('users').then(function (users) {
      this.users = users
    })
  })

  it('register a new user', function () {

    const user = this.users.create

    cy.task('removeUser', user.email)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(201)
      })

  })

  it('duplicate email', function () {

    const user = this.users.duplicate_email

    cy.task('removeUser', user.email)

    cy.postUser(user)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(409)
        expect(response.body.message).to.eq('Duplicated email!')
      })

  })

  context.only('required fields', function () {
    let user;

    beforeEach(function () {
      user = this.users.required
    })


    it('name is required', function () {
      delete user.name

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('ValidationError: \"name\" is required')
        })
    })

    it('email is required', function () {
      delete user.email

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('ValidationError: \"email\" is required')
        })
    })

    it('passwword is required', function () {
      delete user.email

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('ValidationError: \"email\" is required')
        })
    })
  })


})
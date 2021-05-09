import app from '../index' // Link to your server file
import request from 'supertest'
const pool = require("../database")

describe('testing POST /user/add', () => {
  afterAll(done => {
    pool.query('TRUNCATE Users RESTART IDENTITY CASCADE;', (err, res) => {
    })
  })

  it('testing adding user successfully', async done => {
    //adding record
    const response = await request(app).post("/users/add").send({
      email: "user@test.com",
      password: "1test123",
      role: "user"
    })
    expect(response.statusCode).toBe(200)
    done()
  })

  it('testing header user type is json', async done => {
    // adding record
    const response = await request(app).post("/users/add").send({
      email: "user2@test.com",
      password: "2test4321",
      role: "user"
    })
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    done()
  })

  it('testing user is correct', async done => {
    // adding record
    const response = await request(app).post("/users/add").send({
      email: "user3@test.com",
      password: "3test4321",
      role: "user"
    })

    expect(response.body.user_id).toEqual(3) // checking body user
    expect(response.body.email).toEqual('user3@test.com') // checking body user
    expect(response.body.password).toEqual('3test4321') // checking body user
    expect(response.body.role).toEqual('user') // checking body user
    done()
  })

  it('testing error code is 400 when user is missing', async done => {
  // array containing different info to be posted 1. only title, 2. only user, 3. neither
    const bodyData = [
      {email: "test@testing.com"},
      {password: "testPW"},
      {role: "testRole"},
      {}
    ]

    // looping through array of options, if any info missing expect 400 response
    for(const body of bodyData) {
      const response = await request(app).post("/users/add").send(body)
      expect(response.statusCode).toBe(400)
    }

    done()
  })
})

describe('testing updating user record with PUT /users/:id', () => {
  afterAll(done => {
    pool.query('TRUNCATE users RESTART IDENTITY CASCADE;', (err, res) => {
    })
  })

  it('testing updating user successfully', async done => {
    const addUser = await request(app).post("/users/add").send({
      email: "user4@test.com",
      password: "4test4321",
      role: "user"
    }) // creating record
    const updatedUser = await request(app).put("/users/1").send({
      email: "UpdatedUser4@test.com",
      password: "Updated4test4321",
      role: "UpdatedUser"
    }) // updating record
    const getUpdatedUser = await request(app).get("/users/1") // get updated record

    expect(addUser.body.user_id).toEqual(1) // testing added record Id
    expect(addUser.statusCode).toBe(200) // checking added record status code
    expect(updatedUser.statusCode).toBe(200) // checking updated record status code
    expect(getUpdatedUser.statusCode).toBe(200) // checking retrieved record status code
    expect(getUpdatedUser.body.user_id).toEqual(1) // checking body user
    expect(getUpdatedUser.body.email).toEqual('UpdatedUser4@test.com') // checking body user
    expect(getUpdatedUser.body.password).toEqual('Updated4test4321') // checking body user
    expect(getUpdatedUser.body.role).toEqual('UpdatedUser') // checking body user
    done()
  })

  it('testing error code is 400 when user is missing', async done => {
    // array containing different info to be posted 1. only title, 2. only user, 3. neither
    const bodyUpdatedData = [
      {email: "test@testing.com"},
      {password: "testPW"},
      {role: "testRole"},
      {}
    ]

    // looping through array of info variatons given.  If no id given expect 404 response
    for(const body of bodyUpdatedData){
      const response = await request(app).put("/users/").send(body)
      expect(response.statusCode).toBe(404)
    }

    // looping through array of options, if any info missing expect 400 response
    for(const body of bodyUpdatedData){
      const response = await request(app).put("/users/1").send(body)
      expect(response.statusCode).toBe(400)
    }

    done()
  })
})

describe('testing deleting user record with DELETE /users/:id', () => {
  afterAll(done => {
    pool.query('TRUNCATE users RESTART IDENTITY CASCADE;', (err, res) => {
    })
  })

  it('testing deleting user successfully', async done => {
    const addUser = await request(app).post("/users/add").send({
      email: "user5@test.com",
      password: "5test4321",
      role: "user"
    })
    const deleteUser = await request(app).delete("/users/1") // delete record
    const getDeletedUser = await request(app).get("/users/1") // get updated record

    expect(addUser.body.user_id).toEqual(1) // testing added record Id
    expect(addUser.statusCode).toBe(200) // checking added record status code
    expect(deleteUser.statusCode).toBe(200) // checking deleted record status code
    expect(deleteUser.text).toContain("User was deleted") // checking delete message correct
    expect(getDeletedUser.statusCode).toBe(200) // checking status code when trying to retrieve deleted record
    expect(getDeletedUser.body.user_id).toBeUndefined() // checking the deleted user does not exist
    expect(getDeletedUser.body.email).toBeUndefined() // checking the deleted user does not exist
    expect(getDeletedUser.body.password).toBeUndefined() // checking the deleted user does not exist
    expect(getDeletedUser.body.role).toBeUndefined() // checking the deleted user does not exist
    done()
  })
})

describe('testing get user records with get /users/:id', () => {
  afterAll(done => {
    pool.query('TRUNCATE users RESTART IDENTITY CASCADE;', (err, res) => {
    })
  })

  it('testing get single user record', async done => {
    // adding user record
    const addUser = await request(app).post("/users/add").send({
      email: "user6@test.com",
      password: "6test4321",
      role: "user"
    })
    // getting the user record
    const getUser = await request(app).get("/users/1")

    expect(addUser.body.user_id).toEqual(1) // testing added record Id
    expect(addUser.statusCode).toBe(200) // testing added record status code
    expect(getUser.statusCode).toBe(200) // testing record retrieved status code
    expect(getUser.body.user_id).toEqual(1) // checking record body user id
    expect(getUser.body.email).toEqual('user6@test.com')
    expect(getUser.body.password).toEqual('6test4321')
    expect(getUser.body.role).toEqual('user')
    expect(getUser.body[2]).toBeUndefined() // checking only one record added
    done()
  })
})

describe('testing get all user records with get /users/', () => {
  afterAll(done => {
    pool.query('TRUNCATE users RESTART IDENTITY CASCADE;', (err, res) => {
    pool.end().then(done()) })
  })

  it('testing get all users', async done => {
    // adding multiple records
    const addUserOne = await request(app).post("/users/add").send({
      email: "user7@test.com",
      password: "7test4321",
      role: "user"
    })
    const addUserTwo = await request(app).post("/users/add").send({
      email: "user8@test.com",
      password: "8test4321",
      role: "user"
    })
    const getUsers = await request(app).get("/users/") // get updated record
    // checking record ids
    expect(addUserOne.body.user_id).toEqual(1)
    expect(addUserTwo.body.user_id).toEqual(2)
    // checking record status codes
    expect(addUserOne.statusCode).toBe(200)
    expect(addUserTwo.statusCode).toBe(200)
    expect(getUsers.statusCode).toBe(200)
    // checking user details
    expect(getUsers.body[0].user_id).toEqual(1)
    expect(getUsers.body[0].email).toEqual('user7@test.com')
    expect(getUsers.body[0].password).toEqual('7test4321')
    expect(getUsers.body[0].role).toEqual('user')

    expect(getUsers.body[1].user_id).toEqual(2)
    expect(getUsers.body[1].email).toEqual('user8@test.com')
    expect(getUsers.body[1].password).toEqual('8test4321')
    expect(getUsers.body[1].role).toEqual('user')

    // checking there are no other records
    expect(getUsers.body[2]).toBeUndefined()
    done()
  })
})

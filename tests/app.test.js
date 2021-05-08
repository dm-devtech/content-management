import app from '../index' // Link to your server file
import request from 'supertest'
const pool = require("../database")

describe('testing POST /content/add', () => {
  afterAll(done => {
    // truncating test table
    pool.query('TRUNCATE posts RESTART IDENTITY CASCADE;', (err, res) => {
    })
  })

  it('testing adding content successfully', async done => {
    //adding record
    const response = await request(app).post("/content/add").send({
      title: "adding content status check TITLE",
      content: "adding content status check CONTENT"
    })
    expect(response.statusCode).toBe(200)
    done()
  })

  it('testing header content type is json', async done => {
    // adding record
    const response = await request(app).post("/content/add").send({
      title: "adding content header content JSON TITLE",
      content: "adding content header content JSON CONTENT"
    })
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    done()
  })

  it('testing content is correct', async done => {
    // adding record
    const response = await request(app).post("/content/add").send({
      title: "test title",
      content: "test content"
    })

    expect(response.body.content_id).toEqual(3) // checking body content
    expect(response.body.title).toEqual('test title') // checking body content
    expect(response.body.content).toEqual('test content') // checking body content
    done()
  })
})

describe('testing updating record with PUT /content/:id', () => {
  afterAll(done => {
    pool.query('TRUNCATE posts RESTART IDENTITY CASCADE;', (err, res) => {
    })
  })

  it('testing updating content successfully', async done => {
    const addRecord = await request(app).post("/content/add").send({
      title: "test title (testing update record)",
      content: "test content (testing update record)"
    }) // creating record
    const updatedRecord = await request(app).put("/content/1").send({
      title: "test title (testing update record) UPDATED",
      content: "test content (testing update record) UPDATED"
    }) // updating record
    const getUpdatedRecord = await request(app).get("/content/1") // get updated record

    expect(addRecord.body.content_id).toEqual(1) // testing added record Id
    expect(addRecord.statusCode).toBe(200) // checking added record status code
    expect(updatedRecord.statusCode).toBe(200) // checking updated record status code
    expect(getUpdatedRecord.statusCode).toBe(200) // checking retrieved record status code
    expect(getUpdatedRecord.body.content_id).toEqual(1) // checking body content
    expect(getUpdatedRecord.body.title).toEqual('test title (testing update record) UPDATED') // checking body content
    expect(getUpdatedRecord.body.content).toEqual('test content (testing update record) UPDATED') // checking body content
    done()
  })
})

describe('testing deleting record with DELETE /content/:id', () => {
  afterAll(done => {
    pool.query('TRUNCATE posts RESTART IDENTITY CASCADE;', (err, res) => {
    })
  })

  it('testing deleting content successfully', async done => {
    const addRecord = await request(app).post("/content/add").send({
      title: "test title (testing deleting a record)",
      content: "test content (testing deleting a record)"
    }) // creating record
    const deleteRecord = await request(app).delete("/content/1") // delete record
    const getDeletedRecord = await request(app).get("/content/1") // get updated record

    expect(addRecord.body.content_id).toEqual(1) // testing added record Id
    expect(addRecord.statusCode).toBe(200) // checking added record status code
    expect(deleteRecord.statusCode).toBe(200) // checking deleted record status code
    expect(deleteRecord.text).toContain("Content was deleted") // checking delete message correct
    expect(getDeletedRecord.statusCode).toBe(200) // checking status code when trying to retrieve deleted record
    expect(getDeletedRecord.body.content_id).toBeUndefined() // checking the deleted cord does not exist
    expect(getDeletedRecord.body.title).toBeUndefined() // checking the deleted cord does not exist
    expect(getDeletedRecord.body.content).toBeUndefined() // checking the deleted cord does not exist
    done()
  })
})

describe('testing get records with get /content/:id', () => {
  afterAll(done => {
    pool.query('TRUNCATE posts RESTART IDENTITY CASCADE;', (err, res) => {
    })
  })

  it('testing get single content record', async done => {
    // adding record
    const addRecord = await request(app).post("/content/add").send({
      title: "test title (testing get a single record)",
      content: "test content (testing get a single record)"
    })
    // getting the record
    const getRecord = await request(app).get("/content/1")

    expect(addRecord.body.content_id).toEqual(1) // testing added record Id
    expect(addRecord.statusCode).toBe(200) // testing added record status code
    expect(getRecord.statusCode).toBe(200) // testing record retrieved status code
    expect(getRecord.body.content_id).toEqual(1) // checking record body content
    expect(getRecord.body.title).toEqual('test title (testing get a single record)')
    expect(getRecord.body.content).toEqual('test content (testing get a single record)')
    expect(getRecord.body[2]).toBeUndefined() // checking only one record added
    done()
  })
})

describe('testing get records with get /content/', () => {
  afterAll(done => {
    pool.query('TRUNCATE posts RESTART IDENTITY CASCADE;', (err, res) => {
    pool.end().then(done()) })
  })

  it('testing get all content', async done => {
    // adding multiple records
    const addRecordOne = await request(app).post("/content/add").send({
      title: "test title 1 (testing get all records)",
      content: "test content 1 (testing get all records)"
    })
    const addRecordTwo = await request(app).post("/content/add").send({
      title: "test title 2 (testing get all records)",
      content: "test content 2 (testing get all records)"
    })
    const getRecords = await request(app).get("/content/") // get updated record
    // checking record ids
    expect(addRecordOne.body.content_id).toEqual(1)
    expect(addRecordTwo.body.content_id).toEqual(2)
    // checking record status codes
    expect(addRecordOne.statusCode).toBe(200)
    expect(addRecordTwo.statusCode).toBe(200)
    expect(getRecords.statusCode).toBe(200)
    // checking record content
    expect(getRecords.body[0].content_id).toEqual(1)
    expect(getRecords.body[0].title).toEqual('test title 1 (testing get all records)')
    expect(getRecords.body[0].content).toEqual('test content 1 (testing get all records)')
    expect(getRecords.body[1].content_id).toEqual(2)
    expect(getRecords.body[1].title).toEqual('test title 2 (testing get all records)')
    expect(getRecords.body[1].content).toEqual('test content 2 (testing get all records)')
    // checking there are no other records
    expect(getRecords.body[2]).toBeUndefined()
    done()
  })
})

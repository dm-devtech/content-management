import app from '../index' // Link to your server file
import request from 'supertest'
const pool = require("../database")

describe('testing POST /content/add', () => {
  afterAll(done => {
    pool.query('TRUNCATE posts RESTART IDENTITY CASCADE;', (err, res) => {
    })
  })

  it('testing adding content successfully', async done => {
    const response = await request(app).post("/content/add").send({
      title: "adding content status check TITLE",
      content: "adding content status check CONTENT"
    })
    expect(response.statusCode).toBe(200)
    done()
  })

  it('testing header content type is json', async done => {
    const response = await request(app).post("/content/add").send({
      title: "adding content header content JSON TITLE",
      content: "adding content header content JSON CONTENT"
    })
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    done()
  })

  it('testing content is correct', async done => {
    const response = await request(app).post("/content/add").send({
      title: "test title",
      content: "test content"
    })

    expect(response.body.content_id).toEqual(3)
    expect(response.body.title).toEqual('test title')
    expect(response.body.content).toEqual('test content')
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
    expect(addRecord.statusCode).toBe(200)
    expect(updatedRecord.statusCode).toBe(200)
    expect(getUpdatedRecord.statusCode).toBe(200)
    expect(getUpdatedRecord.body.content_id).toEqual(1)
    expect(getUpdatedRecord.body.title).toEqual('test title (testing update record) UPDATED')
    expect(getUpdatedRecord.body.content).toEqual('test content (testing update record) UPDATED')
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
    expect(addRecord.statusCode).toBe(200)
    expect(deleteRecord.statusCode).toBe(200)
    expect(deleteRecord.text).toContain("Content was deleted")
    expect(getDeletedRecord.statusCode).toBe(200)
    expect(getDeletedRecord.body.content_id).toBeUndefined()
    expect(getDeletedRecord.body.title).toBeUndefined()
    expect(getDeletedRecord.body.content).toBeUndefined()
    done()
  })
})

describe('testing get records with get /content/:id', () => {
  afterAll(done => {
    pool.query('TRUNCATE posts RESTART IDENTITY CASCADE;', (err, res) => {
    })
  })

  it('testing get single content record', async done => {
    const addRecord = await request(app).post("/content/add").send({
      title: "test title (testing get a single record)",
      content: "test content (testing get a single record)"
    }) // creating record
    const getRecord = await request(app).get("/content/1") // get updated record

    expect(addRecord.body.content_id).toEqual(1) // testing added record Id
    expect(addRecord.statusCode).toBe(200)
    expect(getRecord.statusCode).toBe(200)
    expect(getRecord.body.content_id).toEqual(1)
    expect(getRecord.body.title).toEqual('test title (testing get a single record)')
    expect(getRecord.body.content).toEqual('test content (testing get a single record)')
    done()
  })
})

describe('testing get records with get /content/', () => {
  afterAll(done => {
    pool.query('TRUNCATE posts RESTART IDENTITY CASCADE;', (err, res) => {
    })
  })

  it('testing get all content', async done => {
    const addRecordOne = await request(app).post("/content/add").send({
      title: "test title 1 (testing get all records)",
      content: "test content 1 (testing get all records)"
    }) // creating record 1
    const addRecordTwo = await request(app).post("/content/add").send({
      title: "test title 2 (testing get all records)",
      content: "test content 2 (testing get all records)"
    }) // creating record 2
    const getRecords = await request(app).get("/content/") // get updated record

    expect(addRecordOne.body.content_id).toEqual(1) // testing added record Id
    expect(addRecordTwo.body.content_id).toEqual(2) // testing added record Id
    expect(addRecordOne.statusCode).toBe(200)
    expect(addRecordTwo.statusCode).toBe(200)
    expect(getRecords.statusCode).toBe(200)
    expect(getRecords.body[0].content_id).toEqual(1)
    expect(getRecords.body[0].title).toEqual('test title 1 (testing get all records)')
    expect(getRecords.body[0].content).toEqual('test content 1 (testing get all records)')
    expect(getRecords.body[1].content_id).toEqual(2)
    expect(getRecords.body[1].title).toEqual('test title 2 (testing get all records)')
    expect(getRecords.body[1].content).toEqual('test content 2 (testing get all records)')
    expect(getRecords.body[2]).toBeUndefined()
    done()
  })
})

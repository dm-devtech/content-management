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

import app from '../index' // Link to your server file
import request from 'supertest'
const pool = require("../database")

describe('testing POST /content/add', () => {

  afterAll(done => {
    pool.query('TRUNCATE posts RESTART IDENTITY CASCADE;', (err, res) => {
    pool.end().then(done());
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

  // it('testing updating content', async done => {
  //   const homeResponse = await request.get('/api/french')
  //   expect(homeResponse.text).toContain('[{"id":1,"eng":"pan","fre":"la poêle","wordtype":"noun","category":"kitchen","gender":"la"}]')
  //   done()
  // })
  //
  // it('testing deleting content', async done => {
  //   const homeResponse = await request.get('/api/latin')
  //   expect(homeResponse.text).toContain('[{"id":1,"eng":"pan","lat":"cacabus","wordtype":"noun","category":"kitchen","gender":"masculine"}]')
  //   done()
  // })
  //
  // it('testing get 1 piece of content', async done => {
  //   const homeResponse = await request.get('/api/latin')
  //   expect(homeResponse.text).toContain('[{"id":1,"eng":"pan","lat":"cacabus","wordtype":"noun","category":"kitchen","gender":"masculine"}]')
  //   done()
  // })
  //
  // it('testing get all content', async done => {
  //   const homeResponse = await request.get('/api/latin')
  //   expect(homeResponse.text).toContain('[{"id":1,"eng":"pan","lat":"cacabus","wordtype":"noun","category":"kitchen","gender":"masculine"}]')
  //   done()
  // })
})

import app from '../index' // Link to your server file
import request from 'supertest'


describe('testing POST /content/add', () => {
  it('testing adding content successfully', async done => {
    const response = await request(app).post("/content/add").send({
      title: "test title",
      content: "test content"
    })
    expect(response.statusCode).toBe(200)
    done()
  })

  it('testing when no content given', async done => {
    const response = await request(app).post("/content/add").send({
      title: "test title",
      content: "test content"
    })
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    done()
  })

  it('testing when no content given', async done => {
    const response = await request(app).post("/content/add").send({
      title: "test title",
      content: "test content"
    })
    console.log(response.body)
    expect(response.body).tobeDefined
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

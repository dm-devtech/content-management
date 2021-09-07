import getContentById from '../../Helpers/getContentById';

describe('testing get content by Id', () => {
  test('with undefined response', async () => {
    const fakeApi = undefined

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi)
      };
      return Promise.resolve(fetchResponse);
    }) 

    expect(await getContentById(1)).toEqual(0)
  })

  test('with undefined response', async () => {
    const fakeApi = []

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi)
      };
      return Promise.resolve(fetchResponse);
    }) 

    expect(await getContentById(1)).toEqual(0)
  })

  test('response returns object', async () => {
    const fakeApi = {content_id: 1, "title": "title header", "content": "test body", date_created: "2021-09-06"}

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi)
      };
      return Promise.resolve(fetchResponse);
    }) 

    expect(await getContentById(1)).toEqual({"content": "test body", "content_id": 1, "date_created": "2021-09-06", "title": "title header"})
  })

})


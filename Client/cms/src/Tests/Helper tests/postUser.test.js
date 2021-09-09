import postUser from '../../Helpers/postUser';

describe('testing post user', () => {

  test('testing response and console message', async () => {
    const fakeApi = {email: "test email", password: "test password", role: "test role", date_created: 'NOW()'}
    const spy = jest.spyOn(console, 'error')

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi)
      };
      return Promise.resolve(fetchResponse);
    }) 

    
    await postUser("test title", "test content")

    expect(await spy).not.toHaveBeenCalled()
    expect(await fetchSpy).toHaveBeenCalled()
  })

})


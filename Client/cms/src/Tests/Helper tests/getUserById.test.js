import getUserById from "../../Helpers/getUserById";

describe("testing get user by Id", () => {
  test("with undefined response", async () => {
    const fakeApi = undefined;

    const fetchSpy = jest.spyOn(window, "fetch").mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi),
      };
      return Promise.resolve(fetchResponse);
    });

    expect(await getUserById(1)).toEqual(0);
  });

  test("with undefined response", async () => {
    const fakeApi = [];

    const fetchSpy = jest.spyOn(window, "fetch").mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi),
      };
      return Promise.resolve(fetchResponse);
    });

    expect(await getUserById(1)).toEqual(0);
  });

  test("response returns object", async () => {
    const fakeApi = {
      id: 1,
      email: "test email",
      password: "test password",
      role: "test role",
      date_created: "2021-09-06",
    };

    const fetchSpy = jest.spyOn(window, "fetch").mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi),
      };
      return Promise.resolve(fetchResponse);
    });

    expect(await getUserById(1)).toEqual({
      id: 1,
      email: "test email",
      password: "test password",
      role: "test role",
      date_created: "2021-09-06",
    });
  });
});

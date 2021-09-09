import getUsers from "../../Helpers/getAllUsers";

describe("testing get all users", () => {
  test("with undefined response", async () => {
    const fakeApi = undefined;

    const fetchSpy = jest.spyOn(window, "fetch").mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi),
      };
      return Promise.resolve(fetchResponse);
    });

    expect(await getUsers()).toEqual(0);
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

    expect(await getUsers()).toEqual(0);
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

    expect(await getUsers()).toEqual({
      id: 1,
      email: "test email",
      password: "test password",
      role: "test role",
      date_created: "2021-09-06",
    });
  });
});

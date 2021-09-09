import deleteUser from "../../Helpers/deleteUser";

describe("testing delete user", () => {
  test("testing response and console message", async () => {
    const fakeApi = {
      user_id: 1,
      email: "test email",
      password: "test password",
      role: "test role",
      date_created: "NOW()",
    };
    const spy = jest.spyOn(console, "error");
    const consoleSpy = jest.spyOn(console, "log");

    const fetchSpy = jest.spyOn(window, "fetch").mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi),
      };
      return Promise.resolve(fetchResponse);
    });

    await deleteUser(1);

    expect(await spy).not.toHaveBeenCalled();
    expect(await fetchSpy).toHaveBeenCalled();
    expect(await consoleSpy).toHaveBeenCalled();
  });
});

import deleteContent from "../../Helpers/deleteContent";

describe("testing delete content", () => {
  test("testing response and console message", async () => {
    const fakeApi = {
      content_id: 1,
      title: "title",
      content: "content",
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

    await deleteContent(1);
    expect(await spy).not.toHaveBeenCalled();
    expect(await fetchSpy).toHaveBeenCalled();
    expect(await consoleSpy).toHaveBeenCalled();
  });
});

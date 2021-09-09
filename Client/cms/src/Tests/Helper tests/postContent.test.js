import postContent from "../../Helpers/postContent";

describe("testing post content", () => {
  test("testing response and console message", async () => {
    const fakeApi = {
      title: "title",
      content: "content",
      date_created: "NOW()",
    };
    const spy = jest.spyOn(console, "error");

    const fetchSpy = jest.spyOn(window, "fetch").mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(fakeApi),
      };
      return Promise.resolve(fetchResponse);
    });

    await postContent("test title", "test content");

    expect(await spy).not.toHaveBeenCalled();
    expect(await fetchSpy).toHaveBeenCalled();
  });
});

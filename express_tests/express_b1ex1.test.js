const axios = require("axios");

describe("Express b1ex01", () => {
  it("#1 Hitting '/' should return { ok: true, data: 'Hello World!' }", async () => {
    const res = await axios.get("http://localhost:4040/");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("hello world");
  });
  it("#2 Hitting '/NL' should return { ok: true, data: 'Hallo Wereld }'", async () => {
    const res = await axios.get("http://localhost:4040/NL");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("hallo wereld");
  });
  it("#3 Hitting '/IT' should return { ok: true, data: 'Ciao Mondo }'", async () => {
    const res = await axios.get("http://localhost:4040/IT");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("ciao mondo");
  });
  it("#4 Hitting '/asdf' should return { ok: true, data: 'Hello World!' }", async () => {
    const res = await axios.get("http://localhost:4040/asdf");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("hello world");
  });
});

const axios = require("axios");

describe("Express b1ex03", () => {
  it("#1 Hitting '/DE' should return { ok: true, data: 'Hello World in DE not found' }", async () => {
    const res = await axios.get("http://localhost:4040/DE");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("hello world");
    expect(res.data.data.toLowerCase()).toContain("de");
    expect(res.data.data.toLowerCase()).toContain("not found");
  });
  it("#2 Hitting '/DE/Hallo%20Welt' should return { ok: true, data: 'DE added with message 'Hallo Welt' }", async () => {
    const res = await axios.get("http://localhost:4040/DE/Hallo%20Welt");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("de");
    expect(res.data.data.toLowerCase()).toContain("added");
    expect(res.data.data.toLowerCase()).toContain("message");
    expect(res.data.data.toLowerCase()).toContain("hallo welt");
  });
  it("#3 Hitting '/DE' should return { ok: true, data: 'Hallo Welt }'", async () => {
    const res = await axios.get("http://localhost:4040/DE");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("hallo welt");
  });
  it("#4 Hitting '/DE/remove' should return { ok: true, data: 'DE removed!' }", async () => {
    const res = await axios.get("http://localhost:4040/DE/remove");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("de");
    expect(res.data.data.toLowerCase()).toContain("remove");
  });
  it("#5 Hitting '/DE' should return { ok: true, data: 'Hello World in DE not found }'", async () => {
    const res = await axios.get("http://localhost:4040/DE");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("hello world");
    expect(res.data.data.toLowerCase()).toContain("de");
    expect(res.data.data.toLowerCase()).toContain("not found");
  });
});

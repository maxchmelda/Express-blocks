const axios = require("axios");

describe("Express b1ex04", () => {
  it("#1 Hitting '/DE' should return { ok: true, data: 'Hello World in DE not found' }", async () => {
    const res = await axios.get("http://localhost:4040/DE");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("hello world");
    expect(res.data.data.toLowerCase()).toContain("de");
    expect(res.data.data.toLowerCase()).toContain("not found");
  });
  it("#2 Hitting '/DE/HalloWelt' should return { ok: true, data: 'DE added with message 'HalloWelt' }", async () => {
    const res = await axios.get("http://localhost:4040/DE/HalloWelt");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("de");
    expect(res.data.data.toLowerCase()).toContain("added");
    expect(res.data.data.toLowerCase()).toContain("message");
    expect(res.data.data.toLowerCase()).toContain("hallowelt");
  });
  it("#3 Hitting '/DE' should return { ok: true, data: 'HalloWelt }'", async () => {
    const res = await axios.get("http://localhost:4040/DE");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("hallowelt");
  });
  it("#4 Hitting '/DE/Hallo%20Welt' should return { ok: true, data: 'Action forbidden, DE is already present in the system' }", async () => {
    const res = await axios.get("http://localhost:4040/DE/Hallo%20Welt");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("action forbidden");
    expect(res.data.data.toLowerCase()).toContain("de");
    expect(res.data.data.toLowerCase()).toContain("already present");
    expect(res.data.data.toLowerCase()).toContain("system");
  });
  it("#5 Hitting '/DE/update/Hallo%20Welt' should return { ok: true, data: 'DE updated from 'HalloWelt' to 'Hallo Welt'' }", async () => {
    const res = await axios.get("http://localhost:4040/DE/update/Hallo%20Welt");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("de");
    expect(res.data.data.toLowerCase()).toContain("updated");
    expect(res.data.data.toLowerCase()).toContain("hallowelt");
    expect(res.data.data.toLowerCase()).toContain("hallo welt");
  });
  it("#6 Hitting '/DE' should return { ok: true, data: 'Hallo Welt' }'", async () => {
    const res = await axios.get("http://localhost:4040/DE");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("hallo welt");
  });
});

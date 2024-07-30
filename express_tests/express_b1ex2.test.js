const axios = require("axios");

describe("Express b1ex02", () => {
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
  it("#4 Hitting '/CA' should return { ok: true, data: 'Hello World in CA not found!' }", async () => {
    const res = await axios.get("http://localhost:4040/CA");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("hello world");
    expect(res.data.data.toLowerCase()).toContain("ca");
    expect(res.data.data.toLowerCase()).toContain("not found");
  });
  it("#5 Hitting '/CA/hola%20món' should return { ok: true, data: 'CA added with message 'Hola món'' }", async () => {
    const res = await axios.get("http://localhost:4040/CA/hola%20món");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("hola món");
    expect(res.data.data.toLowerCase()).toContain("added");
  });
  it("#6 Hitting '/CA' should return { ok: true, data: 'Hola món!' }", async () => {
    const res = await axios.get("http://localhost:4040/CA");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("hola món");
  });
});

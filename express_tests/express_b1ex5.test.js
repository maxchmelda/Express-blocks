const axios = require("axios");

describe("Express b1ex05", () => {
  it("#1 Hitting '/account/new/0001/1000' should return { ok: true, data: 'account 0001 created with 1000 euros' }", async () => {
    const res = await axios.get("http://localhost:4040/account/new/0001/1000");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("account ");
    expect(res.data.data.toLowerCase()).toContain("0001");
    expect(res.data.data.toLowerCase()).toContain("created");
    expect(res.data.data.toLowerCase()).toContain("1000");
  });
  it("#2 Hitting '/account/new/0001/1000' should return { ok: true, data: 'account 0001 already exists' }", async () => {
    const res = await axios.get("http://localhost:4040/account/new/0001/1000");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("account ");
    expect(res.data.data.toLowerCase()).toContain("0001");
    expect(res.data.data.toLowerCase()).toContain("already");
    expect(res.data.data.toLowerCase()).toContain("exist");
  });
  it("#3 Hitting '/0001/balance' should return { ok: true, data: 1000 }", async () => {
    const res = await axios.get("http://localhost:4040/0001/balance");
    expect(res.data.ok).toBe(true);
    expect(res.data.data).toBe(1000);
  });
  it("#4 Hitting '/0002/balance' should return { ok: true, data: 'Account not found' }", async () => {
    const res = await axios.get("http://localhost:4040/0002/balance");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("account");
    expect(res.data.data.toLowerCase()).toContain("not found");
  });
  it("#5 Hitting '/0001/withdraw/500' should return { ok: true, data: '500 euros taken from account num 0001' }", async () => {
    const res = await axios.get("http://localhost:4040/0001/withdraw/500");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("500");
    expect(res.data.data.toLowerCase()).toContain("account");
    expect(res.data.data.toLowerCase()).toContain("0001");
  });
  it("#6 Hitting '/0002/withdraw/500' should return { ok: true, data: 'Account not found' }", async () => {
    const res = await axios.get("http://localhost:4040/0002/withdraw/500");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("account");
    expect(res.data.data.toLowerCase()).toContain("not found");
  });
  it("#7 Hitting '/0001/balance' should return { ok: true, data: 500 }", async () => {
    const res = await axios.get("http://localhost:4040/0001/balance");
    expect(res.data.ok).toBe(true);
    expect(res.data.data).toBe(500);
  });
  it("#8 Hitting '/0001/deposit/250' should return { ok: true, data: '250 euros added to account num 0001' }", async () => {
    const res = await axios.get("http://localhost:4040/0001/deposit/250");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("250");
    expect(res.data.data.toLowerCase()).toContain("account");
    expect(res.data.data.toLowerCase()).toContain("0001");
  });
  it("#9 Hitting '/0002/deposit/250' should return { ok: true, data: 'Account not found' }", async () => {
    const res = await axios.get("http://localhost:4040/0002/deposit/250");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("account");
    expect(res.data.data.toLowerCase()).toContain("not found");
  });
  it("#10 Hitting '/0001/balance' should return { ok: true, data: 750 }", async () => {
    const res = await axios.get("http://localhost:4040/0001/balance");
    expect(res.data.ok).toBe(true);
    expect(res.data.data).toBe(750);
  });
  it("#11 Hitting '/0001/delete ' should return { ok: true, data: 'Account num 0001 deleted' }", async () => {
    const res = await axios.get("http://localhost:4040/0001/delete");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("account");
    expect(res.data.data.toLowerCase()).toContain("0001");
    expect(res.data.data.toLowerCase()).toContain("deleted");
  });
  it("#12 Hitting '/0001/balance' should return { ok: true, data: 'Account not found' }", async () => {
    const res = await axios.get("http://localhost:4040/0001/balance");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("account");
    expect(res.data.data.toLowerCase()).toContain("not found");
  });
  it("#13 Hitting '/asdf' should return { ok: true, data: '404 resource not found' }", async () => {
    const res = await axios.get("http://localhost:4040/asdf");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("404");
    expect(res.data.data.toLowerCase()).toContain("not found");
  });
});

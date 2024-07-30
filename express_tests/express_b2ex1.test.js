const axios = require("axios");

describe("Express b2ex01", () => {
  it("#1 Hitting '/category/add' with body: { category: 'hats' } should return { ok: true, data: 'Category hats added successfully' }", async () => {
    const res1 = await axios.post("http://localhost:4040/category/add", {
      category: "hats",
    });
    expect(res1.data.ok).toBe(true);
    expect(res1.data.data.toLowerCase()).toContain(
      "category hats added successfully"
    );
  });
  it("#2 Hitting '/category/add' with body: { category: 'hats' } should return { ok: true, data: 'Category hats already exists' }", async () => {
    const res = await axios.post("http://localhost:4040/category/add", {
      category: "hats",
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      "category hats already exists"
    );
  });
  it("#3 Hitting '/category/add' with body: { category: 'jackets' } should return { ok: true, data: 'Category jackets added successfully' }", async () => {
    const res2 = await axios.post("http://localhost:4040/category/add", {
      category: "jackets",
    });
    expect(res2.data.ok).toBe(true);
    expect(res2.data.data.toLowerCase()).toContain(
      "category jackets added successfully"
    );
  });
  it("#4 Hitting '/category/categories' should return { ok: true, data: 'vests, jackets' }", async () => {
    const res = await axios.get("http://localhost:4040/category/categories");
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("jackets");
    expect(res.data.data.toLowerCase()).toContain("hats");
  });
  it(`#5 Hitting '/product/add' with body: {
      category: 'hats',
      product: {
        name: 'cowboy hat',
        price: '10',
        color: 'black',
        description: 'best hat in town'
      }}  should return { ok: true, data: 'product cowboy hat added successfully' }`, async () => {
    const res = await axios.post("http://localhost:4040/product/add", {
      category: "hats",
      product: {
        name: "cowboy hat",
        price: "10",
        color: "black",
        description: "best hat in town",
      },
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("product");
    expect(res.data.data.toLowerCase()).toContain("cowboy");
    expect(res.data.data.toLowerCase()).toContain("added");
  });
  it(`#6 Hitting '/category/hats' should return { ok: true, data: [
    {
      name: 'cowboy hat',
      price: '10',
      color: 'black',
      description: 'best hat in town'
    }
  ] }`, async () => {
    const res = await axios.get("http://localhost:4040/category/hats");
    expect(res.data.ok).toBe(true);
    expect(res.data.data[0].name.toLowerCase()).toContain("cowboy hat");
  });
  it("#7 Hitting '/category/products' should return { ok: true, data: [ { category: 'hats', products: [Array] }, { category: 'jackets', products: [] } ] }", async () => {
    const res = await axios.get("http://localhost:4040/category/products");
    expect(res.data.ok).toBe(true);
    if (res.data.data.findIndex((item) => item.category === "jackets") < 0)
      throw new Error("jackets missing");
  });
  it(`#8 Hitting '/product/update' with body: {
      category: 'hats',
      old_product: { name: 'cowboy hat' },
      new_product: { name: 'astronaut hat' }
    } should return { ok: true, data: 'product astronaut hat updated successfully' }`, async () => {
    const res = await axios.post("http://localhost:4040/product/update", {
      category: "hats",
      old_product: { name: "cowboy hat" },
      new_product: { name: "astronaut hat" },
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      "product astronaut hat updated successfully"
    );
  });
  it(`#9 Hitting '/product/delete' with body: {
      category: 'hats',
      product: { name: 'astronaut hat' }
    } should return { ok: true, data: 'product astronaut hat deleted successfully' }`, async () => {
    const res = await axios.post("http://localhost:4040/product/delete", {
      category: "hats",
      old_product: { name: "cowboy hat" },
      product: { name: "astronaut hat" },
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      "product astronaut hat deleted successfully"
    );
  });
  it("#10 Hitting '/category/update' with body: { new_category: 'vests', old_category: 'hats' } should return { ok: true, data: 'Category vests updated successfully' }", async () => {
    const res = await axios.post("http://localhost:4040/category/update", {
      new_category: "vests",
      old_category: "hats",
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      "category vests updated successfully"
    );
  });
  it("#11 Hitting '/category/delete' with body: { category: 'vests' } should return { ok: true, data: 'Category vests deleted successfully' }", async () => {
    const res = await axios.post("http://localhost:4040/category/delete", {
      category: "vests",
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      "category vests deleted successfully"
    );
  });
  it("#12 Hitting '/category/delete' with body: { category: 'hats' } should return { ok: true, data: 'Category jackets deleted successfully' }", async () => {
    const res = await axios.post("http://localhost:4040/category/delete", {
      category: "jackets",
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      "category jackets deleted successfully"
    );
  });
  it("#13 Hitting '/category/delete' with body: { category: 'hats' } should return { ok: true, data: 'Category hats doesn't exist' }", async () => {
    const res = await axios.post("http://localhost:4040/category/delete", {
      category: "hats",
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      "category hats doesn't exist"
    );
  });
});

const axios = require("axios");
const catContr = require("../block03/controllers/category.js");
const prodContr = require("../block03/controllers/product.js");

describe("Express b3ex01", () => {
  let date = Date.now();
  let date2 = Date.now() + 1;
  let date3 = Date.now() + 2;
  it("#1 Categories' controllers are connected to database", () => {
    for (controller in catContr) {
      expect(`${catContr[controller]}`.includes("async")).toBe(true);
      expect(`${catContr[controller]}`.includes("await")).toBe(true);
    }
  });
  it("#2 Products' controllers are connected to database", () => {
    for (controller in prodContr) {
      expect(`${prodContr[controller]}`.includes("async")).toBe(true);
      expect(`${prodContr[controller]}`.includes("await")).toBe(true);
    }
  });
  it(`#3 Hitting '/category/add' with body: { category: new Date.now() } should return { ok: true, data: 'Category ${date} added successfully' }`, async () => {
    const res1 = await axios.post("http://localhost:4040/category/add", {
      category: date,
    });
    expect(res1.data.ok).toBe(true);
    expect(res1.data.data.toLowerCase()).toContain(
      `category ${date} added successfully`
    );
  });
  it(`#4 Hitting '/category/add' with body: { category: date } should return { ok: true, data: 'Category ${date} already exist' }`, async () => {
    const res = await axios.post("http://localhost:4040/category/add", {
      category: date,
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      `category ${date} already exist`
    );
  });
  it(`#5 Hitting '/category/add' with body: { category: date2 } should return { ok: true, data: 'Category ${date2} added successfully' }`, async () => {
    const res2 = await axios.post("http://localhost:4040/category/add", {
      category: date2,
    });
    expect(res2.data.ok).toBe(true);
    expect(res2.data.data.toLowerCase()).toContain(
      `category ${date2} added successfully`
    );
  });
  it(`#6 Hitting '/category/categories' should return { ok: true, data: [
      { category: ${date} },
      { category: ${date2} }
      ]
    }`, async () => {
    const res = await axios.get("http://localhost:4040/category/categories");
    expect(res.data.ok).toBe(true);
    expect(
      Object.values(res.data.data).some(
        (item) => Number(item.category) === date
      )
    ).toBe(true);
    expect(
      Object.values(res.data.data).some(
        (item) => Number(item.category) === date2
      )
    ).toBe(true);
  });
  it(`#7 Hitting '/product/add' with body: {
      product: {
          name: '${date}cowboy',
          price: 10,
          color: 'black',
          description: 'best in town'
        },
      category: ${date},
     }  should return { ok: true, data: 'Product ${date}cowboy added successfully' }`, async () => {
    const res = await axios.post("http://localhost:4040/product/add", {
      product: {
        name: `${date}cowboy`,
        price: 10,
        color: "black",
        description: "best in town",
      },
      category: `${date}`,
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("product");
    expect(res.data.data.toLowerCase()).toContain(date.toString());
    expect(res.data.data.toLowerCase()).toContain("cowboy");
    expect(res.data.data.toLowerCase()).toContain("added");
  });
  it(`#8 Hitting '/product/add' with body: {
        category: ${date},
        name: '${date}cowboy',
        price: 10,
        color: 'black',
        description: 'best in town'
      }  should return { ok: true, data: 'Product ${date}cowboy already exists' }`, async () => {
    const res = await axios.post("http://localhost:4040/product/add", {
      product: {
        name: `${date}cowboy`,
        price: 10,
        color: "black",
        description: "best in town",
      },
      category: `${date}`,
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain("product");
    expect(res.data.data.toLowerCase()).toContain(date.toString());
    expect(res.data.data.toLowerCase()).toContain("cowboy");
    expect(res.data.data.toLowerCase()).toContain("already exist");
  });
  it(`#9 Hitting '/product/${date}cowboy' should return { ok: true, data: {
      name: ${date}cowboy,
      price: 10,
      color: "black",
      description: "best in town",
      category: ${date},
    } }`, async () => {
    const res = await axios.get(`http://localhost:4040/product/${date}cowboy`);
    expect(res.data.ok).toBe(true);
    expect(res.data.data.name.toLowerCase()).toContain(`${date}cowboy`);
  });
  it(`#10 Hitting '/product/banana' should return { ok: true, data: 'Product banana doesn't exist' }`, async () => {
    const res = await axios.get(`http://localhost:4040/product/banana`);
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(`product`);
    expect(res.data.data.toLowerCase()).toContain(`banana`);
    expect(res.data.data.toLowerCase()).toContain(`doesn't exist`);
  });
  it(`#11 Hitting '/category/${date}' should return { ok: true, data: [
    {
      name: '${date}cowboy',
      price: 10,
      color: 'black',
      description: 'best hat in town',
      category: ${date}
    }
  ] }`, async () => {
    const res = await axios.get(`http://localhost:4040/category/${date}`);
    expect(res.data.ok).toBe(true);
    expect(res.data.data[0].name.toLowerCase()).toContain(`${date}cowboy`);
  });
  it(`#12 Hitting '/category/banana' should return { ok: true, data: 'Category banana doesn't exist' }`, async () => {
    const res = await axios.get(`http://localhost:4040/category/banana`);
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(`banana`);
    expect(res.data.data.toLowerCase()).toContain(`exist`);
  });
  it(`#13 Hitting '/product/' should return { ok: true, data: [ {
      name: '${date}cowboy',
      price: 10,
      color: 'black',
      description: 'best in town',
      category: '${date}',
    } ] }`, async () => {
    const res = await axios.get("http://localhost:4040/product/");
    expect(res.data.ok).toBe(true);
    expect(
      Object.values(res.data.data).some((item) => item.name === `${date}cowboy`)
    ).toBe(true);
    expect(
      Object.values(res.data.data).some(
        (item) => item.category === date.toString()
      )
    ).toBe(true);
  });
  it(`#14 Hitting '/product/update' with body: {
      old_product: { name: '${date}cowboy' },
      new_product: { name: '${date}astronaut' }
    } should return { ok: true, data: 'product ${date}astronaut updated successfully' }`, async () => {
    const res = await axios.post("http://localhost:4040/product/update", {
      old_product: { name: `${date}cowboy` },
      new_product: { name: `${date}astronaut` },
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      `product ${date}astronaut updated successfully`
    );
  });
  it(`#15 Hitting '/product/update' with body: {
      old_product: { name: '${date}cowboya' },
      new_product: { name: '${date}astronaut' }
    } should return { ok: true, data: 'product ${date}astronaut doesn't exist' }`, async () => {
    const res = await axios.post("http://localhost:4040/product/update", {
      old_product: { name: `${date}cowboya` },
      new_product: { name: `${date}astronaut` },
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      `product ${date}cowboya doesn't exist`
    );
  });
  it(`#16 Hitting '/product/delete' with body: {
      product: { name: '${date}astronaut' }
    } should return { ok: true, data: 'product ${date}astronaut deleted successfully' }`, async () => {
    const res = await axios.post("http://localhost:4040/product/delete", {
      product: { name: `${date}astronaut` },
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      `product ${date}astronaut deleted successfully`
    );
  });
  it(`#17 Hitting '/product/delete' with body: {
      product: { name: '${date}astronauta' }
    } should return { ok: true, data: 'product ${date}astronaut doesn't exist' }`, async () => {
    const res = await axios.post("http://localhost:4040/product/delete", {
      product: { name: `${date}astronauta` },
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      `product ${date}astronauta doesn't exist`
    );
  });
  it(`#18 Hitting '/category/update' with body: { new_category: ${date3}, old_category: ${date} } should return { ok: true, data: 'Category ${date3} updated successfully' }`, async () => {
    const res = await axios.post("http://localhost:4040/category/update", {
      new_category: date3,
      old_category: date,
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      `category ${date3} updated successfully`
    );
  });
  it(`#19 Hitting '/category/update' with body: { new_category: ${date3}, old_category: ${date} } should return { ok: true, data: 'Category ${date3} doesn't exist' }`, async () => {
    const res = await axios.post("http://localhost:4040/category/update", {
      new_category: date3,
      old_category: date,
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      `category ${date} doesn't exist`
    );
  });
  it(`#20 Hitting '/category/delete' with body: { category: ${date3} } should return { ok: true, data: 'Category ${date3} deleted successfully' }`, async () => {
    const res = await axios.post("http://localhost:4040/category/delete", {
      category: date3,
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      `category ${date3} deleted successfully`
    );
  });
  it(`#21 Hitting '/category/delete' with body: { category: ${date2} } should return { ok: true, data: 'Category ${date2} deleted successfully' }`, async () => {
    const res = await axios.post("http://localhost:4040/category/delete", {
      category: date2,
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      `category ${date2} deleted successfully`
    );
  });
  it(`#22 Hitting '/category/delete' with body: { category: ${date2} } should return { ok: true, data: 'Category ${date2} doesn't exist' }`, async () => {
    const res = await axios.post("http://localhost:4040/category/delete", {
      category: date2,
    });
    expect(res.data.ok).toBe(true);
    expect(res.data.data.toLowerCase()).toContain(
      `category ${date2} doesn't exist`
    );
  });
});

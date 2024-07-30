const express = require('express');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(4040, () => {
    console.log('app is listening on port 4040');
});


app.post('/category/add', (req, res) => {
    const categoryToAdd = req.body.category;

    const categoryInDb = DB.some(entry => entry.category === categoryToAdd);

    if (categoryInDb) {
        res.send({ ok: true, data: `Category ${categoryToAdd} already exists`})
    } else {
        DB.push(
            {
                category: categoryToAdd,
                products: [],
            }
        );
        res.send({ ok: true, data: `Category ${categoryToAdd} added successfully`})
    }
});


app.post('/category/delete', (req, res) => {
    const categoryToDelete = req.body.category;

    const categoryIndex = DB.findIndex(entry => entry.category === categoryToDelete);

    if (categoryIndex === -1) {
        res.send({ ok: true, data: `Category ${categoryToDelete} doesn't exist`})
    } else {
        DB.splice(categoryIndex, 1);

        res.send({ ok: true, data: `Category ${categoryToDelete} deleted successfully`})
    }
});


app.post('/category/update', (req, res) => {
    const oldCategory = req.body.old_category;
    const newCategory = req.body.new_category;

    const categoryIndex = DB.findIndex(entry => entry.category === oldCategory);

    if (categoryIndex === -1) {
        res.send({ ok: true, data: `Category ${oldCategory} doesn't exist`});
    } else {
        DB[categoryIndex].category = newCategory;

        res.send({ ok: true, data: `Category ${newCategory} updated successfully`});
    }
});


app.get('/category/categories', (req, res) => {
    let categories = [];

    DB.forEach(entry => {
        categories.push(entry.category);
    });

    categories = categories.join(', ');

    res.send({ ok: true, data: categories });
});



app.get('/category/products', (req, res) => {
    res.send({ ok: true, data: DB });
});


app.get('/category/:category', (req, res) => {
    const category = req.params.category;

    const categoryEntry = DB.find(entry => entry.category === category);

    if (!categoryEntry) {
        res.send({ ok: true, data: `Category ${category} doesn't exist`});
    } else {
        res.send({ ok: true, data: categoryEntry.products });
    }
});


app.post('/product/add', (req, res) => {
    const category = req.body.category;
    const product = req.body.product;

    categoryIndex = DB.findIndex(entry => entry.category === category);

    if (categoryIndex === -1) {
        res.send({ ok: true, data: `Category doesn't exist`});
    } else {
        DB[categoryIndex].products.push(product);
        res.send({ ok: true, data: `Product ${product} added successfully`});
    }
});


app.post('/product/delete', (req, res) => {
    const category = req.body.category;
    const product = req.body.product;
  
    const categoryIndex = DB.findIndex(entry => entry.category === category);
  
    if (categoryIndex === -1) {
        res.send({ ok: true, data: `Category ${category} doesn't exist` });
    } else {
        const productIndex = DB[categoryIndex].products.findIndex(p => p.name === product);
  
        if (productIndex === -1) {
        res.send({ ok: true, data: `Product ${product} not in category ${category}` });

        } else {
            DB[categoryIndex].products.splice(productIndex, 1);
    
            res.send({ ok: true, data: `Product ${product} deleted successfully from category ${category}` });
        }
    }
  });


  app.post('/product/update', (req, res) => {
    const category = req.body.category;
    const oldProductName = req.body.old_product.name;
    const newProduct = req.body.new_product;

    const categoryIndex = DB.findIndex(entry => entry.category === category);

    if (categoryIndex === -1) {
        res.send({ ok: true, data: `Category ${category} doesn't exist` });
    } else {
        const productIndex = DB[categoryIndex].products.findIndex(p => p.name === oldProductName);

        if (productIndex === -1) {
            res.send({ ok: true, data: `Product ${oldProductName} is not in category ${category}` });
        } else {
            DB[categoryIndex].products[productIndex] = { ...DB[categoryIndex].products[productIndex], ...newProduct };

            res.send({ ok: true, data: `Product ${newProduct.name} updated successfully` });
            }
        }
});


const DB = [
    {
      category: 't-shirts',
      products: [
        {
          name: 'blue t-shirt',
          price: 20,
          color: 'blue',
          description: 'good product'
        },
        {
          name: 'red t-shirt',
          price: 25,
          color: 'red',
          description: 'good product'
        },
        {
          name: 'yellow t-shirt',
          price: 22,
          color: 'yellow',
          description: 'good product'
        }
      ]
    },
    {
      category: 'shoes',
      products: [
        {
          name: 'black shoes',
          price: 120,
          color: 'black',
          description: 'good product'
        },
        {
          name: 'brown shoes',
          price: 95,
          color: 'brown',
          description: 'good product'
        }
      ]
    }
  ]

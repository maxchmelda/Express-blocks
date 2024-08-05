import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = 'http://localhost:4040';

const App = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get(`${apiUrl}/product/`)
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduct = (productName) => {
    axios.post(`${apiUrl}/product/delete`, { name: productName })
      .then(() => {
        console.log(`Product ${productName} deleted successfully`);
        fetchData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [newProduct, setNewProduct] = useState({
    category: "",
    product: {
      name: "",
      color: "",
      price: "",
      description: "",
    }
  });

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('product.')) {
      setNewProduct(prevState => ({
        ...prevState,
        product: {
          ...prevState.product,
          [name.replace('product.', '')]: value
        }
      }));
    } else {
      setNewProduct(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    axios.post(`${apiUrl}/product/add`, newProduct)
    .then(() => {
      setNewProduct({
        category: "",
        product: {
          name: "",
          color: "",
          price: "",
          description: "",
        }
      });
      fetchData();
    })
    .catch((err) => console.log(err));
  } 

  const [newCategory, setNewCategory] = useState({
    old_category: "",
    newCategory: "",
  });

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();

    axios.post(`${apiUrl}/category/update`, {
      old_category: newCategory.old_category,
      new_category: newCategory.newCategory
    })
    .then(() => {
      setNewCategory({
        old_category: "",
        newCategory: "",
      });
      fetchData();
    }).catch(err => console.log(err));
  }

  const [plusCategory, setPlusCategory] = useState("");

  const handlePlusCatSubmit = (e) => {
    e.preventDefault();

    axios.post(`${apiUrl}/category/add`, { category: plusCategory })
    .then(() => {
      setPlusCategory("");
      fetchData();
    })
    .catch(err => console.log(err))
  }

  const [minusCategory, setMinusCategory] = useState("");

  const handleMinusCatSubmit = (e) => {
    e.preventDefault();

    axios.post(`${apiUrl}/category/delete`, { category: minusCategory })
    .then(() => {
      setMinusCategory("");
      fetchData();
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <h1>Shop</h1>
      <form className='add-product-wrapper' onSubmit={handleProductSubmit}>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleProductChange}
        />
        <input
          type="text"
          name="product.name"
          placeholder="Product Name"
          value={newProduct.product.name}
          onChange={handleProductChange}
        />
        <input
          type="text"
          name="product.color"
          placeholder="Color"
          value={newProduct.product.color}
          onChange={handleProductChange}
        />
        <input
          type="text"
          name="product.price"
          placeholder="Price"
          value={newProduct.product.price}
          onChange={handleProductChange}
        />
        <input
          type="text"
          name="product.description"
          placeholder="Description"
          value={newProduct.product.description}
          onChange={handleProductChange}
        />
        <button type='submit'>Add Product</button>
      </form>
      <form className='rename-category' onSubmit={handleCategorySubmit}>
        <input
          type="text"
          name="old_category"
          placeholder="Old Category Name"
          value={newCategory.old_category}
          onChange={handleCategoryChange}
        />
        <input
          type="text"
          name="newCategory"
          placeholder="New Category Name"
          value={newCategory.newCategory}
          onChange={handleCategoryChange}
        />
        <button type='submit'>Rename Category</button>
      </form>
      <div className='wrapper'>
        {data.map((entry, index) => (
          <div className='category-wrapper' key={index}>
            <h2 className='category-name'>{entry.category}</h2>
            <div className='product-grid-container'>
              {entry.products.map((product, index) => (
                <div className='product-wrapper' key={index}>
                  <h3 className='product-name'>{product.name}</h3>
                  <p className='product-color'>{`Color: ${product.color}`}</p>
                  <p className='product-price'>{`Price: ${product.price} EUR`}</p>
                  <p className='product-description'>{`Description: ${product.description}`}</p>
                  <button onClick={() => handleDeleteProduct(product.name)}>Remove Product</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className='bottom-options'>
        <form className='add-category' onSubmit={handlePlusCatSubmit}>
          <h2>Add category</h2>
          <input value={plusCategory} onChange={(e) => setPlusCategory(e.target.value)}/>
          <button type="submit">submit</button>
        </form>
        <form className='add-category' onSubmit={handleMinusCatSubmit}>
          <h2>Delete category</h2>
          <input value={minusCategory} onChange={(e) => setMinusCategory(e.target.value)}/>
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};

export default App;

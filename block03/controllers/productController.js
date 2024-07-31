const Category = require('../models/category');

exports.displayCategoriesWithProducts = async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories.length) {
            return res.json({ ok: true, data: 'No categories found' });
        }

        const categoryData = categories.map(cat => ({
            category: cat.category,
            products: cat.products
        }));

        res.json({ ok: true, data: categoryData });
    } catch (error) {
        res.json({ ok: false, error: 'Failed to fetch categories with products', details: error.message });
    }
};


exports.displaySingleProduct = async (req, res) => {
    try {
        const productName = req.params.product;
        const category = await Category.findOne({ 'products.name': productName });

        if (!category) {
            return res.json({ ok: true, data: `Product ${productName} doesn't exist` });
        }

        const product = category.products.find(p => p.name === productName);
        res.json({ ok: true, data: product });
    } catch (error) {
        res.json({ ok: false, error: 'Failed to fetch product', details: error.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { category: categoryName, product } = req.body;
        const category = await Category.findOne({ category: categoryName });

        if (!category) {
            return res.json({ ok: false, data: `Category with name ${categoryName} doesn't exist` });
        }

        const existingProduct = category.products.find(p => p.name === product.name);
        if (existingProduct) {
            return res.json({ ok: false, data: `Product ${product.name} already exists` });
        }

        category.products.push(product);
        await category.save();

        res.json({ ok: true, data: `Product ${product.name} added successfully` });
    } catch (error) {
        res.json({ ok: false, error: 'Failed to add product', details: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productName = req.body.product.name;
        const category = await Category.findOne({ 'products.name': productName });

        if (!category) {
            return res.json({ ok: false, data: `Product ${productName} doesn't exist` });
        }

        const updatedProducts = category.products.filter(p => p.name !== productName);
        if (updatedProducts.length === category.products.length) {
            return res.json({ ok: false, data: `Product ${productName} doesn't exist` });
        }

        category.products = updatedProducts;
        await category.save();

        res.json({ ok: true, data: `Product ${productName} deleted successfully` });
    } catch (error) {
        res.json({ ok: false, error: 'Failed to delete product', details: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { old_product: oldProduct, new_product: newProduct } = req.body;
        const category = await Category.findOne({ 'products.name': oldProduct.name });

        if (!category) {
            return res.json({ ok: false, data: `Product ${oldProduct.name} doesn't exist` });
        }

        const productIndex = category.products.findIndex(p => p.name === oldProduct.name);
        if (productIndex === -1) {
            return res.json({ ok: false, data: `Product ${oldProduct.name} doesn't exist` });
        }

        category.products[productIndex] = { ...category.products[productIndex], ...newProduct };
        await category.save();

        res.json({ ok: true, data: `Product ${oldProduct.name} updated to ${newProduct.name} successfully` });
    } catch (error) {
        res.json({ ok: false, error: 'Failed to update product', details: error.message });
    }
};

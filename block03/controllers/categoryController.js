const Category = require('../models/category');

exports.displayCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        
        const categoryNames = categories.map(cat => cat.category).join(', ');

        res.send({ ok: true, data: categoryNames });
    } catch (error) {
        res.send({ ok: false, error: 'Failed to fetch categories' });
    }
};


exports.displaySingleCategory = async (req, res) => {
    try {
        const categoryName = req.params.category;

        const category = await Category.findOne({ category: categoryName });

        if (!category) {
            return res.status(404).json({ ok: false, data: `Category ${categoryName} not found` });
        }

        res.send({ ok: true, data: category });
    } catch (error) {
        res.send({ ok: false, error: 'Failed to fetch category', details: error.message });
    }
};


exports.createCategory = async (req, res) => {
    try {
        const newCategory = {
            category: req.body.category,
            products: []
        };

        const categoryInDb = await Category.findOne({ category: req.body.category });

        if (categoryInDb) {
            return res.json({ ok: false, data: `Category with name ${req.body.category} is already in db` });
        }

        await Category.create(newCategory);

        res.send({ ok: true, data: `Category ${req.body.category} created successfully` });
    } catch (error) {
        res.send({ ok: false, error: 'Failed to create category', details: error.message });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        const categoryName = req.body.category;

        const categoryInDb = await Category.findOne({ category: categoryName });

        if (!categoryInDb) {
            return res.json({ ok: false, data: `Category with name ${req.body.category} is not found` });
        }

        await Category.deleteOne({ category: categoryName });

        res.send({ ok: true, data: `Category ${req.body.category} deleted successfully` });
    } catch (error) {
        res.send({ ok: false, error: 'Failed to delete category', details: error.message });
    }
}


exports.updateCategory = async (req, res) => {
    try {
        console.log(req.body);
        const oldCategory = req.body.old_category;
        const newCategory = req.body.new_category;

        const categoryInDb = await Category.findOne({ category: oldCategory });

        if (!categoryInDb) {
            return res.json({ ok: false, data: `Category with name ${oldCategory} is not found` });
        }

        const result = await Category.updateOne(
            { category: oldCategory },
            { $set: { category: newCategory } }
        );

        if (result.modifiedCount === 0) {
            return res.json({ ok: false, data: `Failed to update category` });
        }

        res.send({ ok: true, data: `Category ${oldCategory} updated to ${newCategory} successfully` });
    } catch (error) {
        res.send({ ok: false, error: 'Failed to update category', details: error.message });
    }
}

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/categories', categoryController.displayCategories);
router.get('/:category', categoryController.displaySingleCategory);
router.post('/add', categoryController.createCategory);
router.post('/delete', categoryController.deleteCategory);
router.post('/update', categoryController.updateCategory);

module.exports = router;
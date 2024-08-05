const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.displayCategoriesWithProducts);
router.get('/:product', productController.displaySingleProduct);
router.post('/add', productController.addProduct);
router.post('/delete', productController.deleteProduct);
router.post('/update', productController.updateProduct);

module.exports = router;
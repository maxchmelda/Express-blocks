const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('product', productController.displayCategoriesWithProducts);
router.get('product/:product', productController.displaySingleProduct);
router.post('product/add', productController.addProduct);
router.post('product/delete', productController.deleteProduct);
router.post('product', productController.updateProduct);

module.exports = router;
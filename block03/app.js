const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cors = require('cors')

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/firstDatabase').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.use('/product', productRoutes);
app.use('/category', categoryRoutes);

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
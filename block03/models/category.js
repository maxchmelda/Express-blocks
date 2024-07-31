const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: String,
  products: Array
});

module.exports = mongoose.model("Category", categorySchema);


const router = require("express").Router();
const data = require("../data");
const Product = require("../models/productModel");

router.get("/", async (req, res) => {
  //res.json(data)
  try {
    const products = await Product.find();
    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/create-products", async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    //user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

router.delete("/delete-product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = router;

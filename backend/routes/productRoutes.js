import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
      
    const category = req.query.category ? { category: req.query.category } : {};

    // Combine filters
    const filter = { ...keyword, ...category };

    // Sorting
    let sortObj = {};
    if (req.query.sort === 'priceAsc') sortObj.price = 1;
    else if (req.query.sort === 'priceDesc') sortObj.price = -1;
    else if (req.query.sort === 'rating') sortObj.rating = -1;
    else sortObj.createdAt = -1; // default new arrivals

    const products = await Product.find(filter).sort(sortObj);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;

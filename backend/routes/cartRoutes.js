import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

// Mock simple cart management by userId for demonstration (since no JWT auth implemented yet)

// @desc    Get user cart
// @route   GET /api/cart/:userId
// @access  Public (mock)
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('cartItems.product');
    if (cart) {
      res.json(cart);
    } else {
      res.json({ user: req.params.userId, cartItems: [] });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Save user cart
// @route   POST /api/cart
// @access  Public (mock)
router.post('/', async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    
    if (cart) {
      cart.cartItems = cartItems;
      await cart.save();
    } else {
      cart = await Cart.create({
        user: userId,
        cartItems
      });
    }
    
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;

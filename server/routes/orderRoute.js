const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Protected routes - require authentication
router.use(protect);

// Create a new order
router.post('/create', orderController.createOrder);

// Get user's orders
router.get('/user-orders', orderController.getUserOrders);

// Admin routes - require admin privileges (must come before parameterized routes)
router.get('/all', admin, orderController.getAllOrders);

// Get specific order by ID (must come after specific routes)
router.get('/:orderId', orderController.getOrderById);

// Update order status (admin only)
router.patch('/:orderId/status', admin, orderController.updateOrderStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const subController = require('../controllers/subcriptionController');
const { protect, admin } = require('../middleware/authMiddleware');

// Admin: Get all subscriptions
router.get('/', protect, admin, subController.getAllSubscriptions);

// Create a new subscription
router.post('/', protect, subController.createSubscription);

// Get all subscriptions for a user
router.get('/user', protect, subController.getUserSubscriptions);

// Update a subscription
router.put('/:id', protect, subController.updateSubscription);

// Cancel a subscription
router.delete('/:id', protect, subController.cancelSubscription);

module.exports = router;

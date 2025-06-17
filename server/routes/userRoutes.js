const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
  updateUserRole
} = require('../controllers/userController');
const User = require('../models/user');

// Auth & Profile
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile/update', protect, updateUserProfile);
router.delete('/profile', protect, deleteUser);

// Admin: User Management
router.get('/all', protect, admin, getAllUsers);
router.put('/:id/role', protect, admin, updateUserRole);

module.exports = router; 
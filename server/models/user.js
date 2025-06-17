const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  profileImage: {
    type: String,
    default: '',
    maxLength: 5 * 1024 * 1024 // Limit to 5MB
  },
  createdAt: { type: Date, default: Date.now },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Add indexes for better performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ createdAt: -1 });

// Add collection name explicitly
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;

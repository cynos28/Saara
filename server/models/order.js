const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    id: String,
    name: String,
    price: mongoose.Schema.Types.Mixed, // Can be string or number
    image: String,
    quantity: Number
  }],
  personalInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String
  },
  deliveryAddress: {
    address: String,
    city: String,
    zipCode: String
  },
  paymentInfo: {
    cardNumber: String,
    cardName: String,
    expiryDate: String,
    cvv: String
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: Date,
  specialInstructions: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);

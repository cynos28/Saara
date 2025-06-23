const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subscriptionType: { type: String, enum: ['weekly', 'monthly'], required: true },
  colorTheme: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  deliveryDates: [{ type: Date, required: true }],
  status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
  receiverName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  specialInstructions: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);

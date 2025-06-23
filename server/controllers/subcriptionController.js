const Subscription = require('../models/subcription');

// Create a new subscription
exports.createSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      subscriptionType,
      colorTheme,
      startDate,
      endDate,
      deliveryDates,
      receiverName,
      phone,
      address,
      specialInstructions
    } = req.body;

    const subscription = new Subscription({
      userId,
      subscriptionType,
      colorTheme,
      startDate,
      endDate,
      deliveryDates,
      receiverName,
      phone,
      address,
      specialInstructions
    });
    await subscription.save();
    res.status(201).json(subscription);
  } catch (err) {
    console.error('Create Subscription Error:', err);
    res.status(500).json({ message: 'Failed to create subscription', error: err.message });
  }
};

// Get all subscriptions for a user
exports.getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.user._id;
    const subscriptions = await Subscription.find({ userId });
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch subscriptions', error: err.message });
  }
};

// Update a subscription
exports.updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const subscription = await Subscription.findByIdAndUpdate(id, update, { new: true });
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update subscription', error: err.message });
  }
};

// Cancel a subscription (set status to cancelled)
exports.cancelSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel subscription', error: err.message });
  }
};

// Admin: Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate('userId', 'name email');
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all subscriptions', error: err.message });
  }
};

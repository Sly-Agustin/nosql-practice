const mongoose = require('mongoose');

export const getHealthController = async (req, res) => {
  try {
    const credentials = process.env.MONGODB_URL;
    await mongoose.connect(credentials);
    res.status(200).json({ data: "Health connected to database" });
  } catch (err) {
    res.status(500).json({ message: 'Could not connect to database' });
  }
};
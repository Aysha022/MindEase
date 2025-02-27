const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect('mongodb+srv://MindEase:MindEase%40123@mindease.n96qy.mongodb.net/?retryWrites=true&w=majority&appName=MindEase');
      
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();

// Connect to database
connectDB();
                                        
// Middleware
app.use(bodyParser.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

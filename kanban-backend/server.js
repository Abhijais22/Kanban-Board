const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();
require('./config/passport');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));


const allowedOrigins = [
   
  https://kanban-board-7941.onrender.com 
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);


// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

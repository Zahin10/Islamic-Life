const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const quranRoutes = require('./routes/quranRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quran', quranRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/register.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/home.html'));
});

app.get('/quran', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/quran.html'));
});

app.get('/recitation', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/recitation.html'));
});

app.get('*', (req, res) => {
  res.status(404).send(`
    <h1>Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <p>Available pages:</p>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
      <li><a href="/home">Dashboard</a></li>
      <li><a href="/quran">Quran</a></li>
      <li><a href="/recitation">Recitation</a></li>
    </ul>
  `);
});

module.exports = app;
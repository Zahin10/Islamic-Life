const app = require('./app');
const pool = require('./config/database');

const PORT = process.env.PORT || 3000;

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
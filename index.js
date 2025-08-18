require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.get('/api/config', (req, res) => {
  res.json({ env: process.env.NODE_ENV || 'development', port: PORT });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} else {
  module.exports = app;
}


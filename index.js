const express = require('express');
const app = express();
const port = 3000;

app.get('/api/leaderboard', (req, res) => {
  res.json([
    { name: 'Alice', score: 100 },
    { name: 'Bob', score: 90 },
    { name: 'Charlie', score: 80 },
  ]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

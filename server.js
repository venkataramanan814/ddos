const express = require('express');
const app = express();


// Simulate packet data
const packetData = Array.from({ length: 2000 }, (_, index) => ({
  timestamp: Date.now(),
  size: Math.random() * 100
}));

app.use(express.json());

app.get('/api/packets', (req, res) => {
  // In a real scenario, you'd collect real packet data from the network
  res.json(packetData);
});
const port = 5001; // Change this to a different port if needed
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

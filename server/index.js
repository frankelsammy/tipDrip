const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'tip-drip', 'build')));

app.get('/start', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'tip-drip', 'build', 'index.html'));
});

app.post('/api/log', (req, res) => {
    const { message } = req.body;
    console.log('Received log:', message);  // This will print in your terminal
    res.json({ status: 'Logged!' });        // Send JSON response back to client
  });
  

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});

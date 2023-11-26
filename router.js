const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

app.post('/login', (req, res) => {
  const formData = req.body;
  console.log('Received data:', formData);
  res.json({ message: 'Data received successfully' });
});

app.post('/register', (req, res) => {
  const formData = req.body;
  console.log('Received data:', formData);
  res.json({ message: 'Data received successfully' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api', (req, res) => res.send('D&D Character Sheet Manager'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(port, () => console.log(`Express app listening at http://localhost:${port}`));


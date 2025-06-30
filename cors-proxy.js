const express = require('express');
const request = require('request');
const app = express();

const TARGET = 'https://rpc.gorbagana.wtf';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', (req, res) => {
  const url = TARGET + req.url;
  req.pipe(request({ url, method: req.method, headers: req.headers })).pipe(res);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`CORS proxy running on port ${PORT}`));
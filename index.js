require('dotenv/config');
const express = require('express');
const cors = require('cors');
const request = require('request');
const { stringify } = require('querystring');

const market = 'https://market.csgo.com/api/v2/prices/RUB.json';
const steamp = 'https://steamp.ru/v2/';
const app = express();
app.use(cors({ origin: '*' }));
app.get('/market', (_, res) => {
  request(market, (err, _, body) => {
    res.send(body);
  });
});
app.get('/steamp/:key', (req, res) => {
  const params = stringify({
    key: req.params.key,
    appid: 730,
    count: true,
    bcount: true,
    bprice: true,
  });
  request(`${steamp}?${params}`, (err, _, body) => {
    res.send(body);
  });
});
app.listen(process.env.PORT, () => {
  console.log('App listening on %d', process.env.PORT);
});

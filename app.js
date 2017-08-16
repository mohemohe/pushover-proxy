const request = require('superagent');
const morgan = require('morgan');
const express = require('express');
const app = express();

const config = {
  pushover: {
    api: {
      endpoint: 'https://api.pushover.net/1/messages.json',
    },
  },
};

app.use(morgan('combined'));

app.get('/', function (req, res) {
  request.post(config.pushover.api.endpoint)
         .type('form')
         .send(req.query)
         .end((e, r) => {
           if(e) {
             res.send(e);
           } else {
             res.send(r.body);
           }
         });
});

app.listen(3000, function () {
  console.log('Push notification proxy listening on port 3000');
});
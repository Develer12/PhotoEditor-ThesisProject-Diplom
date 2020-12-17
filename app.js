const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || config.get('port');

const app = express();
app.use(bodyParser.json());
//app.use(express.json({ extended: true }));


//Api
app.use('/api', require('./controllers/api'));

//client
app.use('/', express.static(`${__dirname}/client/build`));
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});


app.listen(PORT, () => {
  mongoose.connect(config.get('mongoUri'), {
    //autoIndex: process.env.NODE_ENV !== 'production',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(`Listening on ${config.get('baseUrl')}`);
  });
})
.on('error', (e) => {
  console.log(`Server Error: ${e.code}`);
  process.exit(1);
});


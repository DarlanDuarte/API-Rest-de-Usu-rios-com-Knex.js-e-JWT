const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', router);

app.listen(8080, () => {
  console.log('Servidor Iniciado com sucesso!');
});

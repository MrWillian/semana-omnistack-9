const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-58x2s.mongodb.net/aircnc?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// req.query = Acessar query params (parametros passados pela url (com ?) - para filtros)
// req.params = Acessar route params (parametros passados pela url (com /) - para edição e delete)
// req.body = Acessar corpo da requisição (para criação, edição)
// req.headers = Serve para definir o contexto da requisição (contexto de autenticação, idioma do usuário)

app.use(cors());
app.use(express.json()); //Necessário para que o express entenda o JSON
app.use(routes); // Precisa vir depois da linha do express.json()

app.listen('3333');

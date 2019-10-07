const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-58x2s.mongodb.net/aircnc?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

// req.query = Acessar query params (parametros passados pela url (com ?) - para filtros)
// req.params = Acessar route params (parametros passados pela url (com /) - para edição e delete)
// req.body = Acessar corpo da requisição (para criação, edição)
// req.headers = Serve para definir o contexto da requisição (contexto de autenticação, idioma do usuário)

app.use(cors()); //Permite que qualquer aplicação acesse o backend
app.use(express.json()); //Necessário para que o express entenda o JSON
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); //Faz com que a rota /files acesse a pasta /uploads
app.use(routes); // Precisa vir depois da linha do express.json()

server.listen('3333');

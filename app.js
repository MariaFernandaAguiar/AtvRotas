const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/index', (req, res) => {
  res.render('index', { link: '/sobre' });
});

app.get('/sobre', (req, res) => {
  res.render('sobre', { link: '/index' });
});

app.get('/inverter', (req, res) => {
  const texto = req.query.texto || '';
  const textoInvertido = texto.split('').reverse().join('');
  res.render('inverter', { textoInvertido });
});

app.post('/validar', (req, res) => {
  const { usuario, senha } = req.body;
  let mensagem;
  if (senha === usuario.repeat(2)) {
    mensagem = 'Usuário possui permissão de acesso';
  } else {
    mensagem = 'Usuário não possui permissão de acesso';
  }
  res.render('validar', { mensagem });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

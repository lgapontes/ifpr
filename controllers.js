
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Afazer = require('./models')
const Banco = require('./infraestrutura')

const app = express()
app.use(bodyParser.json());
app.use(cors())

const banco = new Banco();

const MSG_BAD_REQUEST = 'Afazer deve ser um texto com no máximo 20 caracteres!';
const MSG_NOT_FOUND = 'Registro não encontrado!';

app.route('/afazeres')
  .get(function (req, res) {
    banco.consultar_todos( afazeres => {
      res.json(afazeres)
    })
  })

app.route('/afazer/:id')
  .get(function (req, res) {
    banco.consultar_por_id(req.params.id, afazer => {
      res.json(afazer)
    }, () => {
      res.status(404).send(MSG_NOT_FOUND)
    });
  })
  .put(function (req, res) {
    let afazer = new Afazer(req.body.afazer, req.params.id);
    if (afazer.ehValido()) {
      banco.atualizar(afazer.uuid, afazer.afazer, () => {
        res.sendStatus(200)
      }, () => {
        res.status(404).send(MSG_NOT_FOUND)
      });
    } else {
      res.status(400).send(MSG_BAD_REQUEST)
    }
  })
  .delete(function (req, res) {
    banco.apagar(req.params.id, () => {
      res.sendStatus(200)
    }, () => {
      res.status(404).send(MSG_NOT_FOUND)
    });
  })

app.route('/afazer')
  .post(function (req, res) {
    let afazer = new Afazer(req.body.afazer);
    if (afazer.ehValido()) {
      banco.inserir(afazer);
      res.sendStatus(200)
    } else {
      res.status(400).send(MSG_BAD_REQUEST)
    }
  })

app.listen(80, function () {
  console.log('http://127.0.0.1:80/afazeres')
})

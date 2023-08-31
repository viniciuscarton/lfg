const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const mongoUrl = 'mongodb://127.0.0.1:27017/lfg'; // Substitua pelo URL do seu banco de dados

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão com o MongoDB estabelecida');
});

app.post('/mongo', async (req, res) => {
  const data = req.body;
  try {
    await db.collection('propostas').insertOne(data);
    console.log('Proposta inserida no MongoDB');
    res.status(200).send('Proposta inserida no MongoDB');
  } catch (error) {
    console.error('Erro ao inserir proposta no MongoDB:', error);
    res.status(500).send('Erro ao inserir proposta no MongoDB');
  }
});

app.get('/mongo', async (req,res) => {
    try { 
        const propostas = await db.collection('propostas').find().toArray();
        res.json(propostas);
    } catch (error) {
        console.error('Erro ao recuperar as propostas: ', error);
        res.status(500).send('Erro ao recuperar as propostas');
    }
});

app.route('/mongo/:id')
  .get(async (req, res) => {
    const id = req.params._id;
    try {
      const data = await db.collection('propostas').findOne({ id });
      res.json(data);
    } catch (error) {
      console.error('Erro ao buscar proposta no MongoDB: ', error);
      res.status(500).send('Erro ao buscar proposta no MongoDB');
    }
  })
  .delete(async (req, res) => {
    const id = req.params._id;
    try {
      const result = await db.collection('propostas').deleteOne({ id });
      if (result.deletedCount === 1) {
        res.status(200).send('Proposta deletada com sucesso');
      } else {
        res.status(404).send('Proposta não encontrada');
      }
    } catch (error) {
      console.error('Erro ao deletar proposta do MongoDB: ', error);
      res.status(500).send('Erro ao deletar proposta do MongoDB');
    }
  });









app.listen(port, () => {
  console.log(`Proxy server do MongoDB está rodando na porta ${port}`);
});

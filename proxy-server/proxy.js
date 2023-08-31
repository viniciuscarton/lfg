const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 3000; 

app.use(cors());
app.use(express.json());

app.post('/api/proxy', async (req, res) => {
  try {
    const apiEndpoint = 'https://loan-processor.digitalsys.com.br/api/v1/loan/';
    const requestOptions = {
      timeout: 30000,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    };

    const response = await fetch(apiEndpoint, requestOptions);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Erro: ', error);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy está rodando na porta ${PORT}`);
});

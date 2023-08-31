# Loans For Good
[![My Skills](https://skillicons.dev/icons?i=django,mongodb,nodejs,express,&theme=dark)](https://skillicons.dev)

**Loans For Good** é uma aplicação web desenvolvida em Django para a submissão de propostas de crédito. A aplicação possui uma seção dinâmica para a personalização de formulários e conexão com o MongoDB para armazenamento e gerenciamento das propostas aceitas.

## Instalação
Antes de executar a aplicação, certifique-se de ter o [MongoDB](https://www.mongodb.com/pt-br) e o [Node.js](https://nodejs.org/en) instalados. Também confira as dependências no arquivo [requirements.txt](/requirements.txt).

## Execução 
Terminal 1: cd proxy-server >> node proxy.js <br>
Terminal 2: cd proxy-server >> node mongo-proxy.js <br>
Terminal 3:  digitalSys >> python manage.py runserver <br> 

## Uso
1. Na página inicial, clique no botão 'Envie sua proposta!'. 
![Index](/digitalSys/lfg/static/images/readme/index.PNG)

2. Na página de propostas, o administrador é capaz de personalizar os campos clicando no botão 'Adicionar campo' e inserindo o nome desejado (que posteriormente será o placeholder e a chave no banco de dados). 
![Index](/digitalSys/lfg/static/images/readme/proposta.gif)

3. Com todos os campos adicionados, o administrador deve clicar no botão 'Ok', o que fixará o formulário para preenchimento. Após o preenchimento, clique no botão 'Enviar' para submetê-lo à [API de Análise de Crédito](https://loan-processor.digitalsys.com.br/swagger/index.html) distribuída pela DigitalSys. Esta API retorna dois valores possíveis: "approved:true" ou "approved:false". Caso a proposta seja aprovada, o navegador a enviará para o banco de dados do MongoDB para análise posterior.
![Index](/digitalSys/lfg/static/images/readme/mongo.PNG)

4. Na guia 'Painel Administrativo', é possível analisar todas a propostas que foram submetidas com sucesso. O administrador, então, pode aceitá-las (sinalizando-as em verde) ou negá-las (excluindo-as do banco de dados). 
![Index](/digitalSys/lfg/static/images/readme/painelAdm.gif)

## Tecnologias 
* Django;
* Node.js e Express.js: para a comunicação entre formulário-API-MongoDB;
* MongoDB: banco de dados;

## Funcionalidades futuras
*  Autenticação para o Painel Administrativo;


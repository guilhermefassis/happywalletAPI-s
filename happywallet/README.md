<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

<div>
    <h2> Descrição do projeto </h2>
    <a> 
        <h3> 
            Api para controle financeiro utilizando node.js com nest.js, foi utilizado mongodb atlas como database e moongosse como ORM utilizando padrão REST.
            ##UTILIDADES
            <ol>
                <li>   Cadastrar receita e despesas </li>
                <li>   Filtrar despesas e receitas por mês </li>
                <li>   Resgatar balanço mensal de cada usuario </li>    
                <li>   Controle de entradas para usuarios com plano FREE e PRO</li> 
                <li>   Envio de mensagens via whatsapp </li>
    <br>
</div>

<div>
    <h2> Estatus do projeto
    <br>
    <h3>🚧 ** ✔Projeto Concluido ** 🚧
</div>

<div>
    <br>
    <h2> 🔨 Stacks usadas
    <br>
    <p>
        <ol>
            <li> Node.js com TypeScript
            <li> Nest.js
            <li> Mongoose
            <li> Axios
            <li> JWT
    <br>
</div>

<div>
    <h2> 🛠️ CUIDADO
    <p> Devido ao curto periodo para desenvolvimento do projeto, á uma issue a ser solucionada:
    <p> Foi criada outra API para envio de mensagens no whatsapp que está hospedada na AWS em ums instancia EC2
    <p> Quando realizamos uma requisição com o numero errado, o token de login da api e perdido e é necessario refazer o login na whatsapp api
    <p> Para evitar esse conflito é necessario a verificação do seu numero de whatsapp no seu aparelho.
    <p> Pois há numeros que foram integrados após a adição do 9° digito: ex- 9xxxx-xxxx e a numeros que não possuem o 9° digito, verifique em sua conta whatsapp se o 9 digito está presente
    <br>
</div>
<div>
    <br>
    <h2> 🔨 Como usar:
    <br>
    <p> Após se registrar e fazer o login na sua conta:
    <p> Acesse o Swagger utilizando { Url }/swagger
    <img src="/img/swagger.png">

    <p> Query Strings disponiveis: 
    <p> ?month={1 - 12} numeros de 1 á 12
    <p> ?page={0 - n} numero de 0 a quantidade de paginas disponivel
    <p> ?size={ 0 - n } determina o tamanho da pagina
    <p> Pode se usar as query strings juntas
      
</div>

<p> Para mais informações sobre a HappyWallerWppAPI acesse: https://git.gft.com/happywallet-app/happywallerwhatsappapi

## License

Nest is [MIT licensed](LICENSE).

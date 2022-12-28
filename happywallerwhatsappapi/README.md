<div>
    <h2> Descrição do projeto </h2>
    <a> 
        <h3> 
            Api para envio de mensagens via Whatsapp.
            ##UTILIDADES
            <ol>
                <li>  Envio de mensagens </li>
                <li>  Check de status </li>
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
            <li> Venom-bot
            <li> AWS EC2
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
    <p> send: http://52.67.246.216:3000/send POST { number: {string}, message: {string} }
    <p> retorno status 200;
    <p> status: http://52.67.246.216:3000/status GET 
    <p> retorno "QRCODE em base64 e acciQR"

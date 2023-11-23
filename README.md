# Desafio Técnico 2

Este é um projeto de API de autenticação construído com Node.js e Express, usando JWT para autenticação de usuários.

## Configuração do Projeto

**Instalação de Dependências:**

   Execute o comando abaixo para instalar as dependências necessárias.
   
   npm install


## Como Rodar o Projeto
Iniciar o Servidor:

Execute o seguinte comando para iniciar o servidor.

npm start

O servidor será iniciado em http://localhost:3000 por padrão.

# Cadastro de Usuário:

Endpoint: POST http://localhost:3000/auth/users

Crie um novo usuário usando um cliente HTTP ou o Postman.

Exemplo de corpo da requisição:


json

Copy code

{
  
  "nome": "Nome do Usuário",
  
  "email": "usuario@email.com",
  
  "senha": "senha123",
  
  "telefone": {
    "ddd": "11",
    "numero": "987654321"

}
}


# Login de Usuário:

Endpoint: POST http://localhost:3000/auth/login

Faça login usando um cliente HTTP ou o Postman.

Exemplo de corpo da requisição:

json

Copy code
{
  
  "email": "usuario@email.com",
  
  "senha": "senha123"
}

# Busca de Usuário Autenticado:

Endpoint: GET http://localhost:3000/auth/user

Requer um token de autenticação no cabeçalho Authorization. Use o 

token obtido no login.

Exemplo de cabeçalho:

Authorization: Bearer {seu_token_jwt}

# Como Testar
Use um cliente HTTP, como o Postman, para testar os endpoints conforme as instruções acima.

#Hospedagem no render

https://apiauthentication-c9gk.onrender.com





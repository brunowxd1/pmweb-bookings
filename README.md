# PMWeb Bookings

## Requisitos

- NodeJS
- MongoDB
  \
  &nbsp;

## Setup

Após clonar o projeto do repositório do GitHub, instalar os módulos necessários via YARN ou NPM. Ex:

            yarn

\
&nbsp;

### Ambiente de desnvolvimento

Para executar o projeto em ambiente de desenvolvimento, executar o comando:

            yarn dev:server

\
&nbsp;

### Ambiente de Produção

Já para executar o projeto em ambiente de produção, será necessário fazer a transpilação do código em Typescript através do comando

            yarn build

E, após, executar o comando

            yarn prod:server

**OBS:** Por padrão o projeto rodará na porta 3333
\
&nbsp;
\
&nbsp;

## Documentação

O projeto utiliza a biblioteca **SWAGGER** para a documentação da API. Para visualizar a documentação, basta executar o projeto e acessar a url [http://localhost:3333/api-docs/](http://localhost:3333/api-docs/)

Também estará disponível na raiz do projeto o arquivo:

            PMWebBookings - Insomnia

O qual poderá ser importado para o Insomnia a fim de realizar o teste das rotas.

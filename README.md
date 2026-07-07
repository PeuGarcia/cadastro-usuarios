# Cadastro de Usuários
Sistema de cadastro de usuários desenvolvido como projeto de estudo, utilizando **HTML5, CSS3, JavaScript** e **Node.js com Express**. A aplicação permite realizar operações completas de CRUD (Create, Read, Update e Delete), armazenando os dados em um arquivo JSON por meio de uma API REST desenvolvida no Express.
Além disso, o sistema integra a API do ViaCEP para preenchimento automático do endereço a partir do CEP informado, tornando o cadastro mais rápido e intuitivo e um cálculo de validação de CPF de acordo com o algoritmo oficial de verificação.

## Funcionalidades
- Cadastro de usuários contendo:
    - Nome completo
    - E-mail
    - CPF
    - CEP
    - Rua
    - Bairro
    - Cidade
    - Estado

- Listagem de usuários cadastrados
- Visualização dos detalhes de cada usuário
- Edição de usuários
- Exclusão de usuários com confirmação
- Validação do CPF utilizando algoritmo oficial de verificação
- Validação para impedir cadastro de CPF duplicado
- Validação para impedir e-mail duplicado
- Máscaras automáticas para CPF e CEP
- Preenchimento automático do endereço através da API ViaCEP
- Persistência dos dados em arquivo `dados.json`
- API REST para gerenciamento dos usuários
- Reaproveitamento automático de IDs disponíveis após exclusões

## Tecnologias Utilizadas

### Front-end ###
- HTML5
- CSS3
- JavaScript

### Back-end ###
- Node.js
- Express.js

### APIs ###
- ViaCEP


## Estrutura do Projeto
```text
cadastro-usuarios/
│
├── img/
│ └── background.jpg 
│
├── dados.JSON
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
├── package-lock.json
└── README.md 

```

## Como Executar ##

### 1. Clone o repositório ###

```bash
https://github.com/PeuGarcia/cadastro-usuarios.git
```

### 2. Acesse a pasta do projeto ###

cd cadastro-usuarios

### 3. Instale as dependências ###

npm install

### 4. Inicie o servidor ###

node server.js

O servidor será iniciado em:

http://localhost:3000

Abra esse endereço no navegador para utilizar a aplicação.

## Endpoints da API ##
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/usuarios` | Lista com todos os usuários |
| **GET** | `/usuarios/:id` | Busca um usuário pelo ID |
| **POST** | `/usuarios` | Cadastra um novo usuário |
| **PUT** | `/usuarios/:id` | Atualiza um usuário |
| **DELETE** | `/usuarios/:id` | Remove um usuário |

## Validações Implementadas ##
- Campos obrigatórios
- Validação do formato do CPF
- Validação matemática do CPF
- Impede CPF duplicado
- Impede e-mail duplicado
- Validação do CEP
- Busca automática do endereço utilizando o ViaCEP

## API Utilizada
ViaCEP: `https://viacep.com.br`

## Autor
Desenvolvido por Pedro Garcia para praticar desenvolvimento web utilizando HTML, CSS, JavaScript, Node.js e Express.
 

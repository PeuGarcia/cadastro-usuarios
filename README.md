# Cadastro de Usuários
Desafio de cadastro de usuários. O projeto realiza cadastro, edição, exclusão e listagem de usuários, além de integração com a API ViaCEP para preenchimento automático de endereço através do CEP.
Desenvolvido utilizando HTML, CSS e Javascript puro.

## Tecnologias Utilizadas: 
- HTML5
- CSS3
- JavaScript
- API ViaCEP

## Como Executar 
1. Clonar o repositório

```bash
git clone https://github.com/PeuGarcia/cadastro-usuarios.git
```

2. Abrir o arquivo `index.html` no navegador

## Funcionalidades
- Cadastro de usuários com:
    - Nome completo
    - E-mail
    - CPF
    - CEP
    - Rua
    - Bairro
    - Cidade
    - Estado

- Visualização, edição e exclusão de usuários cadastrados
- Busca automática de endereço por CEP através da API ViaCEP
- Verifica se CPF é valido de acordo com o cálculo de CPF da receita federal.
- Adiciona máscara ao CPF e CEP ao terminar de digitar todos os números.
- Interface simples e responsiva
- CRUD completo: 
    - Criar usuário
    - Listar usuário
    - Visualizar detalhes
    - Editar usuários
    - Excluir usuários com confirmação

## Estrutura do Projeto
```text
cadastro-usuarios/
│
├── img
├── dados.JSON
├── index.html
├── style.css
├── script.js
├── README.md 

```

## API Utilizada
ViaCEP: `https://viacep.com.br`

## Autor
Projeto desenvolvido por Pedro Garcia.
 

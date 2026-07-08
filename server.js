const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const ARQUIVO = path.join(__dirname, 'dados.json');
const CAMPOS_PERMITIDOS = [
    "nome",
    "email",
    "cpf",
    "cep",
    "rua",
    "bairro",
    "cidade",
    "estado"
];

function lerDados() {
    try {
        const dados = fs.readFileSync(ARQUIVO, 'utf8');
        return JSON.parse(dados).usuarios || [];
    } catch (error) {
        return [];
    }
}

function salvarDados(dados) {
    fs.writeFileSync(ARQUIVO, JSON.stringify( { usuarios: dados},
    null, 4),
    'utf8'
    );
}

function validarCampos(objeto) {
    const camposRecebidos = Object.keys(objeto);

    return camposRecebidos.every(campo => {
        const valido = CAMPOS_PERMITIDOS.includes(campo);
        return valido;
    });
}

// READ - Listar todos
// GET /usuarios

app.get('/usuarios', (req, res) => {
    const dados = lerDados();
    res.json(dados);
});

// READ - Buscar por ID
// GET /usuarios/:id

app.get('/usuarios/:id', (req, res) => {
    const dados = lerDados();
    const usuario = dados.find(u => u.id === Number(req.params.id));

    if(!usuario) {
        return res.status(404).json({
            erro: 'Usuário não encontrado'
        });
    }

    res.json(usuario);
});

// CREATE
// POST /usuarios

app.post('/usuarios', (req, res) => {
    
    delete req.body.id;

    if (!validarCampos(req.body)) {
        return res.status(400).json({
            erro: "foram enviados campos inválidos"
        });
    }

    const dados = lerDados();

    let proximoId = 1;

    while (dados.some(usuario => usuario.id === proximoId)) {
        proximoId++;
    }

    const novoUsuario = {
        id: proximoId,
        nome: req.body.nome,
        email: req.body.email,
        cpf: req.body.cpf,
        cep: req.body.cep,
        rua: req.body.rua,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado
    };

    dados.push(novoUsuario);
    salvarDados(dados);

    res.status(201).json(novoUsuario);
});

// UPDATE
// PUT /usuarios/:id

app.put('/usuarios/:id', (req, res) => {

    delete req.body.id;

    if (!validarCampos(req.body)) {
        return res.status(400).json({
            erro: "Foram enviados campos inválidos"
        });
    }

    const dados = lerDados();

    const indice = dados.findIndex(
        u => u.id === Number(req.params.id
    ));

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Usuário não encontrado'
        });
    }

    dados[indice] = {
        ...req.body,
        id: dados[indice].id
    };

    salvarDados(dados);

    res.json(dados[indice]);
});

// DELETE
// DELETE /usuarios/:id

app.delete('/usuarios/:id', (req, res) => {
    const dados = lerDados();

    const novosDados = dados.filter(
        u => u.id !== Number(req.params.id)
    );

    if (novosDados.length === dados.length) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        }); 
    }

    salvarDados(novosDados);

    res.json({
        mensagem: "Usuário removido com sucesso"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


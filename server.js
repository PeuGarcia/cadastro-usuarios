const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const ARQUIVO = path.join(__dirname, 'dados.json');

function lerDados() {
    try {
        const dados = fs.readFileSync(ARQUIVO, 'utf8');
        return JSON.parse(dados).usuarios;
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
    const dados = lerDados();

    const novoUsuario = {
        ...req.body,
        id: Date.now()
    };

    dados.push(novoUsuario);
    salvarDados(dados);

    res.status(201).json(novoUsuario);
});

// UPDATE
// PUT /usuarios/:id

app.put('/usuarios/:id', (req, res) => {
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


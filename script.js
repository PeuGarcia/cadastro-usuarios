const formulario = document.getElementById('formCadastro');

const listaUsuarios = document.getElementById("listaUsuarios");

const botaoUsuarios = document.getElementById("botaoUsuarios");

const usuariosContainer = document.getElementById("usuariosContainer");


const cepInput = document.getElementById("cep");
const ruaInput = document.getElementById("rua");
const bairroInput = document.getElementById("bairro");
const cidadeInput = document.getElementById("cidade");
const estadoInput = document.getElementById("estado");

window.onload = carregarUsuarios;

cepInput.addEventListener("blur",async function() {
    const cep=cepInput.value.replace(/\D/g, "");

    if (cep.length !==8) {
        alert("CEP inválido. Digite um CEP com 8 digitos!");
        limparCampos();
        return;
    }

    try {
        console.log(cep);
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado.");
            limparCampos();
            return;
        }
        ruaInput.value=dados.logradouro;
        bairroInput.value=dados.bairro;
        cidadeInput.value=dados.localidade;
        estadoInput.value=dados.uf;

    } catch (error) {
        alert("Erro ao buscar CEP!");
        limparCampos();
    }

});

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        cpf: document.getElementById("cpf").value,
        cep: document.getElementById("cep").value,
        rua: ruaInput.value,
        bairro: bairroInput.value,
        cidade: cidadeInput.value,
        estado: estadoInput.value
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    carregarUsuarios();
    formulario.reset();
    limparCampos();
    alert("Usuário cadastrado com sucesso!");
});

botaoUsuarios.addEventListener("click", function() {
    const visivel = window.getComputedStyle(usuariosContainer).display !== "none";
    if (!visivel) {
        usuariosContainer.style.display = "block";
        botaoUsuarios.textContent = "Ocultar Usuários";
    } else {
        usuariosContainer.style.display = "none";
        botaoUsuarios.textContent = "Ver Usuários Cadastrados";
    }
});

function carregarUsuarios() {
    listaUsuarios.innerHTML = "";
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.forEach(function(usuario, index) {
        const card = document.createElement("div");
        card.classList.add("usuario-card");
        card.innerHTML = `
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Cidade/Estado:</strong> ${usuario.cidade} - ${usuario.estado}</p>
            <button onclick="verDetalhes(${index})">Ver Detalhes</button>
        `;
        listaUsuarios.appendChild(card);

    });
}

function verDetalhes(index) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    const usuario = usuarios[index];
    alert(`Nome: ${usuario.nome}\nEmail: ${usuario.email}\nCPF: ${usuario.cpf}\nCEP: ${usuario.cep}\nRua: ${usuario.rua}\nBairro: ${usuario.bairro}\nCidade: ${usuario.cidade}\nEstado: ${usuario.estado}`);
}



function limparCampos() {
    ruaInput.value="";
    bairroInput.value="";
    cidadeInput.value="";
    estadoInput.value=""; 
}




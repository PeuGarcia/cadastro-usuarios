//Formulário principal de cadastro.
const formulario = document.getElementById('formCadastro');

//Exibição da lista de usuários cadastrados.
const listaUsuarios = document.getElementById("listaUsuarios");

//Botão para mostrar ou ocultar a lista de usuários cadastrados.
const botaoUsuarios = document.getElementById("botaoUsuarios");

//Container que envolve a lista de usuários cadastrados.
const usuariosContainer = document.getElementById("usuariosContainer");


const cpfInput = document.getElementById("cpf");
cpfInput.addEventListener("input", function() {
    let cpf = cpfInput.value.replace(/\D/g, "");
    if (cpf.length > 11) {
        cpf = cpf.substring(0, 11);
    }
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    cpfInput.value = cpf;
});
//Campos de endereço que serão preenchidos automaticamente com base no CEP.
const cepInput = document.getElementById("cep");
    cepInput.addEventListener("input", function() {
        let cep = cepInput.value.replace(/\D/g, "");
        if (cep.length > 8) {
            cep = cep.substring(0, 8);
        }
        cep = cep.replace(/(\d{5})(\d{3})/, "$1-$2");
        cepInput.value = cep;
    });
const ruaInput = document.getElementById("rua");
const bairroInput = document.getElementById("bairro");
const cidadeInput = document.getElementById("cidade");
const estadoInput = document.getElementById("estado");

// Variável para armazenar o índice do usuário que está sendo editado. Se for null, significa que estamos criando um novo usuário.
let usuarioEditando = null;
let usuarios = [];

// Carrega os Usuários salvos ao iniciar a página.
window.onload = carregarUsuariosJson;

// Busca automaticamente os dados de endereço ao clicar fora do campo do CEP.
cepInput.addEventListener("blur",async function() {
    const cep=cepInput.value.replace(/\D/g, "");

    // Valida se o CEP possui exatamente 8 dígitos.
    if (cep.length !==8) {
        alert("CEP inválido. Digite um CEP com 8 digitos!");
        limparCampos();
        return;
    }

    try {
        console.log(cep);
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        // Verifica se o CEP que foi digitado existe.
        if (dados.erro) {
            alert("CEP não encontrado.");
            limparCampos();
            return;
        }
        // Preenche os campos de endereço automaticamente com os dados retornados pela API.
        ruaInput.value=dados.logradouro;
        bairroInput.value=dados.bairro;
        cidadeInput.value=dados.localidade;
        estadoInput.value=dados.uf;

    } catch (error) {
        // Trata falhas de comunicação com a API.
        alert("Erro ao buscar CEP!");
        limparCampos();
    }

});

// Cadastro e edição de usuários, com validação de campos e verificação de email único.
formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const usuario = {
        id: usuarioEditando !== null ? usuarioEditando : Date.now(),
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        cpf: document.getElementById("cpf").value,
        cep: document.getElementById("cep").value,
        rua: ruaInput.value,
        bairro: bairroInput.value,
        cidade: cidadeInput.value,
        estado: estadoInput.value
    };


    // Validação de nome
    if (usuario.nome.trim() === "") {
        alert("Nome é obrigatório!");
        return;
    }

    // Validação de CPF (11 Digitos)
    const cpfLimpo = usuario.cpf.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) {
        alert("CPF inválido. Digite um CPF com 11 dígitos!");
        return;
    }

    function ValidarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (/^(\d)\1{10}$/.test(cpf)) return false;
        var soma;
        var resto;
        soma = 0;
    if (cpf == "00000000000") return false;

    for (i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11))  resto = 0;
        if (resto != parseInt(cpf.substring(9, 10)) ) return false;

    soma = 0;
        for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(cpf.substring(10,11))) return false;
        return true;
    }

        var cpfValido = ValidarCPF(usuario.cpf);
        if (!cpfValido) {
        alert("CPF inválido! Por favor, digite um CPF válido.");
        return;
    }

    // Verifica se o CPF digitado já está sendo utilizado.
    const cpfExistente = usuarios.some(function(usuarioSalvo, index) {
        if (index === usuarioEditando) {
            return false;
        }
        return usuarioSalvo.cpf.replace(/\D/g, "") === cpfLimpo;
    });
    if (cpfExistente) {
        alert("Este CPF já está sendo utilizado! Por favor, utilize outro CPF para realizar o cadastro.");
        return;
    }


    // Verifica se o email digitado já está sendo utilizado.
    const emailDigitado = usuario.email.toLowerCase();
    const emailExistente = usuarios.some(function(usuarioSalvo, index) {
        // Permite que o usuário mantenha seu próprio email ao editar, mas impede que use um email de outro usuário.
        if (index === usuarioEditando) {
            return false;
        }
        return usuarioSalvo.email.toLowerCase() === emailDigitado;
    });
    if (emailExistente) {
        alert("Este e-mail já está sendo utilizado! Por favor, utilize outro e-mail para realizar o cadastro.");
        return;
    }

    // Atualiza o usuário existente ou adiciona um novo.
    if (usuarioEditando !== null) {
        const indice = usuarios.findIndex(usuario => usuario.id === usuarioEditando);
        usuarios[indice] = usuario;
        usuarioEditando = null;
    } else {
        usuarios.push(usuario);
    }
    // Salva a lista de usuários atualizada no localStorage e recarrega a exibição dos usuários.
    carregarUsuarios();
    formulario.reset();
    limparCampos();
    alert("Operação realizada com sucesso!");
});

// Mostra ou oculta a lista de usuários cadastrados.
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

async function carregarUsuariosJson() {
    try {
        const resposta = await fetch("dados.JSON");
        const dados = await resposta.json();

        usuarios = dados.usuarios;

        carregarUsuarios();
    } catch (error) {
       console.error("Erro ao carregar os dados dos usuários!", error);
    }
}


// Função que carrega todos os usuários cadastrados e os exibe na tela.
function carregarUsuarios() {
    listaUsuarios.innerHTML = "";
    usuarios.forEach(function(usuario, index) {
        const card = document.createElement("div");
        card.classList.add("usuario-card");
        card.innerHTML = `
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Cidade/Estado:</strong> ${usuario.cidade} - ${usuario.estado}</p>
            <button onclick="verDetalhes(${usuario.id})">Ver Detalhes</button>
            <button onclick="editarUsuario(${usuario.id})">Editar</button>
            <button onclick="excluirUsuario(${usuario.id})">Excluir</button>
        `;
        listaUsuarios.appendChild(card);

    });
}

// Função que exibe todos os detalhes do usuário selecionado.
function verDetalhes(id) {
    const usuario = usuarios.find(user => user.id === id);
    alert(`Nome: ${usuario.nome}\nEmail: ${usuario.email}\nCPF: ${usuario.cpf}\nCEP: ${usuario.cep}\nRua: ${usuario.rua}\nBairro: ${usuario.bairro}\nCidade: ${usuario.cidade}\nEstado: ${usuario.estado}`);
}

// Função que preenche o formulário com os dados do usuário selecionado para edição.
function editarUsuario(id) {
    const usuario = usuarios.find(user => user.id === id);
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("email").value = usuario.email;
    document.getElementById("cpf").value = usuario.cpf;
    document.getElementById("cep").value = usuario.cep;
    ruaInput.value = usuario.rua;
    bairroInput.value = usuario.bairro;
    cidadeInput.value = usuario.cidade;
    estadoInput.value = usuario.estado;
    usuarioEditando = id;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Função que exclui o usuário selecionado após confirmação do usuário.
function excluirUsuario(id) {
    const confirmar = confirm("Quer mesmo excluir este usuário?");

    if(!confirmar){
        return;
    }
    usuarios = usuarios.filter(user => user.id !== id);
    carregarUsuarios();
    alert("Usuário excluído com sucesso!");
}

// Função que limpa os campos de endereço do formulário.
function limparCampos() {
    ruaInput.value="";
    bairroInput.value="";
    cidadeInput.value="";
    estadoInput.value=""; 
}




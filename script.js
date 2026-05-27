const formulario = document.getElementById('formCadastro');

const cepInput = document.getElementById("cep");
const ruaInput = document.getElementById("rua");
const bairroInput = document.getElementById("bairro");
const cidadeInput = document.getElementById("cidade");
const estadoInput = document.getElementById("estado");

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

function limparCampos() {
    ruaInput.value="";
    bairroInput.value="";
    cidadeInput.value="";
    estadoInput.value=""; 
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Usuário cadastrado com sucesso!");
});

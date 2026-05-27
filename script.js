const formulario = document.getElementById('formCadastro');

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Usuário cadastrado com sucesso!");
});

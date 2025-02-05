// Obtendo elementos do DOM
const userForm = document.getElementById('userForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const userList = document.getElementById('userList');
const limparCamposBtn = document.getElementById('limparCampos');
const excluirTodosBtn = document.getElementById('excluirTodos');
const searchInput = document.getElementById('search');

// Função para carregar os usuários do Local Storage
function carregarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    userList.innerHTML = ''; // Limpa a lista de usuários antes de carregar novamente

    usuarios.forEach((usuario, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${usuario.nome} - ${usuario.email}</span>
            <button class="excluirBtn" data-index="${index}">Excluir</button>
        `;
        userList.appendChild(li);
    });
}

// Função para adicionar usuário
userForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = nomeInput.value;
    const email = emailInput.value;

    if (!nome || !email) return; // Verifica se ambos os campos estão preenchidos

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push({ nome, email });
    
    // Salva no Local Storage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Limpa os campos e recarrega a lista
    nomeInput.value = '';
    emailInput.value = '';
    carregarUsuarios();
});

// Limpar campos do formulário
limparCamposBtn.addEventListener('click', function() {
    nomeInput.value = '';
    emailInput.value = '';
});

// Excluir um usuário específico
userList.addEventListener('click', function(event) {
    if (event.target.classList.contains('excluirBtn')) {
        const index = event.target.dataset.index;
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.splice(index, 1); // Remove o usuário da lista
        localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Atualiza o Local Storage
        carregarUsuarios(); // Recarrega a lista
    }
});

// Excluir todos os usuários
excluirTodosBtn.addEventListener('click', function() {
    localStorage.removeItem('usuarios');
    carregarUsuarios();
});

// Função de pesquisa
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const filteredUsers = usuarios.filter(usuario => 
        usuario.nome.toLowerCase().includes(searchTerm) ||
        usuario.email.toLowerCase().includes(searchTerm)
    );
    
    // Recarrega a lista com os resultados filtrados
    userList.innerHTML = '';
    filteredUsers.forEach((usuario, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${usuario.nome} - ${usuario.email}</span>
            <button class="excluirBtn" data-index="${index}">Excluir</button>
        `;
        userList.appendChild(li);
    });
});

// Carregar os usuários ao carregar a página
document.addEventListener('DOMContentLoaded', carregarUsuarios);

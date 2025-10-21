// DENTRO DO SEU ARQUIVO script.js

// ... (sua configuração do Firebase aqui) ...
const auth = firebase.auth();
const database = firebase.database();

// ===================================
// FUNÇÃO DE LOGIN COM O GOOGLE
// ===================================
function loginComGoogle() {
    // 1. Cria o provedor de autenticação do Google
    const provider = new firebase.auth.GoogleAuthProvider();
    
    // 2. Inicia o processo de login em um popup
    auth.signInWithPopup(provider)
        .then((result) => {
            // 3. Login bem-sucedido! O Firebase te retorna os dados do usuário.
            const user = result.user;
            console.log("Usuário logado com sucesso:", user);
            console.log("Nome:", user.displayName);
            console.log("Email:", user.email);
            console.log("UID (ID único):", user.uid);

            // 4. Salva os dados do usuário no nosso banco de dados
            // Usamos o UID do Google como a chave principal
            const usuarioRef = database.ref('usuarios/' + user.uid);

            // O método .set() cria o usuário se ele não existir, ou sobrescreve se existir.
            // Para não apagar vitórias/derrotas antigas, você poderia usar .update() no futuro.
            usuarioRef.set({
                nome: user.displayName,      // Nome do perfil do Google
                avatar: user.photoURL,       // Foto de perfil do Google
                email: user.email,           // Email da conta do Google
                provedor: 'google.com',      // Para saber de onde ele veio
                vitorias: 0,
                derrotas: 0,
                empates: 0,
                pontos: 0
            }).then(() => {
                console.log("Dados do usuário salvos no banco de dados!");
                alert(`Bem-vindo(a), ${user.displayName}!`);
                
                // 5. Esconde a área de login e mostra a área do jogo
                document.querySelector('.area-login').style.display = 'none';
                document.getElementById('area-jogo').style.display = 'block';
            });

        })
        .catch((error) => {
            // Trata erros (ex: usuário fechou a janela de popup)
            console.error("Erro no login com Google:", error);
            alert("Falha ao fazer login: " + error.message);
        });
}

// ===================================
// CONECTANDO O BOTÃO À FUNÇÃO
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Pega o botão de login pelo ID que definimos no HTML
    const botaoLoginGoogle = document.getElementById('botao-login-google');
    
    // Verifica se o botão existe na página antes de adicionar o evento
    if (botaoLoginGoogle) {
        // Adiciona o "ouvinte" de clique. Quando o botão for clicado, a função loginComGoogle() será executada.
        botaoLoginGoogle.addEventListener('click', loginComGoogle);
    }
});

// ===================================
// OUVINTE PARA SABER SE O USUÁRIO JÁ ESTÁ LOGADO
// ===================================
// Este código é universal. Funciona para Google, Discord, Email, etc.
auth.onAuthStateChanged((user) => {
    if (user) {
        // Se o usuário já está logado (ao recarregar a página, por exemplo)
        console.log("Usuário já está logado:", user.displayName);
        document.querySelector('.area-login').style.display = 'none';
        document.getElementById('area-jogo').style.display = 'block';
    } else {
        // Ninguém está logado, mostra a área de login
        console.log("Nenhum usuário logado.");
        document.querySelector('.area-login').style.display = 'block';
        document.getElementById('area-jogo').style.display = 'none';
    }
});
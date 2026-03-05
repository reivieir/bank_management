// CONFIGURAÇÕES DO SEU PROJETO SUPABASE
const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_HNmFIWNwdpRErfaSj0TLjw_1CsHt94o';

const _auth = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fazerLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const erroDisplay = document.getElementById('mensagem-erro');

    // Limpa mensagens anteriores
    erroDisplay.style.display = 'none';
    console.log("Tentando login para:", email);

    try {
        const { data, error } = await _auth.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error("Erro retornado pelo Supabase:", error.message);
            erroDisplay.innerText = "Erro: " + error.message;
            erroDisplay.style.display = 'block';
            return;
        }

        if (data.user) {
            console.log("Login realizado com sucesso!", data.user);
            
            // Verifica se o e-mail é o seu master ou do domínio correto
            if (email === 'reinaldo.paulo@dex.co' || email.endsWith('@dex.co')) {
                // Redireciona para o painel principal
                // Certifique-se que o arquivo se chama index.html na mesma pasta
                window.location.href = 'index.html';
            } else {
                alert("Acesso negado: Domínio não autorizado.");
                await _auth.auth.signOut();
            }
        }
    } catch (err) {
        console.error("Erro inesperado no script:", err);
        alert("Ocorreu um erro técnico ao tentar logar.");
    }
}

// Função utilitária para verificar se já está logado ao abrir a tela de login
async function checarSessaoAtiva() {
    const { data: { session } } = await _auth.auth.getSession();
    if (session) {
        window.location.href = 'index.html';
    }
}

// Executa ao carregar a página de login
window.onload = checarSessaoAtiva;

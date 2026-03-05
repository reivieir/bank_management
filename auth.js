// CREDENCIAIS EXTRAÍDAS DAS SUAS IMAGENS
const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
const SUPABASE_KEY = 'COLE_AQUI_A_SUA_ANON_KEY_QUE_COMECA_COM_eyJhb'; 

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fazerLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const erroDisplay = document.getElementById('mensagem-erro');

    erroDisplay.style.display = 'none';

    try {
        const { data, error } = await _supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            erroDisplay.innerText = "Erro: " + error.message;
            erroDisplay.style.display = 'block';
            return;
        }

        if (data.user) {
            // Validação de segurança para o domínio da companhia
            if (email === 'reinaldo.paulo@dex.co' || email.endsWith('@dex.co')) {
                window.location.href = 'index.html';
            } else {
                alert("Acesso restrito a colaboradores autorizados.");
                await _supabase.auth.signOut();
            }
        }
    } catch (err) {
        alert("Erro técnico na conexão. Verifique o console (F12).");
    }
}

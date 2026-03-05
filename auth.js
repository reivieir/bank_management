const SUPABASE_URL = 'https://SUA_URL_AQUI.supabase.co';
const SUPABASE_KEY = 'SUA_ANON_KEY_AQUI';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fazerLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const erroDisplay = document.getElementById('mensagem-erro');

    // Validação de segurança: Apenas domínio da empresa
    if (!email.endsWith('@suaempresa.com.br')) {
        erroDisplay.innerText = "Acesso restrito a e-mails corporativos.";
        erroDisplay.style.display = 'block';
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        erroDisplay.innerText = "Credenciais inválidas. Tente novamente.";
        erroDisplay.style.display = 'block';
    } else {
        // Redireciona para o painel principal se o login for sucesso
        window.location.href = 'index.html';
    }
}

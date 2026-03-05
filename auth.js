// CREDENCIAIS EXTRAÍDAS DAS SUAS IMAGENS
const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwY3B1am1xbmp0YWx1cHh6cXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjI3ODMsImV4cCI6MjA4ODI5ODc4M30.TYVtILJNISNR3aDejRM5fsWKt9TuIHgN1dS2deVbQwQ'; 

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

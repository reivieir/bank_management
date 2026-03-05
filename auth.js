const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwY3B1am1xbmp0YWx1cHh6cXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjI3ODMsImV4cCI6MjA4ODI5ODc4M30.TYVtILJNISNR3aDejRM5fsWKt9TuIHgN1dS2deVbQwQ'; // <--- COLE AQUI A CHAVE LONGA

const _auth = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fazerLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const erroDisplay = document.getElementById('mensagem-erro');

    try {
        const { data, error } = await _auth.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            erroDisplay.innerText = "Erro: " + error.message;
            erroDisplay.style.display = 'block';
            return;
        }

        if (data.user) {
            // Redireciona para o dashboard
            window.location.href = 'index.html';
        }
    } catch (err) {
        alert("Erro técnico. Verifique a conexão com o Supabase.");
    }
}

const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwY3B1am1xbmp0YWx1cHh6cXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjI3ODMsImV4cCI6MjA4ODI5ODc4M30.TYVtILJNISNR3aDejRM5fsWKt9TuIHgN1dS2deVbQwQ'; // <--- COLE A CHAVE LONGA DA SUA FOTO

const _auth = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fazerLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('mensagem-erro');

    try {
        const { data, error } = await _auth.auth.signInWithPassword({ email, password });

        if (error) {
            msg.innerText = "Erro: " + error.message;
        } else {
            // Se o login der certo, ele vai para o index.html
            window.location.href = 'index.html';
        }
    } catch (e) {
        msg.innerText = "Erro de conexão.";
    }
}

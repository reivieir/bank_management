const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
// Use a chave Anon Key (Legacy) completa da sua imagem
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwY3B1am1xbmp0YWx1cHh6cXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjI3ODMsImV4cCI6MjA4ODI5ODc4M30.TYVtILJNISNR3aDejRM5fsWKt9TuIHgN1dS2deVbQwQ'; 

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fazerLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("Erro no Login: " + error.message);
    } else {
        // Redireciona para o painel principal
        window.location.href = 'index.html';
    }
}

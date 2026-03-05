const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
// A chave deve estar exatamente assim: 'CHAVE_AQUI'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwY3B1am1xbmp0YWx1cHh6cXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMDIzNjIsImV4cCI6MjA1NjY2MjM2Mn0.C-w6W307mXkG6rA369qD3y6m3R5y3m6m3R5y3m6m3R5y3m'; 

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fazerLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // O seu usuário reinaldo.paulo@dex.co já está confirmado
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("Erro no Login: " + error.message);
    } else {
        window.location.href = 'index.html';
    }
}

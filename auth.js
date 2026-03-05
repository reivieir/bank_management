const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
// A chave Anon Key (Legacy) deve estar exatamente entre aspas simples
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwY3B1am1xbmp0YWx1cHh6cXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMDIzNjIsImV4cCI6MjA1NjY2MjM2Mn0.C-w6W307mXkG6rA369qD3y6m3R5y3m6m3R5y3m6m3R5y3m'; 

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fazerLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('msg-erro');

    if (!email || !password) {
        alert("Preencha todos os campos.");
        return;
    }

    // Tenta realizar a autenticação
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });

    if (error) {
        msg.innerText = "Erro: " + error.message;
    } else {
        // Se der certo, envia para o index.html
        window.location.href = 'index.html';
    }
}

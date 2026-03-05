const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwY3B1am1xbmp0YWx1cHh6cXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjI3ODMsImV4cCI6MjA4ODI5ODc4M30.TYVtILJNISNR3aDejRM5fsWKt9TuIHgN1dS2deVbQwQ'; 

const _db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function carregarDados() {
    const { data, error } = await _db.from('gestao_acessos').select('*').order('created_at', {ascending: false});
    if (error) return;

    const corpo = document.getElementById('tabela-corpo');
    corpo.innerHTML = data.map(item => `
        <tr>
            <td>${item.operador_nome}</td>
            <td>${item.perfil}</td>
            <td>${item.usuario_login}</td>
            <td>${item.banco_nome}</td>
            <td>${new Date(item.data_inclusao).toLocaleDateString()}</td>
            <td><button onclick="bloquear('${item.id}')">bloquear</button></td>
        </tr>
    `).join('');
}

// Inicializa ao carregar
window.onload = carregarDados;

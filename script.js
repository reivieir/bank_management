const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwY3B1am1xbmp0YWx1cHh6cXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjI3ODMsImV4cCI6MjA4ODI5ODc4M30.TYVtILJNISNR3aDejRM5fsWKt9TuIHgN1dS2deVbQwQ'; 
const _db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function carregarDados(filtroBanco = null) {
    let query = _db.from('gestao_acessos').select('*');
    
    if (filtroBanco) query = query.eq('banco_nome', filtroBanco);

    const { data, error } = await query;

    if (error) {
        console.error("Erro 401: Verifique as chaves e o RLS no Supabase.");
        return;
    }

    const corpo = document.getElementById('tabela-corpo');
    corpo.innerHTML = data.map(item => `
        <tr>
            <td>${item.operador_nome}</td>
            <td>${item.perfil}</td>
            <td>${item.usuario_login}</td>
            <td>${item.banco_nome}</td>
            <td><button onclick="bloquear('${item.id}')">Bloquear</button></td>
        </tr>
    `).join('');
    
    document.getElementById('total-geral').innerText = data.length;
}

window.onload = () => carregarDados();

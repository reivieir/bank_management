const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwY3B1am1xbmp0YWx1cHh6cXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMDIzNjIsImV4cCI6MjA1NjY2MjM2Mn0.C-w6W307mXkG6rA369qD3y6m3R5y3m6m3R5y3m6m3R5y3m';

const _db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function carregarTabela() {
    console.log("Tentando ler dados...");
    
    // Busca os dados no banco
    const { data, error } = await _db.from('gestao_acessos').select('*');

    if (error) {
        console.error("Erro ao carregar:", error.message);
        return;
    }

    // Atualiza os indicadores (KPIs) do seu layout
    document.getElementById('total-geral').innerText = data.length;
    
    // Preenche a tabela
    const corpo = document.getElementById('tabela-corpo');
    corpo.innerHTML = data.map(item => `
        <tr>
            <td>${item.operador_nome || '-'}</td>
            <td>${item.perfil || '-'}</td>
            <td>${item.usuario_login || '-'}</td>
            <td>${item.banco_nome || '-'}</td>
            <td>${new Date(item.data_inclusao).toLocaleDateString()}</td>
            <td><button onclick="bloquear('${item.id}')">bloquear</button></td>
        </tr>
    `).join('');
}

window.onload = carregarTabela;

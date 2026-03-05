// Configurações de Acesso (Substitua pelos seus dados do Supabase)
const SUPABASE_URL = 'https://SUA_URL_AQUI.supabase.co';
const SUPABASE_KEY = 'SUA_ANON_KEY_AQUI';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Função para carregar os KPIs (Contadores no topo)
async function carregarIndicadores() {
    // Busca o total de registros
    const { count: total, error: errorTotal } = await supabase
        .from('gestao_acessos')
        .select('*', { count: 'exact', head: true });

    if (!errorTotal) {
        document.getElementById('total-geral').innerText = total;
    }

    // Busca o total por um banco específico (Exemplo: Bradesco)
    const { count: totalBanco, error: errorBanco } = await supabase
        .from('gestao_acessos')
        .select('*', { count: 'exact', head: true })
        .eq('banco_nome', 'Bradesco');

    if (!errorBanco) {
        document.getElementById('total-banco').innerText = totalBanco;
    }
}

// Função para listar os dados na tabela
async function listarAcessos() {
    const { data, error } = await supabase
        .from('gestao_acessos')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao buscar dados:', error);
        return;
    }

    const corpoTabela = document.getElementById('tabela-corpo');
    corpoTabela.innerHTML = ''; // Limpa a tabela antes de preencher

    data.forEach(item => {
        corpoTabela.innerHTML += `
            <tr>
                <td>${item.operador_nome}</td>
                <td>${item.perfil}</td>
                <td>${item.usuario_login}</td>
                <td>${item.banco_nome}</td>
                <td>${new Date(item.data_inclusao).toLocaleDateString('pt-BR')}</td>
                <td>
                    <a href="#" onclick="alert('Funcionalidade Master necessária')">alterar</a> - 
                    <a href="#">excluir</a> - 
                    <a href="#">bloquear</a>
                </td>
            </tr>
        `;
    });
}

// Inicializa o site
window.onload = () => {
    carregarIndicadores();
    listarAcessos();
};

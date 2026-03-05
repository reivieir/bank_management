// CONFIGURAÇÕES OFICIAIS DO SEU PROJETO
const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
// USE A ANON KEY (LEGACY) COMPLETA QUE COMEÇA COM eyJhbGci...
const SUPABASE_KEY = 'SUA_ANON_KEY_LEGACY_AQUI'; 

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 1. FUNÇÃO PARA CARREGAR DADOS E ATUALIZAR INDICADORES
async function carregarDashboard(bancoFiltro = null) {
    console.log("Carregando dados...");
    
    // Busca todos os registros para o Total Geral
    let { data, error } = await _supabase
        .from('gestao_acessos')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Erro ao buscar dados (401):", error.message);
        return;
    }

    // Atualiza o KPI Total Geral (como no seu layout)
    document.getElementById('total-geral').innerText = data.length;

    // Filtra por banco se houver seleção na barra lateral
    let dadosExibidos = data;
    if (bancoFiltro) {
        dadosExibidos = data.filter(item => item.banco_nome === bancoFiltro);
        document.getElementById('total-banco').innerText = dadosExibidos.length;
    }

    // Preenche a tabela de movimentações
    const corpoTabela = document.getElementById('tabela-corpo');
    corpoTabela.innerHTML = ''; // Limpa a tabela

    dadosExibidos.forEach(item => {
        corpoTabela.innerHTML += `
            <tr>
                <td>${item.operador_nome}</td>
                <td>${item.perfil}</td>
                <td>${item.usuario_login}</td>
                <td>${item.banco_nome}</td>
                <td>${new Date(item.data_inclusao).toLocaleDateString('pt-BR')}</td>
                <td>
                    <button onclick="bloquearAcesso('${item.id}')" style="color: red; cursor: pointer;">bloquear</button>
                </td>
            </tr>
        `;
    });
}

// 2. FUNÇÃO PARA INCLUIR NOVO USUÁRIO (MODAL)
async function salvarNovoAcesso() {
    const { data: { user } } = await _supabase.auth.getUser();
    
    const novoRegistro = {
        operador_nome: user.email, // Registra quem está logado
        perfil: document.getElementById('in-perfil').value,
        usuario_login: document.getElementById('in-login').value,
        banco_nome: document.getElementById('in-banco').value,
        email_gestor: document.getElementById('in-gestor').value,
        numero_chamado: document.getElementById('in-chamado').value,
        status: 'ativo'
    };

    const { error } = await _supabase.from('gestao_acessos').insert([novoRegistro]);

    if (error) {
        alert("Erro ao salvar: " + error.message);
    } else {
        alert("Acesso incluído com sucesso! O gestor será notificado.");
        fecharModal();
        carregarDashboard(); // Atualiza a tela automaticamente
    }
}

// 3. FUNÇÃO PARA BLOQUEAR ACESSO (AÇÃO DA TABELA)
async function bloquearAcesso(id) {
    if (confirm("Deseja realmente bloquear este acesso?")) {
        const { error } = await _supabase
            .from('gestao_acessos')
            .update({ status: 'bloqueado' })
            .eq('id', id);

        if (!error) carregarDashboard();
    }
}

// INICIALIZAÇÃO AO CARREGAR A PÁGINA
window.onload = () => {
    carregarDashboard();
};

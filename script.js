// CONFIGURAÇÕES DO SEU PROJETO SUPABASE
const SUPABASE_URL = 'https://spcpujmqnjtalupxzqpp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_HNmFIWNwdpRErfaSj0TLjw_1CsHt94o';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 1. VERIFICAÇÃO DE LOGIN E PERFIL
async function verificarSessao() {
    const { data: { user } } = await _supabase.auth.getUser();
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('user-email').innerText = user.email;

    // Se não for MASTER, esconde o botão de inclusão para segurança rígida
    const role = user.app_metadata.role;
    if (role !== 'master') {
        document.getElementById('btn-master').style.display = 'none';
        const acoes = document.querySelectorAll('.col-acao');
        acoes.forEach(a => a.style.display = 'none');
    }
}

// 2. CARREGAR INDICADORES (KPIs)
async function atualizarDashboard(banco = null) {
    // Total Geral
    const { count: total } = await _supabase.from('gestao_acessos').select('*', { count: 'exact', head: true });
    document.getElementById('qtd-total').innerText = total || 0;

    // Total por Banco
    let query = _supabase.from('gestao_acessos').select('*', { count: 'exact', head: true });
    if (banco) {
        query = query.eq('banco_nome', banco);
        document.getElementById('banco-nome').innerText = banco.toUpperCase();
    }
    const { count: totalB } = await query;
    document.getElementById('qtd-banco').innerText = totalB || 0;

    carregarTabela(banco);
}

// 3. LISTAR DADOS NA TABELA
async function carregarTabela(bancoFilter = null) {
    let query = _supabase.from('gestao_acessos').select('*').order('created_at', { ascending: false });
    
    if (bancoFilter) query = query.eq('banco_nome', bancoFilter);

    const { data, error } = await query;
    const corpo = document.getElementById('tabela-corpo');
    corpo.innerHTML = '';

    data.forEach(item => {
        corpo.innerHTML += `
            <tr>
                <td>${item.operador_nome}</td>
                <td>${item.perfil}</td>
                <td>${item.usuario_login}</td>
                <td>${item.banco_nome}</td>
                <td>${new Date(item.data_inclusao).toLocaleDateString('pt-BR')}</td>
                <td class="col-acao">
                    <button onclick="bloquear('${item.id}')">bloquear</button>
                </td>
            </tr>
        `;
    });
}

// 4. SALVAR E DISPARAR PROCESSO DE E-MAIL
async function salvarNovoAcesso() {
    const { data: { user } } = await _supabase.auth.getUser();
    
    const novoAcesso = {
        operador_nome: user.email.split('@')[0], // Pega o nome do e-mail
        perfil: document.getElementById('in-perfil').value,
        usuario_login: document.getElementById('in-login').value,
        banco_nome: document.getElementById('in-banco').value,
        email_gestor: document.getElementById('in-gestor').value,
        numero_chamado: document.getElementById('in-chamado').value
    };

    const { error } = await _supabase.from('gestao_acessos').insert([novoAcesso]);

    if (error) {
        alert("Erro ao salvar: " + error.message);
    } else {
        alert("Sucesso! O gestor será notificado sobre o chamado " + novoAcesso.numero_chamado);
        fecharModal();
        atualizarDashboard();
    }
}

// FUNÇÕES DE INTERFACE
function abrirModal() { document.getElementById('modal-incluir').style.display = 'flex'; }
function fecharModal() { document.getElementById('modal-incluir').style.display = 'none'; }
function filtrarPorBanco(nome) { atualizarDashboard(nome); }
async function deslogar() { await _supabase.auth.signOut(); window.location.href = 'login.html'; }

// INICIALIZAÇÃO
window.onload = () => {
    verificarSessao();
    atualizarDashboard();
};

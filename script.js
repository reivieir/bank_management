// --- FUNÇÕES DE INTERFACE ---
function abrirModal(id = null, dados = null) {
    document.getElementById('modal-usuario').style.display = 'flex';
    if (id) {
        document.getElementById('modal-titulo').innerText = "ALTERAR ACESSO";
        document.getElementById('edit-id').value = id;
        document.getElementById('op-nome').value = dados.nome;
        document.getElementById('op-perfil').value = dados.perfil;
        document.getElementById('op-login').value = dados.login;
        document.getElementById('op-banco').value = dados.banco;
    } else {
        document.getElementById('modal-titulo').innerText = "INCLUIR NOVO ACESSO";
        limparCampos();
    }
}

function fecharModal() {
    document.getElementById('modal-usuario').style.display = 'none';
}

function limparCampos() {
    document.getElementById('edit-id').value = '';
    document.getElementById('op-nome').value = '';
    document.getElementById('op-perfil').value = '';
    document.getElementById('op-login').value = '';
    document.getElementById('op-banco').value = '';
}

// --- OPERAÇÕES NO BANCO (SUPABASE) ---

async function salvarUsuario() {
    const id = document.getElementById('edit-id').value;
    const dados = {
        operador_nome: document.getElementById('op-nome').value,
        perfil: document.getElementById('op-perfil').value,
        usuario_login: document.getElementById('op-login').value,
        banco_nome: document.getElementById('op-banco').value
    };

    if (id) {
        // ALTERAÇÃO (Update)
        await _supabase.from('gestao_acessos').update(dados).eq('id', id);
    } else {
        // INCLUSÃO (Insert)
        await _supabase.from('gestao_acessos').insert([dados]);
    }

    fecharModal();
    carregarDados(); // Recarrega a tabela automaticamente
}

async function deletarUsuario(id) {
    if (confirm("Tem certeza que deseja excluir este acesso?")) {
        await _supabase.from('gestao_acessos').delete().eq('id', id);
        carregarDados();
    }
}

// Atualize sua função carregarDados para incluir os botões de Ação na tabela:
async function carregarDados() {
    const { data, error } = await _supabase.from('gestao_acessos').select('*');
    if (error) return;

    document.getElementById('total-geral').innerText = data.length;
    const corpo = document.getElementById('tabela-corpo');
    corpo.innerHTML = data.map(item => `
        <tr>
            <td>${item.operador_nome}</td>
            <td>${item.perfil}</td>
            <td>${item.usuario_login}</td>
            <td>${item.banco_nome}</td>
            <td>
                <button onclick='abrirModal("${item.id}", {nome: "${item.operador_nome}", perfil: "${item.perfil}", login: "${item.usuario_login}", banco: "${item.banco_nome}"})' style="color: blue; border: none; background: none; cursor: pointer;">Alterar</button>
                | 
                <button onclick="deletarUsuario('${item.id}')" style="color: red; border: none; background: none; cursor: pointer;">Excluir</button>
            </td>
        </tr>
    `).join('');
}

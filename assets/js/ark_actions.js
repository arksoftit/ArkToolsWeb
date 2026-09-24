async function renderArkActions() {
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = `
        <style>
            .ark-form-container { max-width: 900px; }
            .ark-form-container h2 { margin-bottom: 1rem; color: #1f3864; }
            .ark-grupo { background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 1rem; margin-bottom: 1rem; }
            .ark-grupo legend { font-weight: bold; color: #1f3864; padding: 0 0.5rem; }
            .ark-campo { display: flex; flex-direction: column; margin-bottom: 0.75rem; }
            .ark-campo label { font-size: 0.85rem; margin-bottom: 0.25rem; color: #555; }
            .ark-campo input, .ark-campo select, .ark-campo textarea {
                padding: 0.4rem; border: 1px solid #ccc; border-radius: 4px; font-size: 0.9rem;
            }
            .ark-campo input:read-only, .ark-campo input[disabled] { background: #e9ecef; }
            .ark-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem 1rem; }
            .ark-busqueda { display: flex; gap: 0.5rem; align-items: end; margin-bottom: 1rem; }
            .ark-busqueda input { flex: 1; padding: 0.4rem; border: 1px solid #ccc; border-radius: 4px; }
            .ark-tabla { width: 100%; border-collapse: collapse; margin-bottom: 1rem; background: #fff; }
            .ark-tabla th, .ark-tabla td { padding: 0.5rem; border: 1px solid #ddd; text-align: left; font-size: 0.85rem; }
            .ark-tabla th { background: #1f3864; color: #fff; }
            .ark-tabla tr.seleccionada { background: #d1e7ff; }
            .ark-tabla tr:hover { background: #f0f6ff; cursor: pointer; }
            .ark-barra { display: flex; gap: 0.5rem; flex-wrap: wrap; }
            .ark-barra button {
                padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;
                background: #1f3864; color: #fff; font-size: 0.9rem;
            }
            .ark-barra button:hover:not(:disabled) { background: #2a4a85; }
            .ark-barra button:disabled { background: #aaa; cursor: not-allowed; }
            .ark-barra .peligro { background: #b00020; }
            .ark-barra .peligro:hover:not(:disabled) { background: #8c0019; }
            .ark-mensaje { padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; font-size: 0.9rem; }
            .ark-mensaje.ok { background: #d4edda; color: #155724; }
            .ark-mensaje.error { background: #f8d7da; color: #721c24; }
        </style>
        <div class="ark-form-container">
            <h2>Acciones</h2>
            <div id="ark-mensaje" class="ark-mensaje" style="display:none;"></div>
            <form id="ark-form-actions" autocomplete="off">
                <fieldset class="ark-grupo">
                    <legend>Datos Generales</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="act_codigo">Código</label>
                            <input type="text" id="act_codigo" maxlength="30" required>
                        </div>
                        <div class="ark-campo">
                            <label for="act_status">Estado</label>
                            <select id="act_status">
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="act_descripcion">Descripción</label>
                            <input type="text" id="act_descripcion" maxlength="200">
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="act_descripciontec">Descripción Técnica</label>
                            <textarea id="act_descripciontec"></textarea>
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="id_category">Categoría</label>
                            <select id="id_category" required></select>
                        </div>
                        <div class="ark-campo">
                            <label for="act_fechacreacion">Fecha Creación</label>
                            <input type="text" id="act_fechacreacion" readonly>
                        </div>
                    </div>
                </fieldset>
            </form>
            <div class="ark-busqueda">
                <div class="ark-campo" style="margin:0; flex:1;">
                    <label for="input_buscar_codigo">Buscar por código</label>
                    <input type="text" id="input_buscar_codigo" placeholder="Código...">
                </div>
                <button type="button" id="btn_buscar" style="padding:0.4rem 1rem; background:#1f3864; color:#fff; border:none; border-radius:4px; cursor:pointer;">Buscar</button>
                <button type="button" id="btn_listar_todo" style="padding:0.4rem 1rem; background:#555; color:#fff; border:none; border-radius:4px; cursor:pointer;">Listar todo</button>
            </div>
            <table class="ark-tabla" id="tabla_registros">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div class="ark-barra">
                <button type="button" id="btn_incluir">Incluir</button>
                <button type="button" id="btn_guardar" disabled>Guardar</button>
                <button type="button" id="btn_editar" disabled>Editar</button>
                <button type="button" id="btn_cancelar" disabled>Cancelar</button>
                <button type="button" id="btn_borrar" class="peligro" disabled>Borrar</button>
            </div>
        </div>
    `;
    _ark_actions_init();
}

async function _ark_actions_init() {
    _ark_actions_estado('consulta');
    await _ark_actions_cargar_categorias();
    await _ark_actions_cargar('');
    document.getElementById('btn_buscar').addEventListener('click', () => {
        const codigo = document.getElementById('input_buscar_codigo').value.trim();
        _ark_actions_cargar(codigo);
    });
    document.getElementById('btn_listar_todo').addEventListener('click', () => {
        document.getElementById('input_buscar_codigo').value = '';
        _ark_actions_cargar('');
    });
    document.getElementById('input_buscar_codigo').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btn_buscar').click();
        }
    });
    document.getElementById('btn_incluir').addEventListener('click', _ark_actions_incluir);
    document.getElementById('btn_guardar').addEventListener('click', _ark_actions_guardar);
    document.getElementById('btn_editar').addEventListener('click', _ark_actions_editar);
    document.getElementById('btn_cancelar').addEventListener('click', _ark_actions_cancelar);
    document.getElementById('btn_borrar').addEventListener('click', _ark_actions_borrar);
}

async function _ark_actions_cargar_categorias() {
    try {
        const { data, error } = await supabaseClient
            .from('ark_action_categories')
            .select('cat_idauto, cat_codigo, cat_descripcion')
            .order('cat_codigo', { ascending: true });
        if (error) throw error;
        const sel = document.getElementById('id_category');
        sel.innerHTML = '<option value="">Seleccione...</option>';
        (data || []).forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.cat_idauto;
            opt.textContent = `${c.cat_codigo} - ${c.cat_descripcion ?? ''}`;
            sel.appendChild(opt);
        });
    } catch (err) {
        _ark_actions_mostrar_mensaje('Error al cargar categorías: ' + err.message, 'error');
    }
}

async function _ark_actions_cargar(filtroCodigo) {
    try {
        let query = supabaseClient
            .from('ark_actions')
            .select('act_idauto, act_codigo, act_descripcion, id_category, act_status')
            .order('act_codigo', { ascending: true });
        if (filtroCodigo) {
            query = query.ilike('act_codigo', `%${filtroCodigo}%`);
        }
        const { data, error } = await query;
        if (error) throw error;
        _ark_actions_pintar_tabla(data || []);
    } catch (err) {
        _ark_actions_mostrar_mensaje('Error al cargar: ' + err.message, 'error');
    }
}

function _ark_actions_pintar_tabla(filas) {
    const tbody = document.querySelector('#tabla_registros tbody');
    tbody.innerHTML = '';
    if (filas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#888;">Sin registros</td></tr>';
        return;
    }
    filas.forEach(f => {
        const tr = document.createElement('tr');
        tr.dataset.idauto = f.act_idauto;
        tr.dataset.row = JSON.stringify(f);
        tr.innerHTML = `
            <td>${f.act_codigo}</td>
            <td>${f.act_descripcion ?? ''}</td>
            <td>${f.id_category ?? ''}</td>
            <td>${f.act_status ? 'Activo' : 'Inactivo'}</td>
        `;
        tr.addEventListener('click', () => {
            document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
            tr.classList.add('seleccionada');
            _ark_actions_estado('seleccion');
        });
        tbody.appendChild(tr);
    });
}

function _ark_actions_estado(modo) {
    const btnInc = document.getElementById('btn_incluir');
    const btnGua = document.getElementById('btn_guardar');
    const btnEdi = document.getElementById('btn_editar');
    const btnCan = document.getElementById('btn_cancelar');
    const btnBor = document.getElementById('btn_borrar');
    const campos = document.querySelectorAll('#ark-form-actions input, #ark-form-actions select, #ark-form-actions textarea');
    if (modo === 'consulta') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = true;
        btnCan.disabled = true; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'act_fechacreacion') c.disabled = true; });
        _ark_actions_limpiar_form();
    } else if (modo === 'seleccion') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = false;
        btnCan.disabled = true; btnBor.disabled = false;
        campos.forEach(c => c.disabled = true);
    } else if (modo === 'edicion') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'act_codigo' && c.id !== 'act_fechacreacion') c.disabled = false; });
    } else if (modo === 'nuevo') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'act_fechacreacion') c.disabled = false; });
        _ark_actions_limpiar_form();
    }
}

function _ark_actions_limpiar_form() {
    document.getElementById('act_codigo').value = '';
    document.getElementById('act_descripcion').value = '';
    document.getElementById('act_descripciontec').value = '';
    document.getElementById('act_status').value = 'true';
    document.getElementById('id_category').value = '';
    document.getElementById('act_fechacreacion').value = '';
    document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
}

function _ark_actions_mostrar_mensaje(texto, tipo) {
    const el = document.getElementById('ark-mensaje');
    el.textContent = texto;
    el.className = 'ark-mensaje ' + (tipo || 'ok');
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

async function _ark_actions_usuario_auditoria() {
    const { data } = await supabaseClient.auth.getUser();
    return data.user ? data.user.email : 'WEB';
}

function _ark_actions_leer_form() {
    const valor = (id) => {
        const texto = document.getElementById(id).value.trim();
        return texto === '' ? null : texto;
    };
    return {
        act_codigo: valor('act_codigo'),
        act_descripcion: valor('act_descripcion'),
        act_descripciontec: valor('act_descripciontec'),
        act_status: document.getElementById('act_status').value === 'true',
        id_category: parseInt(document.getElementById('id_category').value, 10) || null,
    };
}

function _ark_actions_poblar_form(reg) {
    document.getElementById('act_codigo').value = reg.act_codigo ?? '';
    document.getElementById('act_descripcion').value = reg.act_descripcion ?? '';
    document.getElementById('act_descripciontec').value = reg.act_descripciontec ?? '';
    document.getElementById('act_status').value = String(reg.act_status);
    document.getElementById('id_category').value = String(reg.id_category ?? '');
    document.getElementById('act_fechacreacion').value = reg.act_fechacreacion ? new Date(reg.act_fechacreacion).toLocaleString() : '';
}

async function _ark_actions_cargar_registro(idauto) {
    const { data, error } = await supabaseClient
        .from('ark_actions')
        .select('*')
        .eq('act_idauto', idauto)
        .maybeSingle();
    if (error) throw error;
    return data;
}

function _ark_actions_incluir() {
    document.getElementById('ark-form-actions').dataset.idauto = '';
    _ark_actions_limpiar_form();
    _ark_actions_estado('nuevo');
}

async function _ark_actions_editar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    try {
        const reg = await _ark_actions_cargar_registro(tr.dataset.idauto);
        if (!reg) {
            _ark_actions_mostrar_mensaje('Registro no encontrado.', 'error');
            return;
        }
        document.getElementById('ark-form-actions').dataset.idauto = String(reg.act_idauto);
        _ark_actions_poblar_form(reg);
        _ark_actions_estado('edicion');
    } catch (err) {
        _ark_actions_mostrar_mensaje('Error al cargar el registro: ' + err.message, 'error');
    }
}

function _ark_actions_cancelar() {
    document.getElementById('ark-form-actions').dataset.idauto = '';
    _ark_actions_limpiar_form();
    _ark_actions_estado('consulta');
    _ark_actions_cargar('');
}

async function _ark_actions_guardar() {
    const form = document.getElementById('ark-form-actions');
    const idauto = form.dataset.idauto || '';
    const valores = _ark_actions_leer_form();
    if (!valores.act_codigo) {
        _ark_actions_mostrar_mensaje('El código es obligatorio.', 'error');
        return;
    }
    if (!valores.id_category) {
        _ark_actions_mostrar_mensaje('Debe seleccionar una categoría.', 'error');
        return;
    }
    try {
        const usuario = await _ark_actions_usuario_auditoria();
        if (idauto === '') {
            valores.act_namemachine = 'WEB';
            valores.act_usercreator = usuario;
            const { error } = await supabaseClient.from('ark_actions').insert(valores);
            if (error) throw error;
            _ark_actions_mostrar_mensaje('Registro insertado correctamente.');
        } else {
            valores.act_lastmachine = 'WEB';
            valores.act_userlastupdate = usuario;
            const { error } = await supabaseClient.from('ark_actions').update(valores).eq('act_idauto', idauto);
            if (error) throw error;
            _ark_actions_mostrar_mensaje('Registro actualizado correctamente.');
        }
        form.dataset.idauto = '';
        _ark_actions_limpiar_form();
        _ark_actions_estado('consulta');
        await _ark_actions_cargar('');
    } catch (err) {
        _ark_actions_mostrar_mensaje('Error al guardar: ' + err.message, 'error');
    }
}

async function _ark_actions_borrar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    if (!confirm('¿Desea eliminar el registro seleccionado?')) return;
    try {
        const { error } = await supabaseClient.from('ark_actions').delete().eq('act_idauto', tr.dataset.idauto);
        if (error) throw error;
        _ark_actions_mostrar_mensaje('Registro eliminado correctamente.');
        _ark_actions_limpiar_form();
        _ark_actions_estado('consulta');
        await _ark_actions_cargar('');
    } catch (err) {
        _ark_actions_mostrar_mensaje('Error al eliminar: ' + err.message, 'error');
    }
}
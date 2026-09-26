async function renderArkSessionsDetails() {
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
            .ark-campo textarea { resize: vertical; min-height: 60px; }
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
            <h2>Detalles de Sesiones</h2>
            <div id="ark-mensaje" class="ark-mensaje" style="display:none;"></div>
            <form id="ark-form-sessions-details" autocomplete="off">
                <fieldset class="ark-grupo">
                    <legend>Datos Generales</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="dts_ses_idauto">Sesión</label>
                            <select id="dts_ses_idauto"></select>
                        </div>
                        <div class="ark-campo">
                            <label for="dts_act_codigo">Acción</label>
                            <select id="dts_act_codigo"></select>
                        </div>
                        <div class="ark-campo">
                            <label for="dts_req_idauto">Solicitud</label>
                            <select id="dts_req_idauto"></select>
                        </div>
                        <div class="ark-campo">
                            <label for="dts_time_spent">Tiempo Invertido (min)</label>
                            <input type="number" id="dts_time_spent" min="0" step="0.01">
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="dts_description">Descripción</label>
                            <textarea id="dts_description"></textarea>
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="dts_result">Resultado</label>
                            <textarea id="dts_result"></textarea>
                        </div>
                        <div class="ark-campo">
                            <label for="dts_date_logged">Fecha Registrada</label>
                            <input type="datetime-local" id="dts_date_logged">
                        </div>
                        <div class="ark-campo">
                            <label for="dts_fechasesion">Fecha Sesión</label>
                            <input type="datetime-local" id="dts_fechasesion">
                        </div>
                    </div>
                </fieldset>
            </form>
            <div class="ark-busqueda">
                <div class="ark-campo" style="margin:0; flex:1;">
                    <label for="input_buscar_sesion">Buscar por sesión</label>
                    <input type="text" id="input_buscar_sesion" placeholder="ID Sesión...">
                </div>
                <button type="button" id="btn_buscar" style="padding:0.4rem 1rem; background:#1f3864; color:#fff; border:none; border-radius:4px; cursor:pointer;">Buscar</button>
                <button type="button" id="btn_listar_todo" style="padding:0.4rem 1rem; background:#555; color:#fff; border:none; border-radius:4px; cursor:pointer;">Listar todo</button>
            </div>
            <table class="ark-tabla" id="tabla_registros">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sesión</th>
                        <th>Acción</th>
                        <th>Tiempo (min)</th>
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
    _ark_sessions_details_init();
}

async function _ark_sessions_details_init() {
    _ark_sessions_details_estado('consulta');
    await _ark_sessions_details_cargar_sesiones();
    await _ark_sessions_details_cargar_acciones();
    await _ark_sessions_details_cargar_solicitudes();
    await _ark_sessions_details_cargar('');
    document.getElementById('btn_buscar').addEventListener('click', () => {
        const sesion = document.getElementById('input_buscar_sesion').value.trim();
        _ark_sessions_details_cargar(sesion);
    });
    document.getElementById('btn_listar_todo').addEventListener('click', () => {
        document.getElementById('input_buscar_sesion').value = '';
        _ark_sessions_details_cargar('');
    });
    document.getElementById('input_buscar_sesion').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btn_buscar').click();
        }
    });
    document.getElementById('btn_incluir').addEventListener('click', _ark_sessions_details_incluir);
    document.getElementById('btn_guardar').addEventListener('click', _ark_sessions_details_guardar);
    document.getElementById('btn_editar').addEventListener('click', _ark_sessions_details_editar);
    document.getElementById('btn_cancelar').addEventListener('click', _ark_sessions_details_cancelar);
    document.getElementById('btn_borrar').addEventListener('click', _ark_sessions_details_borrar);
}

async function _ark_sessions_details_cargar_sesiones() {
    try {
        const { data, error } = await supabaseClient
            .from('ark_sessions')
            .select('ses_idauto, ses_numero')
            .order('ses_numero', { ascending: true });
        if (error) throw error;
        const sel = document.getElementById('dts_ses_idauto');
        sel.innerHTML = '<option value="">Seleccione...</option>';
        (data || []).forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.ses_idauto;
            opt.textContent = c.ses_numero ?? '';
            sel.appendChild(opt);
        });
    } catch (err) {
        _ark_sessions_details_mostrar_mensaje('Error al cargar sesiones: ' + err.message, 'error');
    }
}

async function _ark_sessions_details_cargar_acciones() {
    try {
        const { data, error } = await supabaseClient
            .from('ark_actions')
            .select('act_idauto, act_codigo, act_descripcion')
            .order('act_codigo', { ascending: true });
        if (error) throw error;
        const sel = document.getElementById('dts_act_codigo');
        sel.innerHTML = '<option value="">Seleccione...</option>';
        (data || []).forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.act_idauto;
            opt.textContent = `${c.act_codigo} - ${c.act_descripcion ?? ''}`;
            sel.appendChild(opt);
        });
    } catch (err) {
        _ark_sessions_details_mostrar_mensaje('Error al cargar acciones: ' + err.message, 'error');
    }
}

async function _ark_sessions_details_cargar_solicitudes() {
    try {
        const { data, error } = await supabaseClient
            .from('ark_requests')
            .select('req_idauto, req_codigo, req_descripcion')
            .order('req_codigo', { ascending: true });
        if (error) throw error;
        const sel = document.getElementById('dts_req_idauto');
        sel.innerHTML = '<option value="">Seleccione...</option>';
        (data || []).forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.req_idauto;
            opt.textContent = `${c.req_codigo} - ${c.req_descripcion ?? ''}`;
            sel.appendChild(opt);
        });
    } catch (err) {
        _ark_sessions_details_mostrar_mensaje('Error al cargar solicitudes: ' + err.message, 'error');
    }
}

async function _ark_sessions_details_cargar(filtroSesion) {
    try {
        let query = supabaseClient
            .from('ark_sessions_details')
            .select('dts_idauto, dts_ses_idauto, dts_act_codigo, dts_time_spent')
            .order('dts_idauto', { ascending: true });
        if (filtroSesion) {
            query = query.eq('dts_ses_idauto', filtroSesion);
        }
        const { data, error } = await query;
        if (error) throw error;
        _ark_sessions_details_pintar_tabla(data || []);
    } catch (err) {
        _ark_sessions_details_mostrar_mensaje('Error al cargar: ' + err.message, 'error');
    }
}

function _ark_sessions_details_pintar_tabla(filas) {
    const tbody = document.querySelector('#tabla_registros tbody');
    tbody.innerHTML = '';
    if (filas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#888;">Sin registros</td></tr>';
        return;
    }
    filas.forEach(f => {
        const tr = document.createElement('tr');
        tr.dataset.idauto = f.dts_idauto;
        tr.dataset.row = JSON.stringify(f);
        tr.innerHTML = `
            <td>${f.dts_idauto}</td>
            <td>${f.dts_ses_idauto ?? ''}</td>
            <td>${f.dts_act_codigo ?? ''}</td>
            <td>${f.dts_time_spent ?? ''}</td>
        `;
        tr.addEventListener('click', () => {
            document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
            tr.classList.add('seleccionada');
            _ark_sessions_details_estado('seleccion');
        });
        tbody.appendChild(tr);
    });
}

function _ark_sessions_details_estado(modo) {
    const btnInc = document.getElementById('btn_incluir');
    const btnGua = document.getElementById('btn_guardar');
    const btnEdi = document.getElementById('btn_editar');
    const btnCan = document.getElementById('btn_cancelar');
    const btnBor = document.getElementById('btn_borrar');
    const campos = document.querySelectorAll('#ark-form-sessions-details input, #ark-form-sessions-details select, #ark-form-sessions-details textarea');
    if (modo === 'consulta') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = true;
        btnCan.disabled = true; btnBor.disabled = true;
        campos.forEach(c => c.disabled = true);
        _ark_sessions_details_limpiar_form();
    } else if (modo === 'seleccion') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = false;
        btnCan.disabled = true; btnBor.disabled = false;
        campos.forEach(c => c.disabled = true);
    } else if (modo === 'edicion') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => c.disabled = false);
    } else if (modo === 'nuevo') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => c.disabled = false);
        _ark_sessions_details_limpiar_form();
    }
}

function _ark_sessions_details_limpiar_form() {
    document.getElementById('dts_ses_idauto').value = '';
    document.getElementById('dts_act_codigo').value = '';
    document.getElementById('dts_req_idauto').value = '';
    document.getElementById('dts_time_spent').value = '';
    document.getElementById('dts_description').value = '';
    document.getElementById('dts_result').value = '';
    document.getElementById('dts_date_logged').value = '';
    document.getElementById('dts_fechasesion').value = '';
    document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
}

function _ark_sessions_details_mostrar_mensaje(texto, tipo) {
    const el = document.getElementById('ark-mensaje');
    el.textContent = texto;
    el.className = 'ark-mensaje ' + (tipo || 'ok');
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

async function _ark_sessions_details_usuario_auditoria() {
    const { data } = await supabaseClient.auth.getUser();
    return data.user ? data.user.email : 'WEB';
}

function _ark_sessions_details_leer_form() {
    const valor = (id) => {
        const texto = document.getElementById(id).value.trim();
        return texto === '' ? null : texto;
    };
    return {
        dts_ses_idauto: parseInt(document.getElementById('dts_ses_idauto').value, 10) || null,
        dts_act_codigo: parseInt(document.getElementById('dts_act_codigo').value, 10) || null,
        dts_req_idauto: parseInt(document.getElementById('dts_req_idauto').value, 10) || null,
        dts_time_spent: parseFloat(document.getElementById('dts_time_spent').value) || null,
        dts_description: valor('dts_description'),
        dts_result: valor('dts_result'),
        dts_date_logged: valor('dts_date_logged'),
        dts_fechasesion: valor('dts_fechasesion'),
    };
}

function _ark_sessions_details_poblar_form(reg) {
    document.getElementById('dts_ses_idauto').value = String(reg.dts_ses_idauto ?? '');
    document.getElementById('dts_act_codigo').value = String(reg.dts_act_codigo ?? '');
    document.getElementById('dts_req_idauto').value = String(reg.dts_req_idauto ?? '');
    document.getElementById('dts_time_spent').value = reg.dts_time_spent ?? '';
    document.getElementById('dts_description').value = reg.dts_description ?? '';
    document.getElementById('dts_result').value = reg.dts_result ?? '';
    document.getElementById('dts_date_logged').value = reg.dts_date_logged ? reg.dts_date_logged.slice(0, 16) : '';
    document.getElementById('dts_fechasesion').value = reg.dts_fechasesion ? reg.dts_fechasesion.slice(0, 16) : '';
}

async function _ark_sessions_details_cargar_registro(idauto) {
    const { data, error } = await supabaseClient
        .from('ark_sessions_details')
        .select('*')
        .eq('dts_idauto', idauto)
        .maybeSingle();
    if (error) throw error;
    return data;
}

function _ark_sessions_details_incluir() {
    document.getElementById('ark-form-sessions-details').dataset.idauto = '';
    _ark_sessions_details_limpiar_form();
    _ark_sessions_details_estado('nuevo');
}

async function _ark_sessions_details_editar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    try {
        const reg = await _ark_sessions_details_cargar_registro(tr.dataset.idauto);
        if (!reg) {
            _ark_sessions_details_mostrar_mensaje('Registro no encontrado.', 'error');
            return;
        }
        document.getElementById('ark-form-sessions-details').dataset.idauto = String(reg.dts_idauto);
        _ark_sessions_details_poblar_form(reg);
        _ark_sessions_details_estado('edicion');
    } catch (err) {
        _ark_sessions_details_mostrar_mensaje('Error al cargar el registro: ' + err.message, 'error');
    }
}

function _ark_sessions_details_cancelar() {
    document.getElementById('ark-form-sessions-details').dataset.idauto = '';
    _ark_sessions_details_limpiar_form();
    _ark_sessions_details_estado('consulta');
    _ark_sessions_details_cargar('');
}

async function _ark_sessions_details_guardar() {
    const form = document.getElementById('ark-form-sessions-details');
    const idauto = form.dataset.idauto || '';
    const valores = _ark_sessions_details_leer_form();
    if (!valores.dts_ses_idauto) {
        _ark_sessions_details_mostrar_mensaje('Debe seleccionar una sesión.', 'error');
        return;
    }
    try {
        const usuario = await _ark_sessions_details_usuario_auditoria();
        if (idauto === '') {
            valores.dts_namemachine = 'WEB';
            valores.dts_usercreator = usuario;
            const { error } = await supabaseClient.from('ark_sessions_details').insert(valores);
            if (error) throw error;
            _ark_sessions_details_mostrar_mensaje('Registro insertado correctamente.');
        } else {
            valores.dts_lastmachine = 'WEB';
            valores.dts_userlastupdate = usuario;
            const { error } = await supabaseClient.from('ark_sessions_details').update(valores).eq('dts_idauto', idauto);
            if (error) throw error;
            _ark_sessions_details_mostrar_mensaje('Registro actualizado correctamente.');
        }
        form.dataset.idauto = '';
        _ark_sessions_details_limpiar_form();
        _ark_sessions_details_estado('consulta');
        await _ark_sessions_details_cargar('');
    } catch (err) {
        _ark_sessions_details_mostrar_mensaje('Error al guardar: ' + err.message, 'error');
    }
}

async function _ark_sessions_details_borrar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    if (!confirm('¿Desea eliminar el registro seleccionado?')) return;
    try {
        const { error } = await supabaseClient.from('ark_sessions_details').delete().eq('dts_idauto', tr.dataset.idauto);
        if (error) throw error;
        _ark_sessions_details_mostrar_mensaje('Registro eliminado correctamente.');
        _ark_sessions_details_limpiar_form();
        _ark_sessions_details_estado('consulta');
        await _ark_sessions_details_cargar('');
    } catch (err) {
        _ark_sessions_details_mostrar_mensaje('Error al eliminar: ' + err.message, 'error');
    }
}
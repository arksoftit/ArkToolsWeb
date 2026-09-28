async function renderArkSessions() {
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
            <h2>Sesiones</h2>
            <div id="ark-mensaje" class="ark-mensaje" style="display:none;"></div>
            <form id="ark-form-sessions" autocomplete="off">
                <fieldset class="ark-grupo">
                    <legend>Datos Generales</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="ses_numero">Número</label>
                            <input type="text" id="ses_numero" maxlength="12" readonly>
                        </div>
                        <div class="ark-campo">
                            <label for="ses_status">Estado</label>
                            <select id="ses_status">
                                <option value="ACTIVA">Activa</option>
                                <option value="CERRADA">Cerrada</option>
                                <option value="CANCELADA">Cancelada</option>
                            </select>
                        </div>
                        <div class="ark-campo">
                            <label for="ses_clt_idauto">Cliente</label>
                            <select id="ses_clt_idauto"></select>
                        </div>
                        <div class="ark-campo">
                            <label for="ses_usr_idauto">Usuario</label>
                            <select id="ses_usr_idauto"></select>
                        </div>
                        <div class="ark-campo">
                            <label for="ses_fechaemision">Fecha Emisión</label>
                            <input type="datetime-local" id="ses_fechaemision">
                        </div>
                        <div class="ark-campo">
                            <label for="ses_fechahorainicial">Fecha/Hora Inicial</label>
                            <input type="datetime-local" id="ses_fechahorainicial">
                        </div>
                        <div class="ark-campo">
                            <label for="ses_fechahorafinal">Fecha/Hora Final</label>
                            <input type="datetime-local" id="ses_fechahorafinal">
                        </div>
                        <div class="ark-campo">
                            <label for="ses_totalhora">Total Horas</label>
                            <input type="number" id="ses_totalhora" min="0">
                        </div>
                    </div>
                </fieldset>
            </form>
            <div style="text-align: center; margin: 1rem 0;">
                <button type="button" id="btn_incluir_detalle" style="padding: 0.6rem 2rem; background: #28a745; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: bold; min-width: 300px;">Detalles de la sesión</button>
            </div>
            <div class="ark-busqueda">
                <div class="ark-campo" style="margin:0; flex:1;">
                    <label for="input_buscar_codigo">Buscar por número</label>
                    <input type="text" id="input_buscar_codigo" placeholder="Número...">
                </div>
                <button type="button" id="btn_buscar" style="padding:0.4rem 1rem; background:#1f3864; color:#fff; border:none; border-radius:4px; cursor:pointer;">Buscar</button>
                <button type="button" id="btn_listar_todo" style="padding:0.4rem 1rem; background:#555; color:#fff; border:none; border-radius:4px; cursor:pointer;">Listar todo</button>
            </div>
            <table class="ark-tabla" id="tabla_registros">
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Cliente</th>
                        <th>Usuario</th>
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
    _ark_sessions_init();
}

async function _ark_sessions_init() {
    _ark_sessions_estado('consulta');
    await _ark_sessions_cargar_clientes();
    await _ark_sessions_cargar_usuarios();
    await _ark_sessions_cargar('');
    document.getElementById('btn_buscar').addEventListener('click', () => {
        const codigo = document.getElementById('input_buscar_codigo').value.trim();
        _ark_sessions_cargar(codigo);
    });
    document.getElementById('btn_listar_todo').addEventListener('click', () => {
        document.getElementById('input_buscar_codigo').value = '';
        _ark_sessions_cargar('');
    });
    document.getElementById('input_buscar_codigo').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btn_buscar').click();
        }
    });
    document.getElementById('btn_incluir').addEventListener('click', _ark_sessions_incluir);
    document.getElementById('btn_guardar').addEventListener('click', _ark_sessions_guardar);
    document.getElementById('btn_editar').addEventListener('click', _ark_sessions_editar);
    document.getElementById('btn_cancelar').addEventListener('click', _ark_sessions_cancelar);
    document.getElementById('btn_borrar').addEventListener('click', _ark_sessions_borrar);
    document.getElementById('btn_incluir_detalle').addEventListener('click', _ark_sessions_abrir_detalles);
}

async function _ark_sessions_obtener_codigo_empresa() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return null;
    try {
        const { data: userData } = await supabaseClient
            .from('ark_users')
            .select('usr_emp_idauto')
            .eq('usr_login', user.email)
            .maybeSingle();
        if (!userData || !userData.usr_emp_idauto) return null;
        const { data: companyData } = await supabaseClient
            .from('ark_company')
            .select('emp_codigo')
            .eq('emp_idauto', userData.usr_emp_idauto)
            .maybeSingle();
        return companyData ? companyData.emp_codigo : null;
    } catch (err) {
        return null;
    }
}

async function _ark_sessions_generar_numero() {
    const empCodigo = await _ark_sessions_obtener_codigo_empresa();
    if (!empCodigo) {
        throw new Error('No se pudo determinar la empresa del usuario.');
    }
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const prefijo = `${anio}${mes}${dia}`;
    const { data: corrData, error: corrError } = await supabaseClient
        .from('ark_correlatives')
        .select('cor_proximo')
        .eq('cor_modname', 'ark_sessions')
        .eq('cor_emp_codigo', empCodigo)
        .maybeSingle();
    if (corrError) throw corrError;
    let correlativo = 1;
    if (corrData) {
        correlativo = corrData.cor_proximo;
        const { error: updateError } = await supabaseClient
            .from('ark_correlatives')
            .update({ cor_proximo: correlativo + 1, cor_fechaultimaactualizacion: new Date().toISOString() })
            .eq('cor_modname', 'ark_sessions')
            .eq('cor_emp_codigo', empCodigo);
        if (updateError) throw updateError;
    } else {
        const { error: insertError } = await supabaseClient
            .from('ark_correlatives')
            .insert({ cor_modname: 'ark_sessions', cor_proximo: 2, cor_emp_codigo: empCodigo });
        if (insertError) throw insertError;
    }
    const correlativoStr = String(correlativo).padStart(4, '0');
    return `${prefijo}${correlativoStr}`;
}

async function _ark_sessions_cargar_clientes() {
    try {
        const { data, error } = await supabaseClient
            .from('ark_clients')
            .select('clt_idauto, clt_codigo, clt_descripcion')
            .order('clt_codigo', { ascending: true });
        if (error) throw error;
        const sel = document.getElementById('ses_clt_idauto');
        sel.innerHTML = '<option value="">Seleccione...</option>';
        (data || []).forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.clt_idauto;
            opt.textContent = `${c.clt_codigo} - ${c.clt_descripcion ?? ''}`;
            sel.appendChild(opt);
        });
    } catch (err) {
        _ark_sessions_mostrar_mensaje('Error al cargar clientes: ' + err.message, 'error');
    }
}

async function _ark_sessions_cargar_usuarios() {
    try {
        const { data, error } = await supabaseClient
            .from('ark_users')
            .select('usr_idauto, usr_codigo, usr_descripcion')
            .order('usr_codigo', { ascending: true });
        if (error) throw error;
        const sel = document.getElementById('ses_usr_idauto');
        sel.innerHTML = '<option value="">Seleccione...</option>';
        (data || []).forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.usr_idauto;
            opt.textContent = `${c.usr_codigo} - ${c.usr_descripcion ?? ''}`;
            sel.appendChild(opt);
        });
    } catch (err) {
        _ark_sessions_mostrar_mensaje('Error al cargar usuarios: ' + err.message, 'error');
    }
}

async function _ark_sessions_cargar(filtroCodigo) {
    try {
        let query = supabaseClient
            .from('ark_sessions')
            .select('ses_idauto, ses_numero, ses_clt_idauto, ses_usr_idauto, ses_status')
            .order('ses_numero', { ascending: true });
        if (filtroCodigo) {
            query = query.ilike('ses_numero', `%${filtroCodigo}%`);
        }
        const { data, error } = await query;
        if (error) throw error;
        _ark_sessions_pintar_tabla(data || []);
    } catch (err) {
        _ark_sessions_mostrar_mensaje('Error al cargar: ' + err.message, 'error');
    }
}

function _ark_sessions_pintar_tabla(filas) {
    const tbody = document.querySelector('#tabla_registros tbody');
    tbody.innerHTML = '';
    if (filas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#888;">Sin registros</td></tr>';
        return;
    }
    filas.forEach(f => {
        const tr = document.createElement('tr');
        tr.dataset.idauto = f.ses_idauto;
        tr.dataset.row = JSON.stringify(f);
        tr.innerHTML = `
            <td>${f.ses_numero ?? ''}</td>
            <td>${f.ses_clt_idauto ?? ''}</td>
            <td>${f.ses_usr_idauto ?? ''}</td>
            <td>${f.ses_status ?? ''}</td>
        `;
        tr.addEventListener('click', () => {
            document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
            tr.classList.add('seleccionada');
            _ark_sessions_estado('seleccion');
        });
        tbody.appendChild(tr);
    });
}

function _ark_sessions_estado(modo) {
    const btnInc = document.getElementById('btn_incluir');
    const btnGua = document.getElementById('btn_guardar');
    const btnEdi = document.getElementById('btn_editar');
    const btnCan = document.getElementById('btn_cancelar');
    const btnBor = document.getElementById('btn_borrar');
    const btnDet = document.getElementById('btn_incluir_detalle');
    const campos = document.querySelectorAll('#ark-form-sessions input, #ark-form-sessions select, #ark-form-sessions textarea');
    if (modo === 'consulta') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = true;
        btnCan.disabled = true; btnBor.disabled = true;
        campos.forEach(c => c.disabled = true);
        _ark_sessions_limpiar_form();
    } else if (modo === 'seleccion') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = false;
        btnCan.disabled = true; btnBor.disabled = false; btnDet.disabled = false;
        campos.forEach(c => c.disabled = true);
    } else if (modo === 'edicion') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true; btnDet.disabled = false;
        campos.forEach(c => { if (c.id !== 'ses_numero') c.disabled = false; });
    } else if (modo === 'nuevo') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true; 
        campos.forEach(c => c.disabled = false);
        document.getElementById('ses_numero').disabled = true;
    }
}

function _ark_sessions_limpiar_form() {
    document.getElementById('ses_numero').value = '';
    document.getElementById('ses_status').value = 'ACTIVA';
    document.getElementById('ses_clt_idauto').value = '';
    document.getElementById('ses_usr_idauto').value = '';
    document.getElementById('ses_fechaemision').value = '';
    document.getElementById('ses_fechahorainicial').value = '';
    document.getElementById('ses_fechahorafinal').value = '';
    document.getElementById('ses_totalhora').value = '';
    document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
}

function _ark_sessions_mostrar_mensaje(texto, tipo) {
    const el = document.getElementById('ark-mensaje');
    el.textContent = texto;
    el.className = 'ark-mensaje ' + (tipo || 'ok');
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

async function _ark_sessions_usuario_auditoria() {
    const { data } = await supabaseClient.auth.getUser();
    return data.user ? data.user.email : 'WEB';
}

function _ark_sessions_leer_form() {
    const valor = (id) => {
        const texto = document.getElementById(id).value.trim();
        return texto === '' ? null : texto;
    };
    return {
        ses_numero: valor('ses_numero'),
        ses_status: valor('ses_status'),
        ses_clt_idauto: parseInt(document.getElementById('ses_clt_idauto').value, 10) || null,
        ses_usr_idauto: parseInt(document.getElementById('ses_usr_idauto').value, 10) || null,
        ses_fechaemision: valor('ses_fechaemision'),
        ses_fechahorainicial: valor('ses_fechahorainicial'),
        ses_fechahorafinal: valor('ses_fechahorafinal'),
        ses_totalhora: parseInt(document.getElementById('ses_totalhora').value, 10) || null,
    };
}

function _ark_sessions_poblar_form(reg) {
    document.getElementById('ses_numero').value = reg.ses_numero ?? '';
    document.getElementById('ses_status').value = reg.ses_status ?? 'ACTIVA';
    document.getElementById('ses_clt_idauto').value = String(reg.ses_clt_idauto ?? '');
    document.getElementById('ses_usr_idauto').value = String(reg.ses_usr_idauto ?? '');
    document.getElementById('ses_fechaemision').value = reg.ses_fechaemision ? reg.ses_fechaemision.slice(0, 16) : '';
    document.getElementById('ses_fechahorainicial').value = reg.ses_fechahorainicial ? reg.ses_fechahorainicial.slice(0, 16) : '';
    document.getElementById('ses_fechahorafinal').value = reg.ses_fechahorafinal ? reg.ses_fechahorafinal.slice(0, 16) : '';
    document.getElementById('ses_totalhora').value = reg.ses_totalhora ?? '';
}

async function _ark_sessions_cargar_registro(idauto) {
    const { data, error } = await supabaseClient
        .from('ark_sessions')
        .select('*')
        .eq('ses_idauto', idauto)
        .maybeSingle();
    if (error) throw error;
    return data;
}

async function _ark_sessions_incluir() {
    try {
        const numero = await _ark_sessions_generar_numero();
        document.getElementById('ark-form-sessions').dataset.idauto = '';
        _ark_sessions_limpiar_form();
        document.getElementById('ses_numero').value = numero;
        _ark_sessions_estado('nuevo');
    } catch (err) {
        _ark_sessions_mostrar_mensaje('Error al generar número: ' + err.message, 'error');
    }
}

async function _ark_sessions_editar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    try {
        const reg = await _ark_sessions_cargar_registro(tr.dataset.idauto);
        if (!reg) {
            _ark_sessions_mostrar_mensaje('Registro no encontrado.', 'error');
            return;
        }
        document.getElementById('ark-form-sessions').dataset.idauto = String(reg.ses_idauto);
        _ark_sessions_poblar_form(reg);
        _ark_sessions_estado('edicion');
    } catch (err) {
        _ark_sessions_mostrar_mensaje('Error al cargar el registro: ' + err.message, 'error');
    }
}

function _ark_sessions_cancelar() {
    document.getElementById('ark-form-sessions').dataset.idauto = '';
    _ark_sessions_limpiar_form();
    _ark_sessions_estado('consulta');
    _ark_sessions_cargar('');
}

async function _ark_sessions_guardar() {
    const form = document.getElementById('ark-form-sessions');
    const idauto = form.dataset.idauto || '';
    const valores = _ark_sessions_leer_form();
    if (!valores.ses_numero) {
        _ark_sessions_mostrar_mensaje('El número es obligatorio.', 'error');
        return;
    }
    try {
        const usuario = await _ark_sessions_usuario_auditoria();
        if (idauto === '') {
            valores.ses_namemachine = 'WEB';
            valores.ses_usercreator = usuario;
            const { error } = await supabaseClient.from('ark_sessions').insert(valores);
            if (error) throw error;
            _ark_sessions_mostrar_mensaje('Registro insertado correctamente.');
        } else {
            valores.ses_lastmachine = 'WEB';
            valores.ses_userlastupdate = usuario;
            const { error } = await supabaseClient.from('ark_sessions').update(valores).eq('ses_idauto', idauto);
            if (error) throw error;
            _ark_sessions_mostrar_mensaje('Registro actualizado correctamente.');
        }
        form.dataset.idauto = '';
        _ark_sessions_limpiar_form();
        _ark_sessions_estado('consulta');
        await _ark_sessions_cargar('');
    } catch (err) {
        _ark_sessions_mostrar_mensaje('Error al guardar: ' + err.message, 'error');
    }
}

async function _ark_sessions_borrar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    if (!confirm('¿Desea eliminar el registro seleccionado?')) return;
    try {
        const { error } = await supabaseClient.from('ark_sessions').delete().eq('ses_idauto', tr.dataset.idauto);
        if (error) throw error;
        _ark_sessions_mostrar_mensaje('Registro eliminado correctamente.');
        _ark_sessions_limpiar_form();
        _ark_sessions_estado('consulta');
        await _ark_sessions_cargar('');
    } catch (err) {
        _ark_sessions_mostrar_mensaje('Error al eliminar: ' + err.message, 'error');
    }
}

function _ark_sessions_abrir_detalles() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) {
        _ark_sessions_mostrar_mensaje('Debe seleccionar una sesión en la tabla antes de abrir los detalles.', 'error');
        return;
    }
    const ses_idauto = tr.dataset.idauto;
    const overlay = document.createElement('div');
    overlay.id = 'ark-modal-overlay';
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; justify-content: center; align-items: center;';
    const modal = document.createElement('div');
    modal.style.cssText = 'background: #fff; border-radius: 8px; padding: 2rem; max-width: 90%; max-height: 90%; overflow-y: auto; position: relative; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
    const btnCerrar = document.createElement('button');
    btnCerrar.textContent = '';
    btnCerrar.style.cssText = 'position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #333;';
    btnCerrar.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    const contenedor = document.createElement('div');
    contenedor.id = 'ark-modal-contenido';
    modal.appendChild(btnCerrar);
    modal.appendChild(contenedor);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    renderArkSessionsDetailsModal(ses_idauto);
}
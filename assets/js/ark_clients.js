async function renderArkClients() {
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
            <h2>Clientes</h2>
            <div id="ark-mensaje" class="ark-mensaje" style="display:none;"></div>
            <form id="ark-form-clientes" autocomplete="off">
                <fieldset class="ark-grupo">
                    <legend>Datos Generales</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="clt_codigo">Código</label>
                            <input type="text" id="clt_codigo" maxlength="30" required>
                        </div>
                        <div class="ark-campo">
                            <label for="clt_status">Estado</label>
                            <select id="clt_status">
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="clt_descripcion">Razón Social</label>
                            <input type="text" id="clt_descripcion" maxlength="200">
                        </div>
                        <div class="ark-campo">
                            <label for="clt_idfiscal">ID Fiscal (RIF)</label>
                            <input type="text" id="clt_idfiscal" maxlength="20">
                        </div>
                        <div class="ark-campo">
                            <label for="clt_tipocontribuyente">Tipo Contribuyente</label>
                            <select id="clt_tipocontribuyente">
                                <option value="0">Ordinario</option>
                                <option value="1">Especial</option>
                            </select>
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="clt_origen">Compañía (Origen)</label>
                            <select id="clt_origen" required></select>
                        </div>
                    </div>
                </fieldset>
                <fieldset class="ark-grupo">
                    <legend>Dirección y Teléfonos</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="clt_direccionf">Dirección Fiscal</label>
                            <textarea id="clt_direccionf"></textarea>
                        </div>
                        <div class="ark-campo">
                            <label for="clt_direccionl">Dirección Local</label>
                            <textarea id="clt_direccionl"></textarea>
                        </div>
                        <div class="ark-campo">
                            <label for="clt_telefono1">Teléfono Principal</label>
                            <input type="text" id="clt_telefono1" maxlength="40">
                        </div>
                        <div class="ark-campo">
                            <label for="clt_telefono2">Teléfono Móvil</label>
                            <input type="text" id="clt_telefono2" maxlength="40">
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="clt_emailempresa">Email Empresa</label>
                            <input type="email" id="clt_emailempresa" maxlength="100">
                        </div>
                    </div>
                </fieldset>
                <fieldset class="ark-grupo">
                    <legend>Contactos</legend>
                    <div class="ark-grid">
                        <div class="ark-campo" style="grid-column: 1 / 3;">
                            <label for="clt_representante">Representante Legal</label>
                            <input type="text" id="clt_representante" maxlength="100">
                        </div>
                        <div class="ark-campo">
                            <label for="clt_idrepresentante">Cédula</label>
                            <input type="text" id="clt_idrepresentante" maxlength="20">
                        </div>
                        <div class="ark-campo">
                            <label for="clt_telefonocontacto">Teléfono Contacto</label>
                            <input type="text" id="clt_telefonocontacto" maxlength="40">
                        </div>
                        <div class="ark-campo">
                            <label for="clt_emailcontacto">Email Contacto</label>
                            <input type="email" id="clt_emailcontacto" maxlength="100">
                        </div>
                        <div class="ark-campo">
                            <label for="clt_fechacreacion">Fecha Creación</label>
                            <input type="text" id="clt_fechacreacion" readonly>
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
                        <th>Razón Social</th>
                        <th>ID Fiscal</th>
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
    _ark_clients_init();
}

async function _ark_clients_init() {
    _ark_clients_estado('consulta');
    await _ark_clients_cargar_companias();
    await _ark_clients_cargar('');
    document.getElementById('btn_buscar').addEventListener('click', () => {
        const codigo = document.getElementById('input_buscar_codigo').value.trim();
        _ark_clients_cargar(codigo);
    });
    document.getElementById('btn_listar_todo').addEventListener('click', () => {
        document.getElementById('input_buscar_codigo').value = '';
        _ark_clients_cargar('');
    });
    document.getElementById('input_buscar_codigo').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btn_buscar').click();
        }
    });
    document.getElementById('btn_incluir').addEventListener('click', _ark_clients_incluir);
    document.getElementById('btn_guardar').addEventListener('click', _ark_clients_guardar);
    document.getElementById('btn_editar').addEventListener('click', _ark_clients_editar);
    document.getElementById('btn_cancelar').addEventListener('click', _ark_clients_cancelar);
    document.getElementById('btn_borrar').addEventListener('click', _ark_clients_borrar);
}

async function _ark_clients_cargar_companias() {
    try {
        const { data, error } = await supabaseClient
            .from('ark_company')
            .select('emp_idauto, emp_codigo, emp_descripcion')
            .order('emp_codigo', { ascending: true });
        if (error) throw error;
        const sel = document.getElementById('clt_origen');
        sel.innerHTML = '<option value="">Seleccione...</option>';
        (data || []).forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.emp_idauto;
            opt.textContent = `${c.emp_codigo} - ${c.emp_descripcion ?? ''}`;
            sel.appendChild(opt);
        });
    } catch (err) {
        _ark_clients_mostrar_mensaje('Error al cargar compañías: ' + err.message, 'error');
    }
}

async function _ark_clients_cargar(filtroCodigo) {
    try {
        let query = supabaseClient
            .from('ark_clients')
            .select('clt_idauto, clt_codigo, clt_descripcion, clt_idfiscal, clt_status')
            .order('clt_codigo', { ascending: true });
        if (filtroCodigo) {
            query = query.ilike('clt_codigo', `%${filtroCodigo}%`);
        }
        const { data, error } = await query;
        if (error) throw error;
        _ark_clients_pintar_tabla(data || []);
    } catch (err) {
        _ark_clients_mostrar_mensaje('Error al cargar: ' + err.message, 'error');
    }
}

function _ark_clients_pintar_tabla(filas) {
    const tbody = document.querySelector('#tabla_registros tbody');
    tbody.innerHTML = '';
    if (filas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#888;">Sin registros</td></tr>';
        return;
    }
    filas.forEach(f => {
        const tr = document.createElement('tr');
        tr.dataset.idauto = f.clt_idauto;
        tr.dataset.row = JSON.stringify(f);
        tr.innerHTML = `
            <td>${f.clt_codigo}</td>
            <td>${f.clt_descripcion ?? ''}</td>
            <td>${f.clt_idfiscal ?? ''}</td>
            <td>${f.clt_status ? 'Activo' : 'Inactivo'}</td>
        `;
        tr.addEventListener('click', () => {
            document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
            tr.classList.add('seleccionada');
            _ark_clients_estado('seleccion');
        });
        tbody.appendChild(tr);
    });
}

function _ark_clients_estado(modo) {
    const btnInc = document.getElementById('btn_incluir');
    const btnGua = document.getElementById('btn_guardar');
    const btnEdi = document.getElementById('btn_editar');
    const btnCan = document.getElementById('btn_cancelar');
    const btnBor = document.getElementById('btn_borrar');
    const campos = document.querySelectorAll('#ark-form-clientes input, #ark-form-clientes select, #ark-form-clientes textarea');
    if (modo === 'consulta') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = true;
        btnCan.disabled = true; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'clt_fechacreacion') c.disabled = true; });
        _ark_clients_limpiar_form();
    } else if (modo === 'seleccion') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = false;
        btnCan.disabled = true; btnBor.disabled = false;
        campos.forEach(c => c.disabled = true);
    } else if (modo === 'edicion') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'clt_codigo' && c.id !== 'clt_fechacreacion') c.disabled = false; });
    } else if (modo === 'nuevo') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'clt_fechacreacion') c.disabled = false; });
        _ark_clients_limpiar_form();
    }
}

function _ark_clients_limpiar_form() {
    document.getElementById('clt_codigo').value = '';
    document.getElementById('clt_descripcion').value = '';
    document.getElementById('clt_idfiscal').value = '';
    document.getElementById('clt_status').value = 'true';
    document.getElementById('clt_tipocontribuyente').value = '0';
    document.getElementById('clt_origen').value = '';
    document.getElementById('clt_direccionf').value = '';
    document.getElementById('clt_direccionl').value = '';
    document.getElementById('clt_telefono1').value = '';
    document.getElementById('clt_telefono2').value = '';
    document.getElementById('clt_emailempresa').value = '';
    document.getElementById('clt_representante').value = '';
    document.getElementById('clt_idrepresentante').value = '';
    document.getElementById('clt_telefonocontacto').value = '';
    document.getElementById('clt_emailcontacto').value = '';
    document.getElementById('clt_fechacreacion').value = '';
    document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
}

function _ark_clients_mostrar_mensaje(texto, tipo) {
    const el = document.getElementById('ark-mensaje');
    el.textContent = texto;
    el.className = 'ark-mensaje ' + (tipo || 'ok');
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

async function _ark_clients_usuario_auditoria() {
    const { data } = await supabaseClient.auth.getUser();
    return data.user ? data.user.email : 'WEB';
}

function _ark_clients_leer_form() {
    const valor = (id) => {
        const texto = document.getElementById(id).value.trim();
        return texto === '' ? null : texto;
    };
    return {
        clt_codigo: valor('clt_codigo'),
        clt_descripcion: valor('clt_descripcion'),
        clt_idfiscal: valor('clt_idfiscal'),
        clt_status: document.getElementById('clt_status').value === 'true',
        clt_tipocontribuyente: parseInt(document.getElementById('clt_tipocontribuyente').value, 10) || null,
        clt_origen: parseInt(document.getElementById('clt_origen').value, 10) || null,
        clt_direccionf: valor('clt_direccionf'),
        clt_direccionl: valor('clt_direccionl'),
        clt_telefono1: valor('clt_telefono1'),
        clt_telefono2: valor('clt_telefono2'),
        clt_emailempresa: valor('clt_emailempresa'),
        clt_representante: valor('clt_representante'),
        clt_idrepresentante: valor('clt_idrepresentante'),
        clt_telefonocontacto: valor('clt_telefonocontacto'),
        clt_emailcontacto: valor('clt_emailcontacto'),
    };
}

function _ark_clients_poblar_form(reg) {
    document.getElementById('clt_codigo').value = reg.clt_codigo ?? '';
    document.getElementById('clt_descripcion').value = reg.clt_descripcion ?? '';
    document.getElementById('clt_idfiscal').value = reg.clt_idfiscal ?? '';
    document.getElementById('clt_status').value = String(reg.clt_status);
    document.getElementById('clt_tipocontribuyente').value = String(reg.clt_tipocontribuyente ?? 0);
    document.getElementById('clt_origen').value = String(reg.clt_origen ?? '');
    document.getElementById('clt_direccionf').value = reg.clt_direccionf ?? '';
    document.getElementById('clt_direccionl').value = reg.clt_direccionl ?? '';
    document.getElementById('clt_telefono1').value = reg.clt_telefono1 ?? '';
    document.getElementById('clt_telefono2').value = reg.clt_telefono2 ?? '';
    document.getElementById('clt_emailempresa').value = reg.clt_emailempresa ?? '';
    document.getElementById('clt_representante').value = reg.clt_representante ?? '';
    document.getElementById('clt_idrepresentante').value = reg.clt_idrepresentante ?? '';
    document.getElementById('clt_telefonocontacto').value = reg.clt_telefonocontacto ?? '';
    document.getElementById('clt_emailcontacto').value = reg.clt_emailcontacto ?? '';
    document.getElementById('clt_fechacreacion').value = reg.clt_fechacreacion ? new Date(reg.clt_fechacreacion).toLocaleString() : '';
}

async function _ark_clients_cargar_registro(idauto) {
    const { data, error } = await supabaseClient
        .from('ark_clients')
        .select('*')
        .eq('clt_idauto', idauto)
        .maybeSingle();
    if (error) throw error;
    return data;
}

function _ark_clients_incluir() {
    document.getElementById('ark-form-clientes').dataset.idauto = '';
    _ark_clients_limpiar_form();
    _ark_clients_estado('nuevo');
}

async function _ark_clients_editar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    try {
        const reg = await _ark_clients_cargar_registro(tr.dataset.idauto);
        if (!reg) {
            _ark_clients_mostrar_mensaje('Registro no encontrado.', 'error');
            return;
        }
        document.getElementById('ark-form-clientes').dataset.idauto = String(reg.clt_idauto);
        _ark_clients_poblar_form(reg);
        _ark_clients_estado('edicion');
    } catch (err) {
        _ark_clients_mostrar_mensaje('Error al cargar el registro: ' + err.message, 'error');
    }
}

function _ark_clients_cancelar() {
    document.getElementById('ark-form-clientes').dataset.idauto = '';
    _ark_clients_limpiar_form();
    _ark_clients_estado('consulta');
    _ark_clients_cargar('');
}

async function _ark_clients_guardar() {
    const form = document.getElementById('ark-form-clientes');
    const idauto = form.dataset.idauto || '';
    const valores = _ark_clients_leer_form();
    if (!valores.clt_codigo) {
        _ark_clients_mostrar_mensaje('El código es obligatorio.', 'error');
        return;
    }
    if (!valores.clt_origen) {
        _ark_clients_mostrar_mensaje('Debe seleccionar una compañía.', 'error');
        return;
    }
    try {
        const usuario = await _ark_clients_usuario_auditoria();
        if (idauto === '') {
            valores.clt_namemachine = 'WEB';
            valores.clt_usercreator = usuario;
            const { error } = await supabaseClient.from('ark_clients').insert(valores);
            if (error) throw error;
            _ark_clients_mostrar_mensaje('Registro insertado correctamente.');
        } else {
            valores.clt_lastmachine = 'WEB';
            valores.clt_userlastupdate = usuario;
            const { error } = await supabaseClient.from('ark_clients').update(valores).eq('clt_idauto', idauto);
            if (error) throw error;
            _ark_clients_mostrar_mensaje('Registro actualizado correctamente.');
        }
        form.dataset.idauto = '';
        _ark_clients_limpiar_form();
        _ark_clients_estado('consulta');
        await _ark_clients_cargar('');
    } catch (err) {
        _ark_clients_mostrar_mensaje('Error al guardar: ' + err.message, 'error');
    }
}

async function _ark_clients_borrar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    if (!confirm('¿Desea eliminar el registro seleccionado?')) return;
    try {
        const { error } = await supabaseClient.from('ark_clients').delete().eq('clt_idauto', tr.dataset.idauto);
        if (error) throw error;
        _ark_clients_mostrar_mensaje('Registro eliminado correctamente.');
        _ark_clients_limpiar_form();
        _ark_clients_estado('consulta');
        await _ark_clients_cargar('');
    } catch (err) {
        _ark_clients_mostrar_mensaje('Error al eliminar: ' + err.message, 'error');
    }
}
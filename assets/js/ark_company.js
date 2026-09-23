async function renderArkCompany() {
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
            .ark-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem 1rem; }
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
            <h2>Empresa</h2>
            <div id="ark-mensaje" class="ark-mensaje" style="display:none;"></div>

            <form id="ark-form-empresa" autocomplete="off">
                <fieldset class="ark-grupo">
                    <legend>Datos Generales</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="emp_codigo">Código</label>
                            <input type="text" id="emp_codigo" maxlength="30" required>
                        </div>
                        <div class="ark-campo">
                            <label for="emp_status">Estado</label>
                            <select id="emp_status">
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="emp_descripcion">Razón Social</label>
                            <input type="text" id="emp_descripcion" maxlength="200">
                        </div>
                        <div class="ark-campo">
                            <label for="emp_idfiscal">ID Fiscal (RIF)</label>
                            <input type="text" id="emp_idfiscal" maxlength="20">
                        </div>
                        <div class="ark-campo">
                            <label for="emp_tipocontribuyente">Tipo Contribuyente</label>
                            <select id="emp_tipocontribuyente">
                                <option value="0">Ordinario</option>
                                <option value="1">Especial</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="ark-grupo">
                    <legend>Dirección y Teléfonos</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="emp_direccionf">Dirección Fiscal</label>
                            <textarea id="emp_direccionf"></textarea>
                        </div>
                        <div class="ark-campo">
                            <label for="emp_direccionl">Dirección Local</label>
                            <textarea id="emp_direccionl"></textarea>
                        </div>
                        <div class="ark-campo">
                            <label for="emp_telefono1">Teléfono Principal</label>
                            <input type="text" id="emp_telefono1" maxlength="40">
                        </div>
                        <div class="ark-campo">
                            <label for="emp_telefono2">Teléfono Móvil</label>
                            <input type="text" id="emp_telefono2" maxlength="40">
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="emp_emailempresa">Email Empresa</label>
                            <input type="email" id="emp_emailempresa" maxlength="100">
                        </div>
                    </div>
                </fieldset>

                <fieldset class="ark-grupo">
                    <legend>Contactos</legend>
                    <div class="ark-grid-3">
                        <div class="ark-campo" style="grid-column: 1 / 3;">
                            <label for="emp_representante">Representante Legal</label>
                            <input type="text" id="emp_representante" maxlength="100">
                        </div>
                        <div class="ark-campo">
                            <label for="emp_idrepresentante">Cédula</label>
                            <input type="text" id="emp_idrepresentante" maxlength="20">
                        </div>
                        <div class="ark-campo">
                            <label for="emp_telefonocontacto">Teléfono Contacto</label>
                            <input type="text" id="emp_telefonocontacto" maxlength="40">
                        </div>
                        <div class="ark-campo" style="grid-column: 2 / 4;">
                            <label for="emp_emailcontacto">Email Contacto</label>
                            <input type="email" id="emp_emailcontacto" maxlength="100">
                        </div>
                        <div class="ark-campo">
                            <label for="emp_fechacreacion">Fecha Creación</label>
                            <input type="text" id="emp_fechacreacion" readonly>
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

    _ark_company_init();
}

async function _ark_company_init() {
    _ark_company_estado('consulta');
    await _ark_company_cargar('');
    document.getElementById('btn_buscar').addEventListener('click', () => {
        const codigo = document.getElementById('input_buscar_codigo').value.trim();
        _ark_company_cargar(codigo);
    });
    document.getElementById('btn_listar_todo').addEventListener('click', () => {
        document.getElementById('input_buscar_codigo').value = '';
        _ark_company_cargar('');
    });
    document.getElementById('input_buscar_codigo').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btn_buscar').click();
        }
    });
    document.getElementById('btn_incluir').addEventListener('click', _ark_company_incluir);
    document.getElementById('btn_guardar').addEventListener('click', _ark_company_guardar);
    document.getElementById('btn_editar').addEventListener('click', _ark_company_editar);
    document.getElementById('btn_cancelar').addEventListener('click', _ark_company_cancelar);
    document.getElementById('btn_borrar').addEventListener('click', _ark_company_borrar);
}

async function _ark_company_cargar(filtroCodigo) {
    try {
        let query = supabaseClient
            .from('ark_company')
            .select('emp_idauto, emp_codigo, emp_descripcion, emp_idfiscal, emp_status')
            .order('emp_codigo', { ascending: true });
        if (filtroCodigo) {
            query = query.ilike('emp_codigo', `%${filtroCodigo}%`);
        }
        const { data, error } = await query;
        if (error) throw error;
        _ark_company_pintar_tabla(data || []);
    } catch (err) {
        _ark_company_mostrar_mensaje('Error al cargar: ' + err.message, 'error');
    }
}

function _ark_company_pintar_tabla(filas) {
    const tbody = document.querySelector('#tabla_registros tbody');
    tbody.innerHTML = '';
    if (filas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#888;">Sin registros</td></tr>';
        return;
    }
    filas.forEach(f => {
        const tr = document.createElement('tr');
        tr.dataset.idauto = f.emp_idauto;
        tr.dataset.row = JSON.stringify(f);
        tr.innerHTML = `
            <td>${f.emp_codigo}</td>
            <td>${f.emp_descripcion ?? ''}</td>
            <td>${f.emp_idfiscal ?? ''}</td>
            <td>${f.emp_status ? 'Activo' : 'Inactivo'}</td>
        `;
        tr.addEventListener('click', () => {
            document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
            tr.classList.add('seleccionada');
            _ark_company_estado('seleccion');
        });
        tbody.appendChild(tr);
    });
}

function _ark_company_estado(modo) {
    const btnInc = document.getElementById('btn_incluir');
    const btnGua = document.getElementById('btn_guardar');
    const btnEdi = document.getElementById('btn_editar');
    const btnCan = document.getElementById('btn_cancelar');
    const btnBor = document.getElementById('btn_borrar');
    const campos = document.querySelectorAll('#ark-form-empresa input, #ark-form-empresa select, #ark-form-empresa textarea');

    if (modo === 'consulta') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = true;
        btnCan.disabled = true; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'emp_fechacreacion') c.disabled = true; });
        _ark_company_limpiar_form();
    } else if (modo === 'seleccion') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = false;
        btnCan.disabled = true; btnBor.disabled = false;
        campos.forEach(c => c.disabled = true);
    } else if (modo === 'edicion') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'emp_codigo' && c.id !== 'emp_fechacreacion') c.disabled = false; });
    } else if (modo === 'nuevo') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'emp_fechacreacion') c.disabled = false; });
        _ark_company_limpiar_form();
    }
}

function _ark_company_limpiar_form() {
    document.getElementById('emp_codigo').value = '';
    document.getElementById('emp_descripcion').value = '';
    document.getElementById('emp_idfiscal').value = '';
    document.getElementById('emp_status').value = 'true';
    document.getElementById('emp_tipocontribuyente').value = '0';
    document.getElementById('emp_direccionf').value = '';
    document.getElementById('emp_direccionl').value = '';
    document.getElementById('emp_telefono1').value = '';
    document.getElementById('emp_telefono2').value = '';
    document.getElementById('emp_emailempresa').value = '';
    document.getElementById('emp_representante').value = '';
    document.getElementById('emp_idrepresentante').value = '';
    document.getElementById('emp_telefonocontacto').value = '';
    document.getElementById('emp_emailcontacto').value = '';
    document.getElementById('emp_fechacreacion').value = '';
    document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
}

function _ark_company_mostrar_mensaje(texto, tipo) {
    const el = document.getElementById('ark-mensaje');
    el.textContent = texto;
    el.className = 'ark-mensaje ' + (tipo || 'ok');
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

async function _ark_company_usuario_auditoria() {
    const { data } = await supabaseClient.auth.getUser();
    return data.user ? data.user.email : 'WEB';
}

function _ark_company_leer_form() {
    const valor = (id) => {
        const texto = document.getElementById(id).value.trim();
        return texto === '' ? null : texto;
    };
    return {
        emp_codigo: valor('emp_codigo'),
        emp_descripcion: valor('emp_descripcion'),
        emp_idfiscal: valor('emp_idfiscal'),
        emp_status: document.getElementById('emp_status').value === 'true',
        emp_tipocontribuyente: parseInt(document.getElementById('emp_tipocontribuyente').value, 10),
        emp_direccionf: valor('emp_direccionf'),
        emp_direccionl: valor('emp_direccionl'),
        emp_telefono1: valor('emp_telefono1'),
        emp_telefono2: valor('emp_telefono2'),
        emp_emailempresa: valor('emp_emailempresa'),
        emp_representante: valor('emp_representante'),
        emp_idrepresentante: valor('emp_idrepresentante'),
        emp_telefonocontacto: valor('emp_telefonocontacto'),
        emp_emailcontacto: valor('emp_emailcontacto'),
    };
}

function _ark_company_poblar_form(reg) {
    document.getElementById('emp_codigo').value = reg.emp_codigo ?? '';
    document.getElementById('emp_descripcion').value = reg.emp_descripcion ?? '';
    document.getElementById('emp_idfiscal').value = reg.emp_idfiscal ?? '';
    document.getElementById('emp_status').value = String(reg.emp_status);
    document.getElementById('emp_tipocontribuyente').value = String(reg.emp_tipocontribuyente ?? 0);
    document.getElementById('emp_direccionf').value = reg.emp_direccionf ?? '';
    document.getElementById('emp_direccionl').value = reg.emp_direccionl ?? '';
    document.getElementById('emp_telefono1').value = reg.emp_telefono1 ?? '';
    document.getElementById('emp_telefono2').value = reg.emp_telefono2 ?? '';
    document.getElementById('emp_emailempresa').value = reg.emp_emailempresa ?? '';
    document.getElementById('emp_representante').value = reg.emp_representante ?? '';
    document.getElementById('emp_idrepresentante').value = reg.emp_idrepresentante ?? '';
    document.getElementById('emp_telefonocontacto').value = reg.emp_telefonocontacto ?? '';
    document.getElementById('emp_emailcontacto').value = reg.emp_emailcontacto ?? '';
    document.getElementById('emp_fechacreacion').value = reg.emp_fechacreacion ? new Date(reg.emp_fechacreacion).toLocaleString() : '';
}

async function _ark_company_cargar_registro(idauto) {
    const { data, error } = await supabaseClient
        .from('ark_company')
        .select('*')
        .eq('emp_idauto', idauto)
        .maybeSingle();
    if (error) throw error;
    return data;
}

function _ark_company_incluir() {
    document.getElementById('ark-form-empresa').dataset.idauto = '';
    _ark_company_limpiar_form();
    _ark_company_estado('nuevo');
}

async function _ark_company_editar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    try {
        const reg = await _ark_company_cargar_registro(tr.dataset.idauto);
        if (!reg) {
            _ark_company_mostrar_mensaje('Registro no encontrado.', 'error');
            return;
        }
        document.getElementById('ark-form-empresa').dataset.idauto = String(reg.emp_idauto);
        _ark_company_poblar_form(reg);
        _ark_company_estado('edicion');
    } catch (err) {
        _ark_company_mostrar_mensaje('Error al cargar el registro: ' + err.message, 'error');
    }
}

function _ark_company_cancelar() {
    document.getElementById('ark-form-empresa').dataset.idauto = '';
    _ark_company_limpiar_form();
    _ark_company_estado('consulta');
    _ark_company_cargar('');
}

async function _ark_company_guardar() {
    const form = document.getElementById('ark-form-empresa');
    const idauto = form.dataset.idauto || '';
    const valores = _ark_company_leer_form();
    if (!valores.emp_codigo) {
        _ark_company_mostrar_mensaje('El código es obligatorio.', 'error');
        return;
    }
    try {
        const usuario = await _ark_company_usuario_auditoria();
        if (idauto === '') {
            valores.emp_namemachine = 'WEB';
            valores.emp_usercreator = usuario;
            const { error } = await supabaseClient.from('ark_company').insert(valores);
            if (error) throw error;
            _ark_company_mostrar_mensaje('Registro insertado correctamente.');
        } else {
            valores.emp_lastmachine = 'WEB';
            valores.emp_userlastupdate = usuario;
            const { error } = await supabaseClient.from('ark_company').update(valores).eq('emp_idauto', idauto);
            if (error) throw error;
            _ark_company_mostrar_mensaje('Registro actualizado correctamente.');
        }
        form.dataset.idauto = '';
        _ark_company_limpiar_form();
        _ark_company_estado('consulta');
        await _ark_company_cargar('');
    } catch (err) {
        _ark_company_mostrar_mensaje('Error al guardar: ' + err.message, 'error');
    }
}

async function _ark_company_borrar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    if (!confirm('¿Desea eliminar el registro seleccionado?')) return;
    try {
        const { error } = await supabaseClient.from('ark_company').delete().eq('emp_idauto', tr.dataset.idauto);
        if (error) throw error;
        _ark_company_mostrar_mensaje('Registro eliminado correctamente.');
        _ark_company_limpiar_form();
        _ark_company_estado('consulta');
        await _ark_company_cargar('');
    } catch (err) {
        _ark_company_mostrar_mensaje('Error al eliminar: ' + err.message, 'error');
    }
}
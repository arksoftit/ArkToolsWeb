async function renderArkUsers() {
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
            <h2>Usuarios</h2>
            <div id="ark-mensaje" class="ark-mensaje" style="display:none;"></div>
            <form id="ark-form-usuarios" autocomplete="off">
                <fieldset class="ark-grupo">
                    <legend>Datos Generales</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="usr_codigo">Código</label>
                            <input type="text" id="usr_codigo" maxlength="30" required>
                        </div>
                        <div class="ark-campo">
                            <label for="usr_status">Estado</label>
                            <select id="usr_status">
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                        <div class="ark-campo">
                            <label for="usr_login">Login</label>
                            <input type="text" id="usr_login" maxlength="60">
                        </div>
                        <div class="ark-campo">
                            <label for="usr_rol">Rol</label>
                            <select id="usr_rol" required>
                                <option value="">Seleccione...</option>
                                <option value="ADMIN">Administrador</option>
                                <option value="CONSULTOR">Consultor</option>
                                <option value="LECTOR">Lector</option>
                            </select>
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="usr_descripcion">Descripción</label>
                            <input type="text" id="usr_descripcion" maxlength="200">
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="usr_emp_idauto">Compañía</label>
                            <select id="usr_emp_idauto" required></select>
                        </div>
                    </div>
                </fieldset>
                <fieldset class="ark-grupo">
                    <legend>Contacto y Cargo</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="usr_telefono">Teléfono</label>
                            <input type="text" id="usr_telefono" maxlength="40">
                        </div>
                        <div class="ark-campo">
                            <label for="usr_emailusuario">Email Usuario</label>
                            <input type="email" id="usr_emailusuario" maxlength="100">
                        </div>
                        <div class="ark-campo">
                            <label for="usr_cargo">Cargo</label>
                            <input type="text" id="usr_cargo" maxlength="100">
                        </div>
                        <div class="ark-campo">
                            <label for="usr_fechacreacion">Fecha Creación</label>
                            <input type="text" id="usr_fechacreacion" readonly>
                        </div>
                    </div>
                </fieldset>
                <fieldset class="ark-grupo">
                    <legend>Vinculación Auth</legend>
                    <div class="ark-grid">
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="usr_auth_id">ID Auth (UUID)</label>
                            <input type="text" id="usr_auth_id" maxlength="36" placeholder="UUID de la cuenta en Supabase Auth">
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
                        <th>Login</th>
                        <th>Descripción</th>
                        <th>Rol</th>
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
    _ark_users_init();
}

async function _ark_users_init() {
    _ark_users_estado('consulta');
    await _ark_users_cargar_companias();
    await _ark_users_cargar('');
    document.getElementById('btn_buscar').addEventListener('click', () => {
        const codigo = document.getElementById('input_buscar_codigo').value.trim();
        _ark_users_cargar(codigo);
    });
    document.getElementById('btn_listar_todo').addEventListener('click', () => {
        document.getElementById('input_buscar_codigo').value = '';
        _ark_users_cargar('');
    });
    document.getElementById('input_buscar_codigo').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btn_buscar').click();
        }
    });
    document.getElementById('btn_incluir').addEventListener('click', _ark_users_incluir);
    document.getElementById('btn_guardar').addEventListener('click', _ark_users_guardar);
    document.getElementById('btn_editar').addEventListener('click', _ark_users_editar);
    document.getElementById('btn_cancelar').addEventListener('click', _ark_users_cancelar);
    document.getElementById('btn_borrar').addEventListener('click', _ark_users_borrar);
}

async function _ark_users_cargar_companias() {
    try {
        const { data, error } = await supabaseClient
            .from('ark_company')
            .select('emp_idauto, emp_codigo, emp_descripcion')
            .order('emp_codigo', { ascending: true });
        if (error) throw error;
        const sel = document.getElementById('usr_emp_idauto');
        sel.innerHTML = '<option value="">Seleccione...</option>';
        (data || []).forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.emp_idauto;
            opt.textContent = `${c.emp_codigo} - ${c.emp_descripcion ?? ''}`;
            sel.appendChild(opt);
        });
    } catch (err) {
        _ark_users_mostrar_mensaje('Error al cargar compañías: ' + err.message, 'error');
    }
}

async function _ark_users_cargar(filtroCodigo) {
    try {
        let query = supabaseClient
            .from('ark_users')
            .select('usr_idauto, usr_codigo, usr_login, usr_descripcion, usr_rol, usr_status')
            .order('usr_codigo', { ascending: true });
        if (filtroCodigo) {
            query = query.ilike('usr_codigo', `%${filtroCodigo}%`);
        }
        const { data, error } = await query;
        if (error) throw error;
        _ark_users_pintar_tabla(data || []);
    } catch (err) {
        _ark_users_mostrar_mensaje('Error al cargar: ' + err.message, 'error');
    }
}

function _ark_users_pintar_tabla(filas) {
    const tbody = document.querySelector('#tabla_registros tbody');
    tbody.innerHTML = '';
    if (filas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#888;">Sin registros</td></tr>';
        return;
    }
    filas.forEach(f => {
        const tr = document.createElement('tr');
        tr.dataset.idauto = f.usr_idauto;
        tr.dataset.row = JSON.stringify(f);
        tr.innerHTML = `
            <td>${f.usr_codigo}</td>
            <td>${f.usr_login ?? ''}</td>
            <td>${f.usr_descripcion ?? ''}</td>
            <td>${f.usr_rol ?? ''}</td>
            <td>${f.usr_status ? 'Activo' : 'Inactivo'}</td>
        `;
        tr.addEventListener('click', () => {
            document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
            tr.classList.add('seleccionada');
            _ark_users_estado('seleccion');
        });
        tbody.appendChild(tr);
    });
}

function _ark_users_estado(modo) {
    const btnInc = document.getElementById('btn_incluir');
    const btnGua = document.getElementById('btn_guardar');
    const btnEdi = document.getElementById('btn_editar');
    const btnCan = document.getElementById('btn_cancelar');
    const btnBor = document.getElementById('btn_borrar');
    const campos = document.querySelectorAll('#ark-form-usuarios input, #ark-form-usuarios select, #ark-form-usuarios textarea');
    const authId = document.getElementById('usr_auth_id');
    if (modo === 'consulta') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = true;
        btnCan.disabled = true; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'usr_fechacreacion') c.disabled = true; });
        _ark_users_limpiar_form();
    } else if (modo === 'seleccion') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = false;
        btnCan.disabled = true; btnBor.disabled = false;
        campos.forEach(c => c.disabled = true);
    } else if (modo === 'edicion') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'usr_codigo' && c.id !== 'usr_fechacreacion') c.disabled = false; });
        if (authId.value.trim() !== '') {
            authId.disabled = true;
        }
    } else if (modo === 'nuevo') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'usr_fechacreacion') c.disabled = false; });
        _ark_users_limpiar_form();
    }
}

function _ark_users_limpiar_form() {
    document.getElementById('usr_codigo').value = '';
    document.getElementById('usr_login').value = '';
    document.getElementById('usr_descripcion').value = '';
    document.getElementById('usr_status').value = 'true';
    document.getElementById('usr_rol').value = '';
    document.getElementById('usr_emp_idauto').value = '';
    document.getElementById('usr_telefono').value = '';
    document.getElementById('usr_emailusuario').value = '';
    document.getElementById('usr_cargo').value = '';
    document.getElementById('usr_fechacreacion').value = '';
    document.getElementById('usr_auth_id').value = '';
    document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
}

function _ark_users_mostrar_mensaje(texto, tipo) {
    const el = document.getElementById('ark-mensaje');
    el.textContent = texto;
    el.className = 'ark-mensaje ' + (tipo || 'ok');
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

async function _ark_users_usuario_auditoria() {
    const { data } = await supabaseClient.auth.getUser();
    return data.user ? data.user.email : 'WEB';
}

function _ark_users_leer_form() {
    const valor = (id) => {
        const texto = document.getElementById(id).value.trim();
        return texto === '' ? null : texto;
    };
    return {
        usr_codigo: valor('usr_codigo'),
        usr_login: valor('usr_login'),
        usr_descripcion: valor('usr_descripcion'),
        usr_status: document.getElementById('usr_status').value === 'true',
        usr_rol: document.getElementById('usr_rol').value,
        usr_emp_idauto: parseInt(document.getElementById('usr_emp_idauto').value, 10) || null,
        usr_telefono: valor('usr_telefono'),
        usr_emailusuario: valor('usr_emailusuario'),
        usr_cargo: valor('usr_cargo'),
        usr_auth_id: valor('usr_auth_id'),
    };
}

function _ark_users_poblar_form(reg) {
    document.getElementById('usr_codigo').value = reg.usr_codigo ?? '';
    document.getElementById('usr_login').value = reg.usr_login ?? '';
    document.getElementById('usr_descripcion').value = reg.usr_descripcion ?? '';
    document.getElementById('usr_status').value = String(reg.usr_status);
    document.getElementById('usr_rol').value = reg.usr_rol ?? '';
    document.getElementById('usr_emp_idauto').value = String(reg.usr_emp_idauto ?? '');
    document.getElementById('usr_telefono').value = reg.usr_telefono ?? '';
    document.getElementById('usr_emailusuario').value = reg.usr_emailusuario ?? '';
    document.getElementById('usr_cargo').value = reg.usr_cargo ?? '';
    document.getElementById('usr_fechacreacion').value = reg.usr_fechacreacion ? new Date(reg.usr_fechacreacion).toLocaleString() : '';
    document.getElementById('usr_auth_id').value = reg.usr_auth_id ?? '';
}

async function _ark_users_cargar_registro(idauto) {
    const { data, error } = await supabaseClient
        .from('ark_users')
        .select('*')
        .eq('usr_idauto', idauto)
        .maybeSingle();
    if (error) throw error;
    return data;
}

function _ark_users_incluir() {
    document.getElementById('ark-form-usuarios').dataset.idauto = '';
    _ark_users_limpiar_form();
    _ark_users_estado('nuevo');
}

async function _ark_users_editar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    try {
        const reg = await _ark_users_cargar_registro(tr.dataset.idauto);
        if (!reg) {
            _ark_users_mostrar_mensaje('Registro no encontrado.', 'error');
            return;
        }
        document.getElementById('ark-form-usuarios').dataset.idauto = String(reg.usr_idauto);
        _ark_users_poblar_form(reg);
        _ark_users_estado('edicion');
    } catch (err) {
        _ark_users_mostrar_mensaje('Error al cargar el registro: ' + err.message, 'error');
    }
}

function _ark_users_cancelar() {
    document.getElementById('ark-form-usuarios').dataset.idauto = '';
    _ark_users_limpiar_form();
    _ark_users_estado('consulta');
    _ark_users_cargar('');
}

async function _ark_users_guardar() {
    const form = document.getElementById('ark-form-usuarios');
    const idauto = form.dataset.idauto || '';
    const valores = _ark_users_leer_form();
    if (!valores.usr_codigo) {
        _ark_users_mostrar_mensaje('El código es obligatorio.', 'error');
        return;
    }
    if (!valores.usr_rol) {
        _ark_users_mostrar_mensaje('Debe seleccionar un rol.', 'error');
        return;
    }
    if (!valores.usr_emp_idauto) {
        _ark_users_mostrar_mensaje('Debe seleccionar una compañía.', 'error');
        return;
    }
    if (valores.usr_auth_id && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(valores.usr_auth_id)) {
        _ark_users_mostrar_mensaje('El ID Auth debe tener formato UUID.', 'error');
        return;
    }
    try {
        const usuario = await _ark_users_usuario_auditoria();
        if (idauto === '') {
            valores.usr_namemachine = 'WEB';
            valores.usr_usercreator = usuario;
            const { error } = await supabaseClient.from('ark_users').insert(valores);
            if (error) throw error;
            _ark_users_mostrar_mensaje('Registro insertado correctamente.');
        } else {
            valores.usr_lastmachine = 'WEB';
            valores.usr_userlastupdate = usuario;
            const { error } = await supabaseClient.from('ark_users').update(valores).eq('usr_idauto', idauto);
            if (error) throw error;
            _ark_users_mostrar_mensaje('Registro actualizado correctamente.');
        }
        form.dataset.idauto = '';
        _ark_users_limpiar_form();
        _ark_users_estado('consulta');
        await _ark_users_cargar('');
    } catch (err) {
        _ark_users_mostrar_mensaje('Error al guardar: ' + err.message, 'error');
    }
}

async function _ark_users_borrar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    if (!confirm('¿Desea eliminar el registro seleccionado?')) return;
    try {
        const { error } = await supabaseClient.from('ark_users').delete().eq('usr_idauto', tr.dataset.idauto);
        if (error) throw error;
        _ark_users_mostrar_mensaje('Registro eliminado correctamente.');
        _ark_users_limpiar_form();
        _ark_users_estado('consulta');
        await _ark_users_cargar('');
    } catch (err) {
        _ark_users_mostrar_mensaje('Error al eliminar: ' + err.message, 'error');
    }
}
async function renderArkDeviceTypes() {
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
            <h2>Tipos de Dispositivos</h2>
            <div id="ark-mensaje" class="ark-mensaje" style="display:none;"></div>
            <form id="ark-form-device-types" autocomplete="off">
                <fieldset class="ark-grupo">
                    <legend>Datos Generales</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="dty_codigo">Código</label>
                            <input type="text" id="dty_codigo" maxlength="30" required>
                        </div>
                        <div class="ark-campo">
                            <label for="dty_status">Estado</label>
                            <select id="dty_status">
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="dty_descripcion">Descripción</label>
                            <input type="text" id="dty_descripcion" maxlength="200">
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="dty_descripciontec">Descripción Técnica</label>
                            <textarea id="dty_descripciontec"></textarea>
                        </div>
                        <div class="ark-campo">
                            <label for="dty_fechacreacion">Fecha Creación</label>
                            <input type="text" id="dty_fechacreacion" readonly>
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
    _ark_device_types_init();
}

async function _ark_device_types_init() {
    _ark_device_types_estado('consulta');
    await _ark_device_types_cargar('');
    document.getElementById('btn_buscar').addEventListener('click', () => {
        const codigo = document.getElementById('input_buscar_codigo').value.trim();
        _ark_device_types_cargar(codigo);
    });
    document.getElementById('btn_listar_todo').addEventListener('click', () => {
        document.getElementById('input_buscar_codigo').value = '';
        _ark_device_types_cargar('');
    });
    document.getElementById('input_buscar_codigo').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btn_buscar').click();
        }
    });
    document.getElementById('btn_incluir').addEventListener('click', _ark_device_types_incluir);
    document.getElementById('btn_guardar').addEventListener('click', _ark_device_types_guardar);
    document.getElementById('btn_editar').addEventListener('click', _ark_device_types_editar);
    document.getElementById('btn_cancelar').addEventListener('click', _ark_device_types_cancelar);
    document.getElementById('btn_borrar').addEventListener('click', _ark_device_types_borrar);
}

async function _ark_device_types_cargar(filtroCodigo) {
    try {
        let query = supabaseClient
            .from('ark_device_types')
            .select('dty_idauto, dty_codigo, dty_descripcion, dty_status')
            .order('dty_codigo', { ascending: true });
        if (filtroCodigo) {
            query = query.ilike('dty_codigo', `%${filtroCodigo}%`);
        }
        const { data, error } = await query;
        if (error) throw error;
        _ark_device_types_pintar_tabla(data || []);
    } catch (err) {
        _ark_device_types_mostrar_mensaje('Error al cargar: ' + err.message, 'error');
    }
}

function _ark_device_types_pintar_tabla(filas) {
    const tbody = document.querySelector('#tabla_registros tbody');
    tbody.innerHTML = '';
    if (filas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:#888;">Sin registros</td></tr>';
        return;
    }
    filas.forEach(f => {
        const tr = document.createElement('tr');
        tr.dataset.idauto = f.dty_idauto;
        tr.dataset.row = JSON.stringify(f);
        tr.innerHTML = `
            <td>${f.dty_codigo}</td>
            <td>${f.dty_descripcion ?? ''}</td>
            <td>${f.dty_status ? 'Activo' : 'Inactivo'}</td>
        `;
        tr.addEventListener('click', () => {
            document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
            tr.classList.add('seleccionada');
            _ark_device_types_estado('seleccion');
        });
        tbody.appendChild(tr);
    });
}

function _ark_device_types_estado(modo) {
    const btnInc = document.getElementById('btn_incluir');
    const btnGua = document.getElementById('btn_guardar');
    const btnEdi = document.getElementById('btn_editar');
    const btnCan = document.getElementById('btn_cancelar');
    const btnBor = document.getElementById('btn_borrar');
    const campos = document.querySelectorAll('#ark-form-device-types input, #ark-form-device-types select, #ark-form-device-types textarea');
    if (modo === 'consulta') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = true;
        btnCan.disabled = true; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'dty_fechacreacion') c.disabled = true; });
        _ark_device_types_limpiar_form();
    } else if (modo === 'seleccion') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = false;
        btnCan.disabled = true; btnBor.disabled = false;
        campos.forEach(c => c.disabled = true);
    } else if (modo === 'edicion') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'dty_codigo' && c.id !== 'dty_fechacreacion') c.disabled = false; });
    } else if (modo === 'nuevo') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'dty_fechacreacion') c.disabled = false; });
        _ark_device_types_limpiar_form();
    }
}

function _ark_device_types_limpiar_form() {
    document.getElementById('dty_codigo').value = '';
    document.getElementById('dty_descripcion').value = '';
    document.getElementById('dty_descripciontec').value = '';
    document.getElementById('dty_status').value = 'true';
    document.getElementById('dty_fechacreacion').value = '';
    document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
}

function _ark_device_types_mostrar_mensaje(texto, tipo) {
    const el = document.getElementById('ark-mensaje');
    el.textContent = texto;
    el.className = 'ark-mensaje ' + (tipo || 'ok');
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

async function _ark_device_types_usuario_auditoria() {
    const { data } = await supabaseClient.auth.getUser();
    return data.user ? data.user.email : 'WEB';
}

function _ark_device_types_leer_form() {
    const valor = (id) => {
        const texto = document.getElementById(id).value.trim();
        return texto === '' ? null : texto;
    };
    return {
        dty_codigo: valor('dty_codigo'),
        dty_descripcion: valor('dty_descripcion'),
        dty_descripciontec: valor('dty_descripciontec'),
        dty_status: document.getElementById('dty_status').value === 'true',
    };
}

function _ark_device_types_poblar_form(reg) {
    document.getElementById('dty_codigo').value = reg.dty_codigo ?? '';
    document.getElementById('dty_descripcion').value = reg.dty_descripcion ?? '';
    document.getElementById('dty_descripciontec').value = reg.dty_descripciontec ?? '';
    document.getElementById('dty_status').value = String(reg.dty_status);
    document.getElementById('dty_fechacreacion').value = reg.dty_fechacreacion ? new Date(reg.dty_fechacreacion).toLocaleString() : '';
}

async function _ark_device_types_cargar_registro(idauto) {
    const { data, error } = await supabaseClient
        .from('ark_device_types')
        .select('*')
        .eq('dty_idauto', idauto)
        .maybeSingle();
    if (error) throw error;
    return data;
}

function _ark_device_types_incluir() {
    document.getElementById('ark-form-device-types').dataset.idauto = '';
    _ark_device_types_limpiar_form();
    _ark_device_types_estado('nuevo');
}

async function _ark_device_types_editar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    try {
        const reg = await _ark_device_types_cargar_registro(tr.dataset.idauto);
        if (!reg) {
            _ark_device_types_mostrar_mensaje('Registro no encontrado.', 'error');
            return;
        }
        document.getElementById('ark-form-device-types').dataset.idauto = String(reg.dty_idauto);
        _ark_device_types_poblar_form(reg);
        _ark_device_types_estado('edicion');
    } catch (err) {
        _ark_device_types_mostrar_mensaje('Error al cargar el registro: ' + err.message, 'error');
    }
}

function _ark_device_types_cancelar() {
    document.getElementById('ark-form-device-types').dataset.idauto = '';
    _ark_device_types_limpiar_form();
    _ark_device_types_estado('consulta');
    _ark_device_types_cargar('');
}

async function _ark_device_types_guardar() {
    const form = document.getElementById('ark-form-device-types');
    const idauto = form.dataset.idauto || '';
    const valores = _ark_device_types_leer_form();
    if (!valores.dty_codigo) {
        _ark_device_types_mostrar_mensaje('El código es obligatorio.', 'error');
        return;
    }
    try {
        const usuario = await _ark_device_types_usuario_auditoria();
        if (idauto === '') {
            valores.dty_namemachine = 'WEB';
            valores.dty_usercreator = usuario;
            const { error } = await supabaseClient.from('ark_device_types').insert(valores);
            if (error) throw error;
            _ark_device_types_mostrar_mensaje('Registro insertado correctamente.');
        } else {
            valores.dty_lastmachine = 'WEB';
            valores.dty_userlastupdate = usuario;
            const { error } = await supabaseClient.from('ark_device_types').update(valores).eq('dty_idauto', idauto);
            if (error) throw error;
            _ark_device_types_mostrar_mensaje('Registro actualizado correctamente.');
        }
        form.dataset.idauto = '';
        _ark_device_types_limpiar_form();
        _ark_device_types_estado('consulta');
        await _ark_device_types_cargar('');
    } catch (err) {
        _ark_device_types_mostrar_mensaje('Error al guardar: ' + err.message, 'error');
    }
}

async function _ark_device_types_borrar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    if (!confirm('¿Desea eliminar el registro seleccionado?')) return;
    try {
        const { error } = await supabaseClient.from('ark_device_types').delete().eq('dty_idauto', tr.dataset.idauto);
        if (error) throw error;
        _ark_device_types_mostrar_mensaje('Registro eliminado correctamente.');
        _ark_device_types_limpiar_form();
        _ark_device_types_estado('consulta');
        await _ark_device_types_cargar('');
    } catch (err) {
        _ark_device_types_mostrar_mensaje('Error al eliminar: ' + err.message, 'error');
    }
}
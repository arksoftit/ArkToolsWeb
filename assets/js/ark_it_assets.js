async function renderArkItAssets() {
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
            <h2>Activos TI</h2>
            <div id="ark-mensaje" class="ark-mensaje" style="display:none;"></div>
            <form id="ark-form-it-assets" autocomplete="off">
                <fieldset class="ark-grupo">
                    <legend>Datos Generales</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="ita_codigo">Código</label>
                            <input type="text" id="ita_codigo" maxlength="30" required>
                        </div>
                        <div class="ark-campo">
                            <label for="ita_status">Estado</label>
                            <select id="ita_status">
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="ita_descripcion">Descripción</label>
                            <input type="text" id="ita_descripcion" maxlength="200">
                        </div>
                        <div class="ark-campo">
                            <label for="ita_marca">Marca</label>
                            <input type="text" id="ita_marca" maxlength="100">
                        </div>
                        <div class="ark-campo">
                            <label for="ita_clasificacion">Clasificación</label>
                            <input type="text" id="ita_clasificacion" maxlength="100">
                        </div>
                        <div class="ark-campo">
                            <label for="ita_functional_units">Unidad Funcional</label>
                            <select id="ita_functional_units"></select>
                        </div>
                        <div class="ark-campo">
                            <label for="ita_idemployees">Empleado Asignado</label>
                            <select id="ita_idemployees"></select>
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="ita_descripciontec">Descripción Técnica</label>
                            <textarea id="ita_descripciontec"></textarea>
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="ita_notastech">Notas Técnicas</label>
                            <textarea id="ita_notastech"></textarea>
                        </div>
                        <div class="ark-campo">
                            <label for="ita_macadrees">Dirección MAC</label>
                            <input type="text" id="ita_macadrees" maxlength="30">
                        </div>
                        <div class="ark-campo">
                            <label for="ita_ipadrees">Dirección IP</label>
                            <input type="text" id="ita_ipadrees" maxlength="30">
                        </div>
                        <div class="ark-campo">
                            <label for="ita_rol">Rol</label>
                            <input type="text" id="ita_rol" maxlength="60">
                        </div>
                        <div class="ark-campo">
                            <label for="ita_iprdp">IP RDP</label>
                            <input type="text" id="ita_iprdp" maxlength="30">
                        </div>
                        <div class="ark-campo">
                            <label for="ita_idrdp1">ID RDP 1</label>
                            <input type="text" id="ita_idrdp1" maxlength="60">
                        </div>
                        <div class="ark-campo">
                            <label for="ita_idrdp2">ID RDP 2</label>
                            <input type="text" id="ita_idrdp2" maxlength="60">
                        </div>
                        <div class="ark-campo">
                            <label for="ita_fechacreacion">Fecha Creación</label>
                            <input type="text" id="ita_fechacreacion" readonly>
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
                        <th>Marca</th>
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
    _ark_it_assets_init();
}

async function _ark_it_assets_init() {
    _ark_it_assets_estado('consulta');
    await _ark_it_assets_cargar_unidades();
    await _ark_it_assets_cargar_empleados();
    await _ark_it_assets_cargar('');
    document.getElementById('btn_buscar').addEventListener('click', () => {
        const codigo = document.getElementById('input_buscar_codigo').value.trim();
        _ark_it_assets_cargar(codigo);
    });
    document.getElementById('btn_listar_todo').addEventListener('click', () => {
        document.getElementById('input_buscar_codigo').value = '';
        _ark_it_assets_cargar('');
    });
    document.getElementById('input_buscar_codigo').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btn_buscar').click();
        }
    });
    document.getElementById('btn_incluir').addEventListener('click', _ark_it_assets_incluir);
    document.getElementById('btn_guardar').addEventListener('click', _ark_it_assets_guardar);
    document.getElementById('btn_editar').addEventListener('click', _ark_it_assets_editar);
    document.getElementById('btn_cancelar').addEventListener('click', _ark_it_assets_cancelar);
    document.getElementById('btn_borrar').addEventListener('click', _ark_it_assets_borrar);
}

async function _ark_it_assets_cargar_unidades() {
    try {
        const { data, error } = await supabaseClient
            .from('ark_functional_units')
            .select('fun_idauto, fun_codigo, fun_descripcion')
            .order('fun_codigo', { ascending: true });
        if (error) throw error;
        const sel = document.getElementById('ita_functional_units');
        sel.innerHTML = '<option value="">Seleccione...</option>';
        (data || []).forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.fun_idauto;
            opt.textContent = `${c.fun_codigo} - ${c.fun_descripcion ?? ''}`;
            sel.appendChild(opt);
        });
    } catch (err) {
        _ark_it_assets_mostrar_mensaje('Error al cargar unidades funcionales: ' + err.message, 'error');
    }
}

async function _ark_it_assets_cargar_empleados() {
    try {
        const { data, error } = await supabaseClient
            .from('ark_employees')
            .select('emy_idauto, emy_codigo, emy_descripcion')
            .order('emy_codigo', { ascending: true });
        if (error) throw error;
        const sel = document.getElementById('ita_idemployees');
        sel.innerHTML = '<option value="">Seleccione...</option>';
        (data || []).forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.emy_idauto;
            opt.textContent = `${c.emy_codigo} - ${c.emy_descripcion ?? ''}`;
            sel.appendChild(opt);
        });
    } catch (err) {
        _ark_it_assets_mostrar_mensaje('Error al cargar empleados: ' + err.message, 'error');
    }
}

async function _ark_it_assets_cargar(filtroCodigo) {
    try {
        let query = supabaseClient
            .from('ark_it_assets')
            .select('ita_idauto, ita_codigo, ita_descripcion, ita_marca, ita_status')
            .order('ita_codigo', { ascending: true });
        if (filtroCodigo) {
            query = query.ilike('ita_codigo', `%${filtroCodigo}%`);
        }
        const { data, error } = await query;
        if (error) throw error;
        _ark_it_assets_pintar_tabla(data || []);
    } catch (err) {
        _ark_it_assets_mostrar_mensaje('Error al cargar: ' + err.message, 'error');
    }
}

function _ark_it_assets_pintar_tabla(filas) {
    const tbody = document.querySelector('#tabla_registros tbody');
    tbody.innerHTML = '';
    if (filas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#888;">Sin registros</td></tr>';
        return;
    }
    filas.forEach(f => {
        const tr = document.createElement('tr');
        tr.dataset.idauto = f.ita_idauto;
        tr.dataset.row = JSON.stringify(f);
        tr.innerHTML = `
            <td>${f.ita_codigo}</td>
            <td>${f.ita_descripcion ?? ''}</td>
            <td>${f.ita_marca ?? ''}</td>
            <td>${f.ita_status ? 'Activo' : 'Inactivo'}</td>
        `;
        tr.addEventListener('click', () => {
            document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
            tr.classList.add('seleccionada');
            _ark_it_assets_estado('seleccion');
        });
        tbody.appendChild(tr);
    });
}

function _ark_it_assets_estado(modo) {
    const btnInc = document.getElementById('btn_incluir');
    const btnGua = document.getElementById('btn_guardar');
    const btnEdi = document.getElementById('btn_editar');
    const btnCan = document.getElementById('btn_cancelar');
    const btnBor = document.getElementById('btn_borrar');
    const campos = document.querySelectorAll('#ark-form-it-assets input, #ark-form-it-assets select, #ark-form-it-assets textarea');
    if (modo === 'consulta') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = true;
        btnCan.disabled = true; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'ita_fechacreacion') c.disabled = true; });
        _ark_it_assets_limpiar_form();
    } else if (modo === 'seleccion') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = false;
        btnCan.disabled = true; btnBor.disabled = false;
        campos.forEach(c => c.disabled = true);
    } else if (modo === 'edicion') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'ita_codigo' && c.id !== 'ita_fechacreacion') c.disabled = false; });
    } else if (modo === 'nuevo') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'ita_fechacreacion') c.disabled = false; });
        _ark_it_assets_limpiar_form();
    }
}

function _ark_it_assets_limpiar_form() {
    document.getElementById('ita_codigo').value = '';
    document.getElementById('ita_descripcion').value = '';
    document.getElementById('ita_marca').value = '';
    document.getElementById('ita_clasificacion').value = '';
    document.getElementById('ita_descripciontec').value = '';
    document.getElementById('ita_notastech').value = '';
    document.getElementById('ita_macadrees').value = '';
    document.getElementById('ita_ipadrees').value = '';
    document.getElementById('ita_rol').value = '';
    document.getElementById('ita_iprdp').value = '';
    document.getElementById('ita_idrdp1').value = '';
    document.getElementById('ita_idrdp2').value = '';
    document.getElementById('ita_functional_units').value = '';
    document.getElementById('ita_idemployees').value = '';
    document.getElementById('ita_status').value = 'true';
    document.getElementById('ita_fechacreacion').value = '';
    document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
}

function _ark_it_assets_mostrar_mensaje(texto, tipo) {
    const el = document.getElementById('ark-mensaje');
    el.textContent = texto;
    el.className = 'ark-mensaje ' + (tipo || 'ok');
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

async function _ark_it_assets_usuario_auditoria() {
    const { data } = await supabaseClient.auth.getUser();
    return data.user ? data.user.email : 'WEB';
}

function _ark_it_assets_leer_form() {
    const valor = (id) => {
        const texto = document.getElementById(id).value.trim();
        return texto === '' ? null : texto;
    };
    return {
        ita_codigo: valor('ita_codigo'),
        ita_descripcion: valor('ita_descripcion'),
        ita_marca: valor('ita_marca'),
        ita_clasificacion: valor('ita_clasificacion'),
        ita_descripciontec: valor('ita_descripciontec'),
        ita_notastech: valor('ita_notastech'),
        ita_macadrees: valor('ita_macadrees'),
        ita_ipadrees: valor('ita_ipadrees'),
        ita_rol: valor('ita_rol'),
        ita_iprdp: valor('ita_iprdp'),
        ita_idrdp1: valor('ita_idrdp1'),
        ita_idrdp2: valor('ita_idrdp2'),
        ita_functional_units: parseInt(document.getElementById('ita_functional_units').value, 10) || null,
        ita_idemployees: parseInt(document.getElementById('ita_idemployees').value, 10) || null,
        ita_status: document.getElementById('ita_status').value === 'true',
    };
}

function _ark_it_assets_poblar_form(reg) {
    document.getElementById('ita_codigo').value = reg.ita_codigo ?? '';
    document.getElementById('ita_descripcion').value = reg.ita_descripcion ?? '';
    document.getElementById('ita_marca').value = reg.ita_marca ?? '';
    document.getElementById('ita_clasificacion').value = reg.ita_clasificacion ?? '';
    document.getElementById('ita_descripciontec').value = reg.ita_descripciontec ?? '';
    document.getElementById('ita_notastech').value = reg.ita_notastech ?? '';
    document.getElementById('ita_macadrees').value = reg.ita_macadrees ?? '';
    document.getElementById('ita_ipadrees').value = reg.ita_ipadrees ?? '';
    document.getElementById('ita_rol').value = reg.ita_rol ?? '';
    document.getElementById('ita_iprdp').value = reg.ita_iprdp ?? '';
    document.getElementById('ita_idrdp1').value = reg.ita_idrdp1 ?? '';
    document.getElementById('ita_idrdp2').value = reg.ita_idrdp2 ?? '';
    document.getElementById('ita_functional_units').value = String(reg.ita_functional_units ?? '');
    document.getElementById('ita_idemployees').value = String(reg.ita_idemployees ?? '');
    document.getElementById('ita_status').value = String(reg.ita_status);
    document.getElementById('ita_fechacreacion').value = reg.ita_fechacreacion ? new Date(reg.ita_fechacreacion).toLocaleString() : '';
}

async function _ark_it_assets_cargar_registro(idauto) {
    const { data, error } = await supabaseClient
        .from('ark_it_assets')
        .select('*')
        .eq('ita_idauto', idauto)
        .maybeSingle();
    if (error) throw error;
    return data;
}

function _ark_it_assets_incluir() {
    document.getElementById('ark-form-it-assets').dataset.idauto = '';
    _ark_it_assets_limpiar_form();
    _ark_it_assets_estado('nuevo');
}

async function _ark_it_assets_editar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    try {
        const reg = await _ark_it_assets_cargar_registro(tr.dataset.idauto);
        if (!reg) {
            _ark_it_assets_mostrar_mensaje('Registro no encontrado.', 'error');
            return;
        }
        document.getElementById('ark-form-it-assets').dataset.idauto = String(reg.ita_idauto);
        _ark_it_assets_poblar_form(reg);
        _ark_it_assets_estado('edicion');
    } catch (err) {
        _ark_it_assets_mostrar_mensaje('Error al cargar el registro: ' + err.message, 'error');
    }
}

function _ark_it_assets_cancelar() {
    document.getElementById('ark-form-it-assets').dataset.idauto = '';
    _ark_it_assets_limpiar_form();
    _ark_it_assets_estado('consulta');
    _ark_it_assets_cargar('');
}

async function _ark_it_assets_guardar() {
    const form = document.getElementById('ark-form-it-assets');
    const idauto = form.dataset.idauto || '';
    const valores = _ark_it_assets_leer_form();
    if (!valores.ita_codigo) {
        _ark_it_assets_mostrar_mensaje('El código es obligatorio.', 'error');
        return;
    }
    try {
        const usuario = await _ark_it_assets_usuario_auditoria();
        if (idauto === '') {
            valores.ita_namemachine = 'WEB';
            valores.ita_usercreator = usuario;
            const { error } = await supabaseClient.from('ark_it_assets').insert(valores);
            if (error) throw error;
            _ark_it_assets_mostrar_mensaje('Registro insertado correctamente.');
        } else {
            valores.ita_lastmachine = 'WEB';
            valores.ita_userlastupdate = usuario;
            const { error } = await supabaseClient.from('ark_it_assets').update(valores).eq('ita_idauto', idauto);
            if (error) throw error;
            _ark_it_assets_mostrar_mensaje('Registro actualizado correctamente.');
        }
        form.dataset.idauto = '';
        _ark_it_assets_limpiar_form();
        _ark_it_assets_estado('consulta');
        await _ark_it_assets_cargar('');
    } catch (err) {
        _ark_it_assets_mostrar_mensaje('Error al guardar: ' + err.message, 'error');
    }
}

async function _ark_it_assets_borrar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    if (!confirm('¿Desea eliminar el registro seleccionado?')) return;
    try {
        const { error } = await supabaseClient.from('ark_it_assets').delete().eq('ita_idauto', tr.dataset.idauto);
        if (error) throw error;
        _ark_it_assets_mostrar_mensaje('Registro eliminado correctamente.');
        _ark_it_assets_limpiar_form();
        _ark_it_assets_estado('consulta');
        await _ark_it_assets_cargar('');
    } catch (err) {
        _ark_it_assets_mostrar_mensaje('Error al eliminar: ' + err.message, 'error');
    }
}
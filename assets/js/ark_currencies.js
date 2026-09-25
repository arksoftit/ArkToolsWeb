async function renderArkCurrencies() {
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
            <h2>Monedas</h2>
            <div id="ark-mensaje" class="ark-mensaje" style="display:none;"></div>
            <form id="ark-form-currencies" autocomplete="off">
                <fieldset class="ark-grupo">
                    <legend>Datos Generales</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="mda_codigo">Código</label>
                            <input type="text" id="mda_codigo" maxlength="10" required>
                        </div>
                        <div class="ark-campo">
                            <label for="mda_status">Estado</label>
                            <select id="mda_status">
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                        <div class="ark-campo" style="grid-column: 1 / -1;">
                            <label for="mda_descripcion">Descripción</label>
                            <input type="text" id="mda_descripcion" maxlength="100">
                        </div>
                        <div class="ark-campo">
                            <label for="mda_iso4217">ISO 4217</label>
                            <input type="text" id="mda_iso4217" maxlength="10">
                        </div>
                        <div class="ark-campo">
                            <label for="mda_simbolo">Símbolo</label>
                            <input type="text" id="mda_simbolo" maxlength="10">
                        </div>
                    </div>
                </fieldset>
                <fieldset class="ark-grupo">
                    <legend>Factores y Cálculo</legend>
                    <div class="ark-grid">
                        <div class="ark-campo">
                            <label for="mda_factoractivo">Factor Activo</label>
                            <input type="number" step="any" id="mda_factoractivo">
                        </div>
                        <div class="ark-campo">
                            <label for="mda_factorpasivo">Factor Pasivo</label>
                            <input type="number" step="any" id="mda_factorpasivo">
                        </div>
                        <div class="ark-campo">
                            <label for="mda_operadorcalculo">Operador Cálculo</label>
                            <select id="mda_operadorcalculo">
                                <option value="1">Suma</option>
                                <option value="2">Resta</option>
                                <option value="3">Multiplicación</option>
                                <option value="4">División</option>
                            </select>
                        </div>
                        <div class="ark-campo">
                            <label for="mda_aplicaimp">Aplica Impuesto</label>
                            <select id="mda_aplicaimp">
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div class="ark-campo">
                            <label for="mda_fechacreacion">Fecha Creación</label>
                            <input type="text" id="mda_fechacreacion" readonly>
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
                        <th>ISO</th>
                        <th>Símbolo</th>
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
    _ark_currencies_init();
}

async function _ark_currencies_init() {
    _ark_currencies_estado('consulta');
    await _ark_currencies_cargar('');
    document.getElementById('btn_buscar').addEventListener('click', () => {
        const codigo = document.getElementById('input_buscar_codigo').value.trim();
        _ark_currencies_cargar(codigo);
    });
    document.getElementById('btn_listar_todo').addEventListener('click', () => {
        document.getElementById('input_buscar_codigo').value = '';
        _ark_currencies_cargar('');
    });
    document.getElementById('input_buscar_codigo').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btn_buscar').click();
        }
    });
    document.getElementById('btn_incluir').addEventListener('click', _ark_currencies_incluir);
    document.getElementById('btn_guardar').addEventListener('click', _ark_currencies_guardar);
    document.getElementById('btn_editar').addEventListener('click', _ark_currencies_editar);
    document.getElementById('btn_cancelar').addEventListener('click', _ark_currencies_cancelar);
    document.getElementById('btn_borrar').addEventListener('click', _ark_currencies_borrar);
}

async function _ark_currencies_cargar(filtroCodigo) {
    try {
        let query = supabaseClient
            .from('ark_currencies')
            .select('mda_idauto, mda_codigo, mda_descripcion, mda_iso4217, mda_simbolo, mda_status')
            .order('mda_codigo', { ascending: true });
        if (filtroCodigo) {
            query = query.ilike('mda_codigo', `%${filtroCodigo}%`);
        }
        const { data, error } = await query;
        if (error) throw error;
        _ark_currencies_pintar_tabla(data || []);
    } catch (err) {
        _ark_currencies_mostrar_mensaje('Error al cargar: ' + err.message, 'error');
    }
}

function _ark_currencies_pintar_tabla(filas) {
    const tbody = document.querySelector('#tabla_registros tbody');
    tbody.innerHTML = '';
    if (filas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#888;">Sin registros</td></tr>';
        return;
    }
    filas.forEach(f => {
        const tr = document.createElement('tr');
        tr.dataset.idauto = f.mda_idauto;
        tr.dataset.row = JSON.stringify(f);
        tr.innerHTML = `
            <td>${f.mda_codigo}</td>
            <td>${f.mda_descripcion ?? ''}</td>
            <td>${f.mda_iso4217 ?? ''}</td>
            <td>${f.mda_simbolo ?? ''}</td>
            <td>${f.mda_status ? 'Activo' : 'Inactivo'}</td>
        `;
        tr.addEventListener('click', () => {
            document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
            tr.classList.add('seleccionada');
            _ark_currencies_estado('seleccion');
        });
        tbody.appendChild(tr);
    });
}

function _ark_currencies_estado(modo) {
    const btnInc = document.getElementById('btn_incluir');
    const btnGua = document.getElementById('btn_guardar');
    const btnEdi = document.getElementById('btn_editar');
    const btnCan = document.getElementById('btn_cancelar');
    const btnBor = document.getElementById('btn_borrar');
    const campos = document.querySelectorAll('#ark-form-currencies input, #ark-form-currencies select, #ark-form-currencies textarea');
    if (modo === 'consulta') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = true;
        btnCan.disabled = true; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'mda_fechacreacion') c.disabled = true; });
        _ark_currencies_limpiar_form();
    } else if (modo === 'seleccion') {
        btnInc.disabled = false; btnGua.disabled = true; btnEdi.disabled = false;
        btnCan.disabled = true; btnBor.disabled = false;
        campos.forEach(c => c.disabled = true);
    } else if (modo === 'edicion') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'mda_codigo' && c.id !== 'mda_fechacreacion') c.disabled = false; });
    } else if (modo === 'nuevo') {
        btnInc.disabled = true; btnGua.disabled = false; btnEdi.disabled = true;
        btnCan.disabled = false; btnBor.disabled = true;
        campos.forEach(c => { if (c.id !== 'mda_fechacreacion') c.disabled = false; });
        _ark_currencies_limpiar_form();
    }
}

function _ark_currencies_limpiar_form() {
    document.getElementById('mda_codigo').value = '';
    document.getElementById('mda_descripcion').value = '';
    document.getElementById('mda_iso4217').value = '';
    document.getElementById('mda_simbolo').value = '';
    document.getElementById('mda_factoractivo').value = '';
    document.getElementById('mda_factorpasivo').value = '';
    document.getElementById('mda_operadorcalculo').value = '1';
    document.getElementById('mda_aplicaimp').value = 'false';
    document.getElementById('mda_status').value = 'true';
    document.getElementById('mda_fechacreacion').value = '';
    document.querySelectorAll('#tabla_registros tr.seleccionada').forEach(r => r.classList.remove('seleccionada'));
}

function _ark_currencies_mostrar_mensaje(texto, tipo) {
    const el = document.getElementById('ark-mensaje');
    el.textContent = texto;
    el.className = 'ark-mensaje ' + (tipo || 'ok');
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

async function _ark_currencies_usuario_auditoria() {
    const { data } = await supabaseClient.auth.getUser();
    return data.user ? data.user.email : 'WEB';
}

function _ark_currencies_leer_form() {
    const valor = (id) => {
        const texto = document.getElementById(id).value.trim();
        return texto === '' ? null : texto;
    };
    return {
        mda_codigo: valor('mda_codigo'),
        mda_descripcion: valor('mda_descripcion'),
        mda_iso4217: valor('mda_iso4217'),
        mda_simbolo: valor('mda_simbolo'),
        mda_factoractivo: parseFloat(document.getElementById('mda_factoractivo').value) || null,
        mda_factorpasivo: parseFloat(document.getElementById('mda_factorpasivo').value) || null,
        mda_operadorcalculo: parseInt(document.getElementById('mda_operadorcalculo').value, 10) || null,
        mda_aplicaimp: document.getElementById('mda_aplicaimp').value === 'true',
        mda_status: document.getElementById('mda_status').value === 'true',
    };
}

function _ark_currencies_poblar_form(reg) {
    document.getElementById('mda_codigo').value = reg.mda_codigo ?? '';
    document.getElementById('mda_descripcion').value = reg.mda_descripcion ?? '';
    document.getElementById('mda_iso4217').value = reg.mda_iso4217 ?? '';
    document.getElementById('mda_simbolo').value = reg.mda_simbolo ?? '';
    document.getElementById('mda_factoractivo').value = reg.mda_factoractivo ?? '';
    document.getElementById('mda_factorpasivo').value = reg.mda_factorpasivo ?? '';
    document.getElementById('mda_operadorcalculo').value = String(reg.mda_operadorcalculo ?? 1);
    document.getElementById('mda_aplicaimp').value = String(reg.mda_aplicaimp);
    document.getElementById('mda_status').value = String(reg.mda_status);
    document.getElementById('mda_fechacreacion').value = reg.mda_fechacreacion ? new Date(reg.mda_fechacreacion).toLocaleString() : '';
}

async function _ark_currencies_cargar_registro(idauto) {
    const { data, error } = await supabaseClient
        .from('ark_currencies')
        .select('*')
        .eq('mda_idauto', idauto)
        .maybeSingle();
    if (error) throw error;
    return data;
}

function _ark_currencies_incluir() {
    document.getElementById('ark-form-currencies').dataset.idauto = '';
    _ark_currencies_limpiar_form();
    _ark_currencies_estado('nuevo');
}

async function _ark_currencies_editar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    try {
        const reg = await _ark_currencies_cargar_registro(tr.dataset.idauto);
        if (!reg) {
            _ark_currencies_mostrar_mensaje('Registro no encontrado.', 'error');
            return;
        }
        document.getElementById('ark-form-currencies').dataset.idauto = String(reg.mda_idauto);
        _ark_currencies_poblar_form(reg);
        _ark_currencies_estado('edicion');
    } catch (err) {
        _ark_currencies_mostrar_mensaje('Error al cargar el registro: ' + err.message, 'error');
    }
}

function _ark_currencies_cancelar() {
    document.getElementById('ark-form-currencies').dataset.idauto = '';
    _ark_currencies_limpiar_form();
    _ark_currencies_estado('consulta');
    _ark_currencies_cargar('');
}

async function _ark_currencies_guardar() {
    const form = document.getElementById('ark-form-currencies');
    const idauto = form.dataset.idauto || '';
    const valores = _ark_currencies_leer_form();
    if (!valores.mda_codigo) {
        _ark_currencies_mostrar_mensaje('El código es obligatorio.', 'error');
        return;
    }
    try {
        const usuario = await _ark_currencies_usuario_auditoria();
        if (idauto === '') {
            valores.mda_namemachine = 'WEB';
            valores.mda_usercreator = usuario;
            const { error } = await supabaseClient.from('ark_currencies').insert(valores);
            if (error) throw error;
            _ark_currencies_mostrar_mensaje('Registro insertado correctamente.');
        } else {
            valores.mda_lastmachine = 'WEB';
            valores.mda_userlastupdate = usuario;
            const { error } = await supabaseClient.from('ark_currencies').update(valores).eq('mda_idauto', idauto);
            if (error) throw error;
            _ark_currencies_mostrar_mensaje('Registro actualizado correctamente.');
        }
        form.dataset.idauto = '';
        _ark_currencies_limpiar_form();
        _ark_currencies_estado('consulta');
        await _ark_currencies_cargar('');
    } catch (err) {
        _ark_currencies_mostrar_mensaje('Error al guardar: ' + err.message, 'error');
    }
}

async function _ark_currencies_borrar() {
    const tr = document.querySelector('#tabla_registros tr.seleccionada');
    if (!tr) return;
    if (!confirm('¿Desea eliminar el registro seleccionado?')) return;
    try {
        const { error } = await supabaseClient.from('ark_currencies').delete().eq('mda_idauto', tr.dataset.idauto);
        if (error) throw error;
        _ark_currencies_mostrar_mensaje('Registro eliminado correctamente.');
        _ark_currencies_limpiar_form();
        _ark_currencies_estado('consulta');
        await _ark_currencies_cargar('');
    } catch (err) {
        _ark_currencies_mostrar_mensaje('Error al eliminar: ' + err.message, 'error');
    }
}
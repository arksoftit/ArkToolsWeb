document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    const dashboard = document.getElementById('dashboard');

    const cerrarSesion = async () => {
        await supabaseClient.auth.signOut();
        window.location.href = 'login.html';
    };

    if (navMenu) {
        navMenu.addEventListener('click', async (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const modulo = e.target.dataset.modulo;

                if (modulo === 'cerrar') {
                    cerrarSesion();
                    return;
                }

                if (modulo === 'empresa') {
                    renderArkCompany();
                    return;
                }

                if (modulo === 'usuarios') {
                    renderArkUsers();
                    return;
                }

                if (modulo === 'clientes') {
                    renderArkClients();
                    return;
                }

                if (modulo === 'categorias') {
                    renderArkActionCategories();
                    return;
                }

                if (modulo === 'acciones') {
                    renderArkActions();
                    return;
                }

                if (modulo === 'tipos') {
                    renderArkDeviceTypes();
                    return;
                }

                if (modulo === 'monedas') {
                    renderArkCurrencies();
                    return;
                }
                
                if (modulo === 'empleados') {
                    renderArkEmployees();
                    return;
                }

                if (modulo === 'unidades') {
                    renderArkFunctionalUnits();
                    return;
                }

                if (modulo === 'recursos') {
                    renderArkItAssets();
                    return;
                }

                if (modulo === 'profesiones') {
                    renderArkJobTitles();
                    return;
                }

                if (modulo === 'solicitudes') {
                    renderArkRequests();
                    return;
                }   

                if (modulo === 'sesiones') {
                    renderArkSessions();
                    return;
                }   
                
                if (modulo === 'main-menu') {
                    dashboard.innerHTML = '<h2>Panel principal</h2><p>Bienvenido al sistema de control de sesiones y visitas.</p>';
                    return;
                }

                dashboard.innerHTML = `<h2>${modulo}</h2><p>Módulo en desarrollo...</p>`;
            }
        });
    }

    const botonCerrarIcono = document.getElementById('cerrar-sesion-icono');
    if (botonCerrarIcono) {
        botonCerrarIcono.addEventListener('click', cerrarSesion);
    }
});

async function _ark_cargar_empresa_usuario() {
    const elEmpresa = document.getElementById('empresa-activa');
    if (!elEmpresa) return;
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
        elEmpresa.textContent = '';
        return;
    }
    try {
        const { data: userData } = await supabaseClient
            .from('ark_users')
            .select('usr_emp_idauto')
            .eq('usr_login', user.email)
            .maybeSingle();
        if (!userData || !userData.usr_emp_idauto) {
            elEmpresa.textContent = 'Sin Empresa Asignada';
            return;
        }
        const { data: companyData } = await supabaseClient
            .from('ark_company')
            .select('emp_descripcion')
            .eq('emp_idauto', userData.usr_emp_idauto)
            .maybeSingle();
        elEmpresa.textContent = (companyData && companyData.emp_descripcion) ? companyData.emp_descripcion : 'Sin Empresa Asignada';
    } catch (err) {
        elEmpresa.textContent = 'Sin Empresa Asignada';
    }
}


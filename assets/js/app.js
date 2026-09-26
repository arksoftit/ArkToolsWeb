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
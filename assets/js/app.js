document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    const dashboard = document.getElementById('dashboard');
    
    if (navMenu) {
        navMenu.addEventListener('click', async (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const modulo = e.target.dataset.modulo;
                
                if (modulo === 'cerrar') {
                    await supabase.auth.signOut();
                    window.location.href = 'login.html';
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
});
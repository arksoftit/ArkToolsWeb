document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const mensaje = document.getElementById('login-mensaje');
    
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            try {
                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email,
                    password
                });
                
                if (error) throw error;
                
                window.location.href = 'index.html';
            } catch (error) {
                mensaje.textContent = error.message;
            }
        });
    }
    
    const usuarioActivo = document.getElementById('usuario-activo');
    if (usuarioActivo) {
        supabaseClient.auth.getUser().then(({ data: { user } }) => {
            if (!user) {
                window.location.href = 'login.html';
            } else {
                usuarioActivo.textContent = user.email;
            }
        });
    }
});
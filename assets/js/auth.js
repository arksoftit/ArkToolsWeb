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
                _ark_cargar_empresa_usuario();
            }
        });
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
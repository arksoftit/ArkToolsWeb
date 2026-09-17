INSERT INTO ark_users (
    usr_Codigo,
    usr_login,
    usr_Descripcion,
    usr_Status,
    usr_Rol,
    usr_EmailUsuario,
    usr_auth_id
)
SELECT
    'U-0001',
    'juepae@outlook.com',
    'Juanep',
    true,
    'ADMIN',
    'juepae@outlook.com',
    id
FROM auth.users
WHERE email = 'juepae@outlook.com'
ON CONFLICT (usr_auth_id) DO NOTHING;
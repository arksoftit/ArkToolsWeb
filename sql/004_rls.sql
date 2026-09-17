BEGIN;

CREATE OR REPLACE FUNCTION fn_rol_usuario_actual()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT usr_Rol
    FROM ark_users
    WHERE usr_auth_id = auth.uid()
    LIMIT 1;
$$;

ALTER TABLE ark_action_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_company ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_currencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_device_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_functional_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_it_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_job_titles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ark_sessions_details ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS pol_ark_action_categories_admin ON ark_action_categories;
CREATE POLICY pol_ark_action_categories_admin ON ark_action_categories
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_action_categories_lectura ON ark_action_categories;
CREATE POLICY pol_ark_action_categories_lectura ON ark_action_categories
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));

DROP POLICY IF EXISTS pol_ark_actions_admin ON ark_actions;
CREATE POLICY pol_ark_actions_admin ON ark_actions
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_actions_lectura ON ark_actions;
CREATE POLICY pol_ark_actions_lectura ON ark_actions
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));

DROP POLICY IF EXISTS pol_ark_clients_admin ON ark_clients;
CREATE POLICY pol_ark_clients_admin ON ark_clients
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_clients_lectura ON ark_clients;
CREATE POLICY pol_ark_clients_lectura ON ark_clients
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));

DROP POLICY IF EXISTS pol_ark_company_admin ON ark_company;
CREATE POLICY pol_ark_company_admin ON ark_company
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_company_lectura ON ark_company;
CREATE POLICY pol_ark_company_lectura ON ark_company
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));

DROP POLICY IF EXISTS pol_ark_currencies_admin ON ark_currencies;
CREATE POLICY pol_ark_currencies_admin ON ark_currencies
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_currencies_lectura ON ark_currencies;
CREATE POLICY pol_ark_currencies_lectura ON ark_currencies
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));

DROP POLICY IF EXISTS pol_ark_device_types_admin ON ark_device_types;
CREATE POLICY pol_ark_device_types_admin ON ark_device_types
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_device_types_lectura ON ark_device_types;
CREATE POLICY pol_ark_device_types_lectura ON ark_device_types
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));

DROP POLICY IF EXISTS pol_ark_employees_admin ON ark_employees;
CREATE POLICY pol_ark_employees_admin ON ark_employees
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_employees_lectura ON ark_employees;
CREATE POLICY pol_ark_employees_lectura ON ark_employees
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));

DROP POLICY IF EXISTS pol_ark_functional_units_admin ON ark_functional_units;
CREATE POLICY pol_ark_functional_units_admin ON ark_functional_units
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_functional_units_lectura ON ark_functional_units;
CREATE POLICY pol_ark_functional_units_lectura ON ark_functional_units
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));

DROP POLICY IF EXISTS pol_ark_it_assets_admin ON ark_it_assets;
CREATE POLICY pol_ark_it_assets_admin ON ark_it_assets
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_it_assets_lectura ON ark_it_assets;
CREATE POLICY pol_ark_it_assets_lectura ON ark_it_assets
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));

DROP POLICY IF EXISTS pol_ark_job_titles_admin ON ark_job_titles;
CREATE POLICY pol_ark_job_titles_admin ON ark_job_titles
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_job_titles_lectura ON ark_job_titles;
CREATE POLICY pol_ark_job_titles_lectura ON ark_job_titles
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));

DROP POLICY IF EXISTS pol_ark_users_admin ON ark_users;
CREATE POLICY pol_ark_users_admin ON ark_users
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_users_lectura ON ark_users;
CREATE POLICY pol_ark_users_lectura ON ark_users
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));

DROP POLICY IF EXISTS pol_ark_requests_admin ON ark_requests;
CREATE POLICY pol_ark_requests_admin ON ark_requests
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_requests_lectura ON ark_requests;
CREATE POLICY pol_ark_requests_lectura ON ark_requests
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));
DROP POLICY IF EXISTS pol_ark_requests_consultor_insert ON ark_requests;
CREATE POLICY pol_ark_requests_consultor_insert ON ark_requests
    FOR INSERT TO authenticated
    WITH CHECK (fn_rol_usuario_actual() = 'CONSULTOR');
DROP POLICY IF EXISTS pol_ark_requests_consultor_update ON ark_requests;
CREATE POLICY pol_ark_requests_consultor_update ON ark_requests
    FOR UPDATE TO authenticated
    USING (fn_rol_usuario_actual() = 'CONSULTOR')
    WITH CHECK (fn_rol_usuario_actual() = 'CONSULTOR');

DROP POLICY IF EXISTS pol_ark_sessions_admin ON ark_sessions;
CREATE POLICY pol_ark_sessions_admin ON ark_sessions
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_sessions_lectura ON ark_sessions;
CREATE POLICY pol_ark_sessions_lectura ON ark_sessions
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));
DROP POLICY IF EXISTS pol_ark_sessions_consultor_insert ON ark_sessions;
CREATE POLICY pol_ark_sessions_consultor_insert ON ark_sessions
    FOR INSERT TO authenticated
    WITH CHECK (fn_rol_usuario_actual() = 'CONSULTOR');
DROP POLICY IF EXISTS pol_ark_sessions_consultor_update ON ark_sessions;
CREATE POLICY pol_ark_sessions_consultor_update ON ark_sessions
    FOR UPDATE TO authenticated
    USING (fn_rol_usuario_actual() = 'CONSULTOR')
    WITH CHECK (fn_rol_usuario_actual() = 'CONSULTOR');

DROP POLICY IF EXISTS pol_ark_sessions_details_admin ON ark_sessions_details;
CREATE POLICY pol_ark_sessions_details_admin ON ark_sessions_details
    FOR ALL TO authenticated
    USING (fn_rol_usuario_actual() = 'ADMIN')
    WITH CHECK (fn_rol_usuario_actual() = 'ADMIN');
DROP POLICY IF EXISTS pol_ark_sessions_details_lectura ON ark_sessions_details;
CREATE POLICY pol_ark_sessions_details_lectura ON ark_sessions_details
    FOR SELECT TO authenticated
    USING (fn_rol_usuario_actual() IN ('CONSULTOR', 'LECTOR'));
DROP POLICY IF EXISTS pol_ark_sessions_details_consultor_insert ON ark_sessions_details;
CREATE POLICY pol_ark_sessions_details_consultor_insert ON ark_sessions_details
    FOR INSERT TO authenticated
    WITH CHECK (fn_rol_usuario_actual() = 'CONSULTOR');
DROP POLICY IF EXISTS pol_ark_sessions_details_consultor_update ON ark_sessions_details;
CREATE POLICY pol_ark_sessions_details_consultor_update ON ark_sessions_details
    FOR UPDATE TO authenticated
    USING (fn_rol_usuario_actual() = 'CONSULTOR')
    WITH CHECK (fn_rol_usuario_actual() = 'CONSULTOR');

COMMIT;
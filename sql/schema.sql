BEGIN;

CREATE TABLE IF NOT EXISTS ark_action_categories (
    cat_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cat_Codigo TEXT NOT NULL UNIQUE,
    cat_Descripcion TEXT,
    cat_Status BOOLEAN NOT NULL DEFAULT true,
    cat_DescripcionTec TEXT,
    cat_FechaCreacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    cat_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    cat_NameMachine TEXT,
    cat_UserCreator TEXT,
    cat_FechaUltimaActualizacion TIMESTAMPTZ,
    cat_LastMachine TEXT,
    cat_UserLastUpdate TEXT
);

CREATE TABLE IF NOT EXISTS ark_actions (
    act_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    act_Codigo TEXT NOT NULL UNIQUE,
    act_Descripcion TEXT,
    act_Status BOOLEAN NOT NULL DEFAULT true,
    act_DescripcionTec TEXT,
    act_FechaCreacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    id_category INTEGER REFERENCES ark_action_categories (cat_IDauto),
    act_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    act_NameMachine TEXT,
    act_UserCreator TEXT,
    act_FechaUltimaActualizacion TIMESTAMPTZ,
    act_LastMachine TEXT,
    act_UserLastUpdate TEXT
);

CREATE TABLE IF NOT EXISTS ark_job_titles (
    job_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_Codigo TEXT NOT NULL UNIQUE,
    job_Descripcion TEXT,
    job_Status BOOLEAN NOT NULL DEFAULT true,
    job_DescripcionTec TEXT,
    job_FechaCreacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    job_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    job_NameMachine TEXT,
    job_UserCreator TEXT,
    job_FechaUltimaActualizacion TIMESTAMPTZ,
    job_LastMachine TEXT,
    job_UserLastUpdate TEXT
);

CREATE TABLE IF NOT EXISTS ark_clients (
    clt_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    clt_Codigo TEXT NOT NULL UNIQUE,
    clt_Descripcion TEXT,
    clt_IDfiscal TEXT,
    clt_Status BOOLEAN NOT NULL DEFAULT true,
    clt_DireccionF TEXT,
    clt_DireccionL TEXT,
    clt_Telefono1 TEXT,
    clt_Telefono2 TEXT,
    clt_Representante TEXT,
    clt_IDRepresentante TEXT,
    clt_TelefonoContacto TEXT,
    clt_EmailContacto TEXT,
    clt_EmailEmpresa TEXT,
    clt_TipoContribuyente INTEGER,
    clt_Origen TEXT,
    clt_CodigoOrigen TEXT,
    clt_FechaCreacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    clt_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    clt_NameMachine TEXT,
    clt_UserCreator TEXT,
    clt_FechaUltimaActualizacion TIMESTAMPTZ,
    clt_LastMachine TEXT,
    clt_UserLastUpdate TEXT
);

CREATE TABLE IF NOT EXISTS ark_company (
    emp_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    emp_Codigo TEXT NOT NULL UNIQUE,
    emp_Descripcion TEXT,
    emp_IDfiscal TEXT,
    emp_Status BOOLEAN NOT NULL DEFAULT true,
    emp_DireccionF TEXT,
    emp_DireccionL TEXT,
    emp_Telefono1 TEXT,
    emp_Telefono2 TEXT,
    emp_Representante TEXT,
    emp_IdRepresentante TEXT,
    emp_TelefonoContacto TEXT,
    emp_EmailContacto TEXT,
    emp_EmailEmpresa TEXT,
    emp_TipoContribuyente INTEGER,
    emp_FechaCreacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    emp_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    emp_NameMachine TEXT,
    emp_UserCreator TEXT,
    emp_FechaUltimaActualizacion TIMESTAMPTZ,
    emp_LastMachine TEXT,
    emp_UserLastUpdate TEXT
);

CREATE TABLE IF NOT EXISTS ark_currencies (
    mda_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    mda_Codigo TEXT NOT NULL UNIQUE,
    mda_Descripcion TEXT,
    mda_Status BOOLEAN NOT NULL DEFAULT true,
    mda_ISO4217 TEXT,
    mda_Simbolo TEXT,
    mda_FactorActivo DOUBLE PRECISION,
    mda_FactorPasivo DOUBLE PRECISION,
    mda_OperadorCalculo INTEGER,
    mda_AplicaImp BOOLEAN NOT NULL DEFAULT false,
    mda_FechaCreacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    mda_FechaActualizacion TIMESTAMPTZ,
    mda_FechaUltima TIMESTAMPTZ,
    mda_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    mda_NameMachine TEXT,
    mda_UserCreator TEXT,
    mda_FechaUltimaActualizacion TIMESTAMPTZ,
    mda_LastMachine TEXT,
    mda_UserLastUpdate TEXT
);

CREATE TABLE IF NOT EXISTS ark_device_types (
    dty_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    dty_Codigo TEXT NOT NULL UNIQUE,
    dty_Descripcion TEXT,
    dty_Status BOOLEAN NOT NULL DEFAULT true,
    dty_DescripcionTec TEXT,
    dty_FechaCreacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    dty_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    dty_NameMachine TEXT,
    dty_UserCreator TEXT,
    dty_FechaUltimaActualizacion TIMESTAMPTZ,
    dty_LastMachine TEXT,
    dty_UserLastUpdate TEXT
);

CREATE TABLE IF NOT EXISTS ark_functional_units (
    fun_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fun_Codigo TEXT NOT NULL UNIQUE,
    fun_Descripcion TEXT,
    fun_DescripcionTec TEXT,
    fun_Status BOOLEAN NOT NULL DEFAULT true,
    fun_FechaCreacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    fun_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    fun_NameMachine TEXT,
    fun_UserCreator TEXT,
    fun_FechaUltimaActualizacion TIMESTAMPTZ,
    fun_LastMachine TEXT,
    fun_UserLastUpdate TEXT
);

CREATE TABLE IF NOT EXISTS ark_employees (
    emy_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    emy_Codigo TEXT NOT NULL UNIQUE,
    emy_Descripcion TEXT,
    emy_Status BOOLEAN NOT NULL DEFAULT true,
    emy_IDEmployees TEXT,
    emy_Telefono1 TEXT,
    emy_Cargo INTEGER REFERENCES ark_job_titles (job_IDauto),
    emy_Cliente INTEGER REFERENCES ark_clients (clt_IDauto),
    emy_Rol TEXT,
    emy_EmailUsuario TEXT,
    emy_Password TEXT,
    emy_FechaCreacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    emy_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    emy_NameMachine TEXT,
    emy_UserCreator TEXT,
    emy_FechaUltimaActualizacion TIMESTAMPTZ,
    emy_LastMachine TEXT,
    emy_UserLastUpdate TEXT
);

CREATE TABLE IF NOT EXISTS ark_users (
    usr_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usr_Codigo TEXT NOT NULL UNIQUE,
    usr_login TEXT UNIQUE,
    usr_Descripcion TEXT,
    usr_Status BOOLEAN NOT NULL DEFAULT true,
    usr_Telefono TEXT,
    usr_Cargo TEXT,
    usr_Rol TEXT,
    usr_EmailUsuario TEXT,
    usr_auth_id UUID UNIQUE REFERENCES auth.users (id) ON DELETE SET NULL,
    usr_FechaCreacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    usr_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    usr_NameMachine TEXT,
    usr_UserCreator TEXT,
    usr_FechaUltimaActualizacion TIMESTAMPTZ,
    usr_LastMachine TEXT,
    usr_UserLastUpdate TEXT,
    id_employee INTEGER REFERENCES ark_employees (emy_IDauto)
);

CREATE TABLE IF NOT EXISTS ark_it_assets (
    ita_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ita_Codigo TEXT NOT NULL UNIQUE,
    ita_Descripcion TEXT,
    ita_marca TEXT,
    ita_Clasificacion TEXT,
    ita_Status BOOLEAN NOT NULL DEFAULT true,
    ita_DescripcionTec TEXT,
    ita_NotasTech TEXT,
    ita_macadrees TEXT,
    ita_ipadrees TEXT,
    ita_functional_units INTEGER REFERENCES ark_functional_units (fun_IDauto),
    ita_Rol TEXT,
    ita_idRDP1 TEXT,
    ita_idRDP2 TEXT,
    ita_iprdp TEXT,
    ita_idemployees INTEGER REFERENCES ark_employees (emy_IDauto),
    ita_FechaCreacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    ita_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    ita_NameMachine TEXT,
    ita_UserCreator TEXT,
    ita_FechaUltimaActualizacion TIMESTAMPTZ,
    ita_LastMachine TEXT,
    ita_UserLastUpdate TEXT
);

CREATE TABLE IF NOT EXISTS ark_requests (
    req_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    req_Codigo TEXT NOT NULL UNIQUE,
    req_Descripcion TEXT,
    req_Status BOOLEAN NOT NULL DEFAULT true,
    req_DescripcionTec TEXT,
    req_FechaCreacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    req_CodigoCliente INTEGER REFERENCES ark_clients (clt_IDauto),
    req_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    req_NameMachine TEXT,
    req_UserCreator TEXT,
    req_FechaUltimaActualizacion TIMESTAMPTZ,
    req_LastMachine TEXT,
    req_UserLastUpdate TEXT
);

CREATE TABLE IF NOT EXISTS ark_sessions (
    ses_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ses_numero VARCHAR(8) UNIQUE,
    ses_Status TEXT,
    ses_FechaEmision TIMESTAMPTZ NOT NULL DEFAULT now(),
    ses_clt_IDauto INTEGER REFERENCES ark_clients (clt_IDauto),
    ses_usr_IDauto INTEGER REFERENCES ark_users (usr_IDauto),
    ses_FechaHoraInicial TIMESTAMPTZ,
    ses_FechaHoraFinal TIMESTAMPTZ,
    ses_TotalHora INTEGER,
    ses_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    ses_NameMachine TEXT,
    ses_UserCreator TEXT,
    ses_FechaUltimaActualizacion TIMESTAMPTZ,
    ses_LastMachine TEXT,
    ses_UserLastUpdate TEXT
);

CREATE TABLE IF NOT EXISTS ark_sessions_details (
    dts_IDauto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    dts_ses_IDauto INTEGER REFERENCES ark_sessions (ses_IDauto),
    dts_act_Codigo INTEGER REFERENCES ark_actions (act_IDauto),
    dts_req_IDauto INTEGER REFERENCES ark_requests (req_IDauto),
    dts_description TEXT,
    dts_result TEXT,
    dts_time_spent DOUBLE PRECISION,
    dts_date_logged TIMESTAMPTZ NOT NULL DEFAULT now(),
    dts_FechaSistema TIMESTAMPTZ NOT NULL DEFAULT now(),
    dts_NameMachine TEXT,
    dts_UserCreator TEXT,
    dts_FechaUltimaActualizacion TIMESTAMPTZ,
    dts_LastMachine TEXT,
    dts_UserLastUpdate TEXT,
    dts_FechaSesion TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION fn_marcar_fecha_ultima_actualizacion()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
    col text;
BEGIN
    SELECT c.column_name INTO col
    FROM information_schema.columns c
    WHERE c.table_schema = TG_TABLE_SCHEMA
      AND c.table_name = TG_TABLE_NAME
      AND lower(c.column_name) LIKE '%fechaultimaactualizacion';
    IF col IS NOT NULL THEN
        NEW := jsonb_populate_record(NEW, jsonb_build_object(col, now()));
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_ark_action_categories_actualizacion ON ark_action_categories;
CREATE TRIGGER trg_ark_action_categories_actualizacion
    BEFORE UPDATE ON ark_action_categories
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_actions_actualizacion ON ark_actions;
CREATE TRIGGER trg_ark_actions_actualizacion
    BEFORE UPDATE ON ark_actions
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_job_titles_actualizacion ON ark_job_titles;
CREATE TRIGGER trg_ark_job_titles_actualizacion
    BEFORE UPDATE ON ark_job_titles
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_clients_actualizacion ON ark_clients;
CREATE TRIGGER trg_ark_clients_actualizacion
    BEFORE UPDATE ON ark_clients
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_company_actualizacion ON ark_company;
CREATE TRIGGER trg_ark_company_actualizacion
    BEFORE UPDATE ON ark_company
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_currencies_actualizacion ON ark_currencies;
CREATE TRIGGER trg_ark_currencies_actualizacion
    BEFORE UPDATE ON ark_currencies
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_device_types_actualizacion ON ark_device_types;
CREATE TRIGGER trg_ark_device_types_actualizacion
    BEFORE UPDATE ON ark_device_types
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_functional_units_actualizacion ON ark_functional_units;
CREATE TRIGGER trg_ark_functional_units_actualizacion
    BEFORE UPDATE ON ark_functional_units
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_employees_actualizacion ON ark_employees;
CREATE TRIGGER trg_ark_employees_actualizacion
    BEFORE UPDATE ON ark_employees
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_users_actualizacion ON ark_users;
CREATE TRIGGER trg_ark_users_actualizacion
    BEFORE UPDATE ON ark_users
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_it_assets_actualizacion ON ark_it_assets;
CREATE TRIGGER trg_ark_it_assets_actualizacion
    BEFORE UPDATE ON ark_it_assets
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_requests_actualizacion ON ark_requests;
CREATE TRIGGER trg_ark_requests_actualizacion
    BEFORE UPDATE ON ark_requests
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_sessions_actualizacion ON ark_sessions;
CREATE TRIGGER trg_ark_sessions_actualizacion
    BEFORE UPDATE ON ark_sessions
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

DROP TRIGGER IF EXISTS trg_ark_sessions_details_actualizacion ON ark_sessions_details;
CREATE TRIGGER trg_ark_sessions_details_actualizacion
    BEFORE UPDATE ON ark_sessions_details
    FOR EACH ROW EXECUTE FUNCTION fn_marcar_fecha_ultima_actualizacion();

COMMIT;
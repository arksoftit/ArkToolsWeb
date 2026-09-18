--
-- Archivo generado con SQLiteStudio v3.4.21 el mié sept. 16 18:07:17 2026
--
-- Codificación de texto usada: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Tabla: ark_action_categories
DROP TABLE IF EXISTS ark_action_categories;

CREATE TABLE IF NOT EXISTS ark_action_categories (
    cat_IDauto         INTEGER PRIMARY KEY AUTOINCREMENT,
    cat_Codigo         TEXT    NOT NULL
                               UNIQUE,
    cat_Descripcion    TEXT,
    cat_Status         INTEGER DEFAULT 1,
    cat_DescripcionTec TEXT,
    cat_FechaCreacion  TEXT    DEFAULT (datetime('now') ),
    cat_SystemDate     TEXT,
    cat_SystemTime     TEXT,
    cat_NameMachine    TEXT,
    cat_UserCreator    TEXT,
    cat_LastUpdateDate TEXT,
    cat_LastUpdateTime TEXT,
    cat_LastMachine    TEXT,
    cat_UserLastUpdate TEXT
);


-- Tabla: ark_actions
DROP TABLE IF EXISTS ark_actions;

CREATE TABLE IF NOT EXISTS ark_actions (
    act_IDauto         INTEGER PRIMARY KEY AUTOINCREMENT,
    act_Codigo         TEXT    NOT NULL
                               UNIQUE,
    act_Descripcion    TEXT,
    act_Status         INTEGER DEFAULT 1,
    act_DescripcionTec TEXT,
    act_FechaCreacion  TEXT    DEFAULT (datetime('now') ),
    id_category        INTEGER,
    act_SystemDate     TEXT,
    act_SystemTime     TEXT,
    act_NameMachine    TEXT,
    act_UserCreator    TEXT,
    act_LastUpdateDate TEXT,
    act_LastUpdateTime TEXT,
    act_LastMachine    TEXT,
    act_UserLastUpdate TEXT,
    FOREIGN KEY (
        id_category
    )
    REFERENCES ark_action_categories (cat_IDauto) 
);


-- Tabla: ark_clients
DROP TABLE IF EXISTS ark_clients;

CREATE TABLE IF NOT EXISTS ark_clients (
    clt_IDauto            INTEGER PRIMARY KEY AUTOINCREMENT,
    clt_Codigo            TEXT    NOT NULL
                                  UNIQUE,
    clt_Descripcion       TEXT,
    clt_IDfiscal          TEXT,
    clt_Status            INTEGER DEFAULT 1,
    clt_DireccionF        TEXT,
    clt_DireccionL        TEXT,
    clt_Telefono1         TEXT,
    clt_Telefono2         TEXT,
    clt_Representante     TEXT,
    clt_IDRepresentante   TEXT,
    clt_TelefonoContacto  TEXT,
    clt_EmailContacto     TEXT,
    clt_EmailEmpresa      TEXT,
    clt_TipoContribuyente INTEGER,
    clt_Origen            TEXT,
    clt_CodigoOrigen      TEXT,
    clt_FechaCreacion     TEXT    DEFAULT (datetime('now') ),
    clt_SystemDate        TEXT,
    clt_SystemTime        TEXT,
    clt_NameMachine       TEXT,
    clt_UserCreator       TEXT,
    clt_LastUpdateDate    TEXT,
    clt_LastUpdateTime    TEXT,
    clt_LastMachine       TEXT,
    clt_UserLastUpdate    TEXT
);


-- Tabla: ark_company
DROP TABLE IF EXISTS ark_company;

CREATE TABLE IF NOT EXISTS ark_company (
    emp_IDauto            INTEGER PRIMARY KEY AUTOINCREMENT,
    emp_Codigo            TEXT    CONSTRAINT Requerido NOT NULL ON CONFLICT ROLLBACK
                                  UNIQUE,
    emp_Descripcion       TEXT,
    emp_IDfiscal          TEXT,
    emp_Status            INTEGER DEFAULT 1,
    emp_DireccionF        TEXT,
    emp_DireccionL        TEXT,
    emp_Telefono1         TEXT,
    emp_Telefono2         TEXT,
    emp_Representante     TEXT,
    emp_IdRepresentante   TEXT,
    emp_TelefonoContacto  TEXT,
    emp_EmailContacto     TEXT,
    emp_EmailEmpresa      TEXT,
    emp_TipoContribuyente INTEGER,
    emp_FechaCreacion     TEXT    DEFAULT (datetime('now') ),
    emp_SystemDate        TEXT,
    emp_SystemTime        TEXT,
    emp_NameMachine       TEXT,
    emp_UserCreator       TEXT,
    emp_LastUpdateDate    TEXT,
    emp_LastUpdateTime    TEXT,
    emp_LastMachine       TEXT,
    emp_UserLastUpdate    TEXT
);


-- Tabla: ark_currencies
DROP TABLE IF EXISTS ark_currencies;

CREATE TABLE IF NOT EXISTS ark_currencies (
    mda_IDauto             INTEGER PRIMARY KEY AUTOINCREMENT,
    mda_Codigo             TEXT    NOT NULL
                                   UNIQUE,
    mda_Descripcion        TEXT,
    mda_Status             INTEGER DEFAULT 1,
    mda_ISO4217            TEXT,
    mda_Simbolo            TEXT,
    mda_FactorActivo       REAL,
    mda_FactorPasivo       REAL,
    mda_OperadorCalculo    INTEGER,
    mda_AplicaImp          INTEGER DEFAULT 0,
    mda_FechaCreacion      TEXT    DEFAULT (datetime('now') ),
    mda_FechaActualizacion TEXT,
    mda_FechaUltima        TEXT,
    mda_SystemDate         TEXT,
    mda_SystemTime         TEXT,
    mda_NameMachine        TEXT,
    mda_UserCreator        TEXT,
    mda_LastUpdateDate     TEXT,
    mda_LastUpdateTime     TEXT,
    mda_LastMachine        TEXT,
    mda_UserLastUpdate     TEXT
);


-- Tabla: ark_device_types
DROP TABLE IF EXISTS ark_device_types;

CREATE TABLE IF NOT EXISTS ark_device_types (
    dty_IDauto         INTEGER PRIMARY KEY AUTOINCREMENT,
    dty_Codigo         TEXT    NOT NULL
                               UNIQUE,
    dty_Descripcion    TEXT,
    dty_Status         INTEGER DEFAULT 1,
    dty_DescripcionTec TEXT,
    dty_FechaCreacion  TEXT    DEFAULT (datetime('now') ),
    dty_SystemDate     TEXT,
    dty_SystemTime     TEXT,
    dty_NameMachine    TEXT,
    dty_UserCreator    TEXT,
    dty_LastUpdateDate TEXT,
    dty_LastUpdateTime TEXT,
    dty_LastMachine    TEXT,
    dty_UserLastUpdate TEXT
);


-- Tabla: ark_employees
DROP TABLE IF EXISTS ark_employees;

CREATE TABLE IF NOT EXISTS ark_employees (
    emy_IDauto         INTEGER PRIMARY KEY AUTOINCREMENT,
    emy_Codigo         TEXT    NOT NULL
                               UNIQUE,
    emy_Descripcion    TEXT,
    emy_Status         INTEGER DEFAULT 1,
    emy_IDEmployees    TEXT,
    emy_Telefono1      TEXT,
    emy_Cargo          INTEGER,
    emy_Cliente        INTEGER,
    emy_Rol            TEXT,
    emy_EmailUsuario   TEXT,
    emy_Password       TEXT,
    emy_FechaCreacion  TEXT    DEFAULT (datetime('now') ),
    emy_SystemDate     TEXT,
    emy_SystemTime     TEXT,
    emy_NameMachine    TEXT,
    emy_UserCreator    TEXT,
    emy_LastUpdateDate TEXT,
    emy_LastUpdateTime TEXT,
    emy_LastMachine    TEXT,
    emy_UserLastUpdate TEXT,
    FOREIGN KEY (
        emy_Cargo
    )
    REFERENCES ark_job_titles (job_IDauto),
    FOREIGN KEY (
        emy_Cliente
    )
    REFERENCES ark_clients (clt_IDauto) 
);


-- Tabla: ark_functional_units
DROP TABLE IF EXISTS ark_functional_units;

CREATE TABLE IF NOT EXISTS ark_functional_units (
    fun_IDauto         INTEGER PRIMARY KEY AUTOINCREMENT,
    fun_Codigo         TEXT    NOT NULL
                               UNIQUE,
    fun_Descripcion    TEXT,
    fun_DescripcionTec TEXT,
    fun_Status         INTEGER DEFAULT 1,
    fun_FechaCreacion  TEXT    DEFAULT (datetime('now') ),
    fun_SystemDate     TEXT,
    fun_SystemTime     TEXT,
    fun_NameMachine    TEXT,
    fun_UserCreator    TEXT,
    fun_LastUpdateDate TEXT,
    fun_LastUpdateTime TEXT,
    fun_LastMachine    TEXT,
    fun_UserLastUpdate TEXT
);


-- Tabla: ark_it_assets
DROP TABLE IF EXISTS ark_it_assets;

CREATE TABLE IF NOT EXISTS ark_it_assets (
    ita_IDauto           INTEGER PRIMARY KEY AUTOINCREMENT,
    ita_Codigo           TEXT    NOT NULL
                                 UNIQUE,
    ita_Descripcion      TEXT,
    ita_marca            TEXT,
    ita_Clasificacion    TEXT,
    ita_Status           INTEGER DEFAULT 1,
    ita_DescripcionTec   TEXT,
    ita_NotasTech        TEXT,
    ita_macadrees        TEXT,
    ita_ipadrees         TEXT,
    ita_functional_units INTEGER,
    ita_Rol              TEXT,
    ita_idRDP1           TEXT,
    ita_idRDP2           TEXT,
    ita_iprdp            TEXT,
    ita_idemployees      INTEGER,
    ita_FechaCreacion    TEXT    DEFAULT (datetime('now') ),
    ita_SystemDate       TEXT,
    ita_SystemTime       TEXT,
    ita_NameMachine      TEXT,
    ita_UserCreator      TEXT,
    ita_LastUpdateDate   TEXT,
    ita_LastUpdateTime   TEXT,
    ita_LastMachine      TEXT,
    ita_UserLastUpdate   TEXT,
    FOREIGN KEY (
        ita_functional_units
    )
    REFERENCES ark_functional_units (fun_IDauto),
    FOREIGN KEY (
        ita_idemployees
    )
    REFERENCES ark_employees (emy_IDauto) 
);


-- Tabla: ark_job_titles
DROP TABLE IF EXISTS ark_job_titles;

CREATE TABLE IF NOT EXISTS ark_job_titles (
    job_IDauto         INTEGER PRIMARY KEY AUTOINCREMENT,
    job_Codigo         TEXT    NOT NULL
                               UNIQUE,
    job_Descripcion    TEXT,
    job_Status         INTEGER DEFAULT 1,
    job_DescripcionTec TEXT,
    job_FechaCreacion  TEXT    DEFAULT (datetime('now') ),
    job_SystemDate     TEXT,
    job_SystemTime     TEXT,
    job_NameMachine    TEXT,
    job_UserCreator    TEXT,
    job_LastUpdateDate TEXT,
    job_LastUpdateTime TEXT,
    job_LastMachine    TEXT,
    job_UserLastUpdate TEXT
);


-- Tabla: ark_requests
DROP TABLE IF EXISTS ark_requests;

CREATE TABLE IF NOT EXISTS ark_requests (
    req_IDauto         INTEGER PRIMARY KEY AUTOINCREMENT,
    req_Codigo         TEXT    NOT NULL
                               UNIQUE,
    req_Descripcion    TEXT,
    req_Status         INTEGER DEFAULT 1,
    req_DescripcionTec TEXT,
    req_FechaCreacion  TEXT    DEFAULT (datetime('now') ),
    req_CodigoCliente  INTEGER,
    req_SystemDate     TEXT,
    req_SystemTime     TEXT,
    req_NameMachine    TEXT,
    req_UserCreator    TEXT,
    req_LastUpdateDate TEXT,
    req_LastUpdateTime TEXT,
    req_LastMachine    TEXT,
    req_UserLastUpdate TEXT,
    FOREIGN KEY (
        req_CodigoCliente
    )
    REFERENCES ark_clients (clt_IDauto) 
);


-- Tabla: ark_sessions
DROP TABLE IF EXISTS ark_sessions;

CREATE TABLE IF NOT EXISTS ark_sessions (
    ses_IDauto          INTEGER  PRIMARY KEY AUTOINCREMENT,
    ses_numero          TEXT (8) UNIQUE,
    ses_Status          TEXT,
    ses_FechaEmision    TEXT,
    ses_clt_IDauto      INTEGER,
    ses_clt_Codigo      TEXT,
    ses_clt_Descripcion TEXT,
    ses_clt_IDfiscal    TEXT,
    ses_clt_Status      INTEGER  DEFAULT 1,
    ses_clt_DireccionF  TEXT,
    ses_clt_Telefono1   TEXT,
    ses_clt_Telefono2   TEXT,
    ses_usr_IDauto      INTEGER,
    ses_usr_Codigo      TEXT,
    ses_usr_Descripcion TEXT,
    ses_FechaSesion     TEXT,
    ses_HoraInicial     TEXT,
    ses_HoraFinal       TEXT,
    ses_TotalHora       INTEGER,
    ses_SystemDate      TEXT,
    ses_SystemTime      TEXT,
    ses_NameMachine     TEXT,
    ses_UserCreator     TEXT,
    ses_LastUpdateDate  TEXT,
    ses_LastUpdateTime  TEXT,
    ses_LastMachine     TEXT,
    ses_UserLastUpdate  TEXT,
    FOREIGN KEY (
        ses_clt_IDauto
    )
    REFERENCES ark_clients (clt_IDauto),
    FOREIGN KEY (
        ses_usr_IDauto
    )
    REFERENCES ark_users (usr_IDauto) 
);


-- Tabla: ark_sessions_details
DROP TABLE IF EXISTS ark_sessions_details;

CREATE TABLE IF NOT EXISTS ark_sessions_details (
    dts_IDauto         INTEGER PRIMARY KEY AUTOINCREMENT,
    dts_ses_IDauto     INTEGER,
    dts_act_Codigo     INTEGER,
    dts_req_IDauto     INTEGER,
    dts_description    TEXT,
    dts_result         TEXT,
    dts_time_spent     REAL,
    dts_date_logged    TEXT    DEFAULT (datetime('now') ),
    dts_SystemDate     TEXT,
    dts_SystemTime     TEXT,
    dts_NameMachine    TEXT,
    dts_UserCreator    TEXT,
    dts_LastUpdateDate TEXT,
    dts_LastUpdateTime TEXT,
    dts_LastMachine    TEXT,
    dts_UserLastUpdate TEXT,
    dts_FechaSesion    TEXT,
    FOREIGN KEY (
        dts_ses_IDauto
    )
    REFERENCES ark_sessions (ses_IDauto),
    FOREIGN KEY (
        dts_act_Codigo
    )
    REFERENCES ark_actions (act_IDauto),
    FOREIGN KEY (
        dts_req_IDauto
    )
    REFERENCES ark_requests (req_IDauto) 
);


-- Tabla: ark_tasks_completed
DROP TABLE IF EXISTS ark_tasks_completed;

CREATE TABLE IF NOT EXISTS ark_tasks_completed (
    tsc_IDauto         INTEGER PRIMARY KEY AUTOINCREMENT,
    tsc_Codigo         TEXT    NOT NULL
                               UNIQUE,
    tsc_Descripcion    TEXT,
    tsc_Status         INTEGER DEFAULT 1,
    tsc_DescripcionTec TEXT,
    tsc_FechaCreacion  TEXT    DEFAULT (datetime('now') ),
    tsc_SystemDate     TEXT,
    tsc_SystemTime     TEXT,
    tsc_NameMachine    TEXT,
    tsc_UserCreator    TEXT,
    tsc_LastUpdateDate TEXT,
    tsc_LastUpdateTime TEXT,
    tsc_LastMachine    TEXT,
    tsc_UserLastUpdate TEXT
);


-- Tabla: ark_users
DROP TABLE IF EXISTS ark_users;

CREATE TABLE IF NOT EXISTS ark_users (
    usr_IDauto         INTEGER PRIMARY KEY AUTOINCREMENT,
    usr_Codigo         TEXT    NOT NULL
                               UNIQUE,
    usr_login          TEXT    UNIQUE,
    usr_Descripcion    TEXT,
    usr_Status         INTEGER DEFAULT 1,
    usr_Telefono       TEXT,
    usr_Cargo          TEXT,
    usr_Rol            TEXT,
    usr_EmailUsuario   TEXT,
    usr_Password       TEXT,
    usr_FechaCreacion  TEXT    DEFAULT (datetime('now') ),
    id_employee        INTEGER,
    usr_SystemDate     TEXT,
    usr_SystemTime     TEXT,
    usr_NameMachine    TEXT,
    usr_UserCreator    TEXT,
    usr_LastUpdateDate TEXT,
    usr_LastUpdateTime TEXT,
    usr_LastMachine    TEXT,
    usr_UserLastUpdate TEXT,
    FOREIGN KEY (
        id_employee
    )
    REFERENCES ark_employees (emy_IDauto) 
);


-- Vista: v_transacciones_unicas
DROP VIEW IF EXISTS v_transacciones_unicas;
CREATE VIEW IF NOT EXISTS v_transacciones_unicas AS
    SELECT *
      FROM ark_transacciones t
     WHERE t.trn_Idauto = (
                              SELECT t2.trn_Idauto
                                FROM ark_transacciones t2
                               WHERE t2.trn_autoincrement = t.trn_autoincrement AND
                                     t2.trn_tipo = t.trn_tipo AND
                                     t2.trn_documento = t.trn_documento AND
                                     t2.trn_fechaemision = t.trn_fechaemision AND
                                     COALESCE(t2.trn_responsable, '') = COALESCE(t.trn_responsable, '') AND
                                     COALESCE(t2.trn_rifcliente, '') = COALESCE(t.trn_rifcliente, '') AND
                                     COALESCE(t2.trn_totalneto, -1) = COALESCE(t.trn_totalneto, -1) AND
                                     COALESCE(t2.trn_totalitems, -1) = COALESCE(t.trn_totalitems, -1) 
                               ORDER BY t2.trn_uo_Codigo,
                                        t2.trn_Idauto
                               LIMIT 1
                          );


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

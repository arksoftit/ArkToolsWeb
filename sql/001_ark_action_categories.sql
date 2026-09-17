CREATE TABLE ark_action_categories (
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
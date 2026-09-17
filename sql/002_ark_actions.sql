CREATE TABLE ark_actions (
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
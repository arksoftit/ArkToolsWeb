COLUMNAS_MAP = {
    "ark_clients": {
        "SClientes": [
            ("clt_Codigo", "FC_CODIGO"),
            ("clt_Descripcion", "FC_DESCRIPCION"),
            ("clt_IDfiscal", "FC_RIF"),
            ("clt_Status", "FC_STATUS"),
            ("clt_DireccionF", "FC_DIRECCION1"),
            ("clt_DireccionL", "FC_DIRECCION2"),
            ("clt_Telefono1", "FC_TELEFONO"),
            ("clt_Telefono2", "FC_TELEFAX"),
            ("clt_Representante", "FC_CONTACTO"),
            ("clt_EmailEmpresa", "FC_EMAIL"),
            ("clt_TipoContribuyente", "FC_TIPO"),
        ],
        "TClientes": [
            ("clt_Codigo", "CLT_CODIGO"),
            ("clt_Descripcion", "CLT_DESCRIPCION"),
            ("clt_IDfiscal", "CLT_RIF"),
            ("clt_Status", "CLT_STATUS"),
            ("clt_DireccionF", "CLT_DIRECCION1"),
            ("clt_DireccionL", "CLT_DIRECCION2"),
            ("clt_Telefono1", "CLT_TELEFONO"),
            ("clt_Telefono2", "CLT_TELEFAX"),
            ("clt_Representante", "CLT_CONTACTO"),
            ("clt_EmailEmpresa", "CLT_EMAIL"),
            ("clt_TipoContribuyente", "CLT_TIPO"),
        ],
        "nulos": ["clt_IDRepresentante", "clt_TelefonoContacto", "clt_EmailContacto"],
        "fijos": {"clt_Origen": "1", "clt_CodigoOrigen": "0101"},
        "auditoria": ["clt_NameMachine", "clt_UserCreator", "clt_LastMachine", "clt_UserLastUpdate"],
    }
}


def mapear_clientes(origen, filas, machine, user):
    mapa = COLUMNAS_MAP["ark_clients"]
    pares = mapa[origen]
    columnas = [destino for destino, _ in pares] + mapa["nulos"] + list(mapa["fijos"]) + mapa["auditoria"]
    filas_mapeadas = []
    for fila in filas:
        valores = list(fila) + [None] * len(mapa["nulos"]) + list(mapa["fijos"].values()) + [machine, user, machine, user]
        filas_mapeadas.append(tuple(valores))
    return columnas, filas_mapeadas
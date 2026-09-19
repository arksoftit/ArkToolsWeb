import os
import threading
import tkinter as tk
from tkinter import ttk, messagebox

from dbconnection import DBConnectionManager, ORIGENES
from dialog_conexiones import DialogConexiones
# from system_info import get_date_audit, get_current_user, get_machine_name, get_app_version
from system_info import (
    APP_DATE,
    APP_DEVELOPER,
    get_app_version,
    get_current_user,
    get_date_audit,
    get_machine_name,
)

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "config", "conexiones.json")

COLUMNAS_VISOR = {
    "SClientes": [
        ("FC_CODIGO", "Código"),
        ("FC_DESCRIPCION", "Razón Social"),
        ("FC_RIF", "RIF"),
        ("FC_STATUS", "Status"),
        ("FC_DIRECCION1", "Dirección Fiscal"),
        ("FC_DIRECCION2", "Dirección Postal"),
        ("FC_TELEFONO", "Teléfono Ppal"),
        ("FC_TELEFAX", "Teléfono Alternativo"),
        ("FC_CONTACTO", "Persona Contacto"),
    ],
    "TClientes": [
        ("CLT_CODIGO", "Código"),
        ("CLT_DESCRIPCION", "Razón Social"),
        ("CLT_RIF", "RIF"),
        ("CLT_STATUS", "Status"),
        ("CLT_DIRECCION1", "Dirección Fiscal"),
        ("CLT_DIRECCION2", "Dirección Postal"),
        ("CLT_TELEFONO", "Teléfono Ppal"),
        ("CLT_TELEFAX", "Teléfono Alternativo"),
        ("CLT_CONTACTO", "Persona Contacto"),
    ],
}

class AppSincronizador(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Sincronizador ArkToolsWeb")
        self._center_window(1000, 600)
        self.manager = DBConnectionManager(CONFIG_PATH)
        self.protocol("WM_DELETE_WINDOW", self._salir)

        barra = tk.Menu(self)
        menu_conexiones = tk.Menu(barra, tearoff=0)
        menu_conexiones.add_command(label="Gestionar conexiones...", command=self._abrir_dialogo)
        barra.add_cascade(label="Conexiones", menu=menu_conexiones)

        menu_ayuda = tk.Menu(barra, tearoff=0)
        menu_ayuda.add_command(label="Acerca de...", command=self.mostrar_acerca)
        barra.add_cascade(label="Ayuda", menu=menu_ayuda)

        menu_salida = tk.Menu(barra, tearoff=0)
        menu_salida.add_command(label="Cerrar Aplicación", command=self._confirmar_salida)
        barra.add_cascade(label="Salir", menu=menu_salida)
        self.config(menu=barra)

        superior = ttk.Frame(self, padding=10)
        superior.pack(fill=tk.X)
        ttk.Label(superior, text="Tabla origen:").pack(side=tk.LEFT)
        self.cbo_origen = ttk.Combobox(superior, values=list(ORIGENES), state="readonly", width=20)
        self.cbo_origen.pack(side=tk.LEFT, padx=5)
        self.cbo_origen.set(ORIGENES[0])
        self.btn_cargar = ttk.Button(superior, text="Cargar", command=self._cargar)
        self.btn_cargar.pack(side=tk.LEFT, padx=5)
        self.lbl_estado = ttk.Label(superior, text="")
        self.lbl_estado.pack(side=tk.LEFT, padx=15)

        self._create_status_bar()
        self.frame_acciones = ttk.Frame(self, height=60)
        self.frame_acciones.pack(fill=tk.X, side=tk.BOTTOM, padx=10, pady=(0, 10))
        self.frame_acciones.pack_propagate(False)

        contenedor = ttk.Frame(self, padding=(10, 0, 10, 10))
        contenedor.pack(fill=tk.BOTH, expand=True)
        self.tree = ttk.Treeview(contenedor, show="headings")
        vsb = ttk.Scrollbar(contenedor, orient=tk.VERTICAL, command=self.tree.yview)
        hsb = ttk.Scrollbar(contenedor, orient=tk.HORIZONTAL, command=self.tree.xview)
        self.tree.configure(yscrollcommand=vsb.set, xscrollcommand=hsb.set)
        self.tree.grid(row=0, column=0, sticky="nsew")
        vsb.grid(row=0, column=1, sticky="ns")
        hsb.grid(row=1, column=0, sticky="ew")
        contenedor.rowconfigure(0, weight=1)
        contenedor.columnconfigure(0, weight=1)
        self.actualizar_barra_estado()
    
    def _center_window(self, width, height):
        screen_width = self.winfo_screenwidth()
        screen_height = self.winfo_screenheight()
        x = (screen_width // 2) - (width // 2)
        y = (screen_height // 2) - (height // 2)
        self.geometry(f"{width}x{height}+{x}+{y}")

    def _abrir_dialogo(self):
        DialogConexiones(self, manager=self.manager)
    
    def _sort_treeview(self, col, reverse):
        filas = [(self.tree.set(item, col), item) for item in self.tree.get_children("")]
        filas.sort(reverse=reverse)
        for index, (_, item) in enumerate(filas):
            self.tree.move(item, "", index)
        self.tree.heading(col, command=lambda: self._sort_treeview(col, not reverse))

    def _abrir_dialogo(self):
        DialogConexiones(self, manager=self.manager)

    def _cargar(self):
        origen = self.cbo_origen.get()
        ok, msg, conn = self.manager.open_connection(origen)
        if not ok:
            messagebox.showerror("Conexión", msg)
            return
        self.btn_cargar.config(state=tk.DISABLED)
        self.cbo_origen.config(state=tk.DISABLED)
        self.lbl_estado.config(text=f"Cargando {origen}...")
        threading.Thread(target=self._leer_origen, args=(origen, conn), daemon=True).start()

    def _leer_origen(self, origen, conn):
        try:
            columnas = [col for col, _ in COLUMNAS_VISOR[origen]]
            consulta = f"SELECT {', '.join(columnas)} FROM {origen}"
            cursor = conn.cursor()
            cursor.execute(consulta)
            filas = cursor.fetchall()
            cursor.close()
            self.after(0, self._poblar, origen, filas)
        except Exception as e:
            self.after(0, self._error_carga, str(e))

    def _poblar(self, origen, filas):
        ordenables = ("Código", "Razón Social", "RIF", "Status")
        self.tree.delete(*self.tree.get_children())
        definicion = COLUMNAS_VISOR[origen]
        self.tree["columns"] = tuple(col for col, _ in definicion)
        for col, encabezado in definicion:
            self.tree.heading(col, text=encabezado)
            if encabezado in ordenables:
                self.tree.heading(col, command=lambda c=col: self._sort_treeview(c, False))
            self.tree.column(col, width=120, stretch=False)
        for fila in filas:
            self.tree.insert("", tk.END, values=tuple("" if v is None else v for v in fila))
        self.lbl_estado.config(text=f"{origen}: {len(filas)} registros")
        self._habilitar_carga()

    def _error_carga(self, msg):
        self.lbl_estado.config(text="")
        messagebox.showerror("Error de lectura", msg)
        self._habilitar_carga()

    def _habilitar_carga(self):
        self.btn_cargar.config(state=tk.NORMAL)
        self.cbo_origen.config(state="readonly")
        
    def _create_status_bar(self):
        self.status_bar = ttk.Frame(self)
        self.status_bar.pack(side=tk.BOTTOM, fill=tk.X)

        self.status_var = tk.StringVar()
        self.status_var.set("Iniciando...")

        self.status_label = ttk.Label(
            self.status_bar,
            textvariable=self.status_var,
            relief=tk.SUNKEN,
            anchor=tk.CENTER,
            padding=(5, 2)
        )
        self.status_label.pack(fill=tk.X)
        
    def actualizar_barra_estado(self):
        try:
            fecha = get_date_audit()
            user = get_current_user()
            equipo = get_machine_name()
            version = get_app_version()

            info_sesion = (
                f" SESIÓN ACTIVA | Usuario: {user} | "
                f"Equipo: {equipo} | Fecha: {fecha} | Versión: {version}"
            )

            self.status_var.set(info_sesion)

        except Exception as e:
            self.status_var.set(f"Error al actualizar barra de estado: {e}")
        
    def mostrar_acerca(self):
        info_acerca = (
            f"ArkToolsWeb\n"
            f"Versión: {get_app_version()}\n"
            f"Desarrollador: {APP_DEVELOPER}\n"
            f"Fecha: {APP_DATE}\n\n"
            f"Usuario actual: {get_current_user()}\n"
            f"Equipo: {get_machine_name()}\n"
            f"Fecha de auditoría: {get_date_audit()}"
        )
        messagebox.showinfo("Acerca de ArkToolsWeb", info_acerca)
        
    def _confirmar_salida(self):
        if messagebox.askyesno("Salir", "¿Desea cerrar la aplicación?"):
            self._salir()

    def _salir(self):
        self.manager.disconnect()
        self.destroy()



if __name__ == "__main__":
    app = AppSincronizador()
    app.mainloop()
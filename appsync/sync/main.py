import os
import threading
import tkinter as tk
from tkinter import ttk, messagebox

from dbconnection import DBConnectionManager, ORIGENES
from dialog_conexiones import DialogConexiones

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "config", "conexiones.json")


class AppSincronizador(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Sincronizador ArkToolsWeb")
        self.geometry("1000x600")
        self.manager = DBConnectionManager(CONFIG_PATH)
        self.protocol("WM_DELETE_WINDOW", self._salir)

        barra = tk.Menu(self)
        menu_conexiones = tk.Menu(barra, tearoff=0)
        menu_conexiones.add_command(label="Gestionar conexiones...", command=self._abrir_dialogo)
        menu_conexiones.add_separator()
        menu_conexiones.add_command(label="Salir", command=self._salir)
        barra.add_cascade(label="Conexiones", menu=menu_conexiones)
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
            cursor = conn.cursor()
            cursor.execute(f"SELECT * FROM {origen}")
            columnas = [d[0] for d in cursor.description]
            filas = cursor.fetchall()
            cursor.close()
            self.after(0, self._poblar, origen, columnas, filas)
        except Exception as e:
            self.after(0, self._error_carga, str(e))

    def _poblar(self, origen, columnas, filas):
        self.tree.delete(*self.tree.get_children())
        self.tree["columns"] = tuple(columnas)
        for col in columnas:
            self.tree.heading(col, text=col)
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

    def _salir(self):
        self.manager.disconnect()
        self.destroy()


if __name__ == "__main__":
    app = AppSincronizador()
    app.mainloop()
import API_BASE_URL from "./apiConfig";

export const empleadoService = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/empleados`);
    return res.json();
  },
  getById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/empleados/${id}`);
    return res.json();
  },
  create: async (empleado) => {
    const res = await fetch(`${API_BASE_URL}/empleados`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empleado),
    });
    if (!res.ok) throw await res.text();
    return res.json();
  },
  update: async (id, empleado) => {
    const res = await fetch(`${API_BASE_URL}/empleados/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empleado),
    });
    if (!res.ok) throw await res.text();
    return res.json();
  },
  delete: async (id) => {
    return fetch(`${API_BASE_URL}/empleados/${id}`, { method: "DELETE" });
  },
  buscar: async (q) => {
    const res = await fetch(`${API_BASE_URL}/empleados/buscar?q=${q}`);
    return res.json();
  },
  filtrarPorPuesto: async (puesto) => {
    const res = await fetch(`${API_BASE_URL}/empleados/puesto/${puesto}`);
    return res.json();
  },
  filtrarPorEstado: async (estado) => {
    const res = await fetch(`${API_BASE_URL}/empleados/estado/${estado}`);
    return res.json();
  },
  salarioMayor: async (monto) => {
    const res = await fetch(`${API_BASE_URL}/empleados/salario/mayor/${monto}`);
    return res.json();
  },
  salarioMenor: async (monto) => {
    const res = await fetch(`${API_BASE_URL}/empleados/salario/menor/${monto}`);
    return res.json();
  },
};

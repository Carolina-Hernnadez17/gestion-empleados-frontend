import React from "react";
import EmpleadoList from "../components/EmpleadoList";

export default function GestionEmpleados() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Empleados</h2>
      <EmpleadoList />
    </div>
  );
}

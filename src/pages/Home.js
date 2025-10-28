import React from "react";
import Estadisticas from "../components/Estadisticas";

export default function Home() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard de Empleados</h2>
      <Estadisticas />
    </div>
  );
}

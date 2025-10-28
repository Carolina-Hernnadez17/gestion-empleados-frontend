import React, { useEffect, useState } from "react";
import { estadisticasService } from "../services/estadisticasService";
import { Card, Row, Col } from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Estadisticas() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    estadisticasService.getAll().then(setStats);
  }, []);

  if (!stats.totalEmpleados) return <p className="text-center">Cargando estadísticas...</p>;

  const barData = {
    labels: Object.keys(stats.empleadosPorPuesto || {}),
    datasets: [
      {
        label: "Empleados por Puesto",
        data: Object.values(stats.empleadosPorPuesto || {}),
        backgroundColor: "#563ec8",
      },
    ],
  };

  const pieData = {
    labels: ["Activos", "Inactivos"],
    datasets: [
      {
        data: [stats.empleadosActivos, stats.empleadosInactivos],
        backgroundColor: ["#28a745", "#dc3545"],
      },
    ],
  };

  return (
    <div className="mt-4">
      <Row className="g-4">
        <Col md={3}><Card className="text-center shadow"><Card.Body><h6>Total Empleados</h6><h3>{stats.totalEmpleados}</h3></Card.Body></Card></Col>
        <Col md={3}><Card className="text-center shadow"><Card.Body><h6>Promedio Salario</h6><h3>${stats.promedioSalario.toFixed(2)}</h3></Card.Body></Card></Col>
        <Col md={3}><Card className="text-center shadow"><Card.Body><h6>Antigüedad Promedio</h6><h3>{stats.antiguedadPromedio.toFixed(1)} años</h3></Card.Body></Card></Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}><Bar data={barData} /></Col>
        <Col md={6}><Pie data={pieData} /></Col>
      </Row>
    </div>
  );
}

import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function EmpleadoFilter({ onBuscar, onFiltrar }) {
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("");
  const [valor, setValor] = useState("");

  return (
    <Form className="mb-4 p-3 bg-light rounded shadow-sm">
      <Row className="align-items-end">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Buscar por nombre, apellido o DUI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Juan o 1234567-8"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button variant="primary" onClick={() => onBuscar(q)}>
            Buscar
          </Button>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Filtrar por</Form.Label>
            <Form.Select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
              <option value="">Seleccione...</option>
              <option value="puesto">Puesto</option>
              <option value="estado">Estado</option>
              <option value="salarioMayor">Salario Mayor</option>
              <option value="salarioMenor">Salario Menor</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Control
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </Col>
        <Col md={1}>
          <Button variant="secondary" onClick={() => onFiltrar(filtro, valor)}>
            Filtrar
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

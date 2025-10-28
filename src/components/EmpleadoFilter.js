import React, { useState } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";

export default function EmpleadoFilter({ onBuscar, onFiltrar, onLimpiar }) {
  const [q, setQ] = useState("");
  const [puesto, setPuesto] = useState("");
  const [estado, setEstado] = useState("");
  const [tipoSalario, setTipoSalario] = useState("");
  const [salario, setSalario] = useState("");

  const handleFiltrarPuesto = () => {
    if (puesto) onFiltrar("puesto", puesto);
  };

  const handleFiltrarEstado = () => {
    if (estado) onFiltrar("estado", estado);
  };

  const handleFiltrarSalario = () => {
    if (tipoSalario && salario) {
      onFiltrar(tipoSalario, salario);
    }
  };

  const handleLimpiar = () => {
    setQ("");
    setPuesto("");
    setEstado("");
    setTipoSalario("");
    setSalario("");
    if (onLimpiar) onLimpiar();
  };

  return (
    <div className="mb-4">
      {/* Búsqueda General */}
      <Row className="mb-3">
        <Col md={10}>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              placeholder="Buscar por nombre, apellido o DUI..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onBuscar(q)}
            />
            <Button variant="primary" onClick={() => onBuscar(q)}>
              Buscar
            </Button>
          </InputGroup>
        </Col>
        <Col md={2}>
          <Button variant="secondary" className="w-100" onClick={handleLimpiar}>
            Limpiar Filtros
          </Button>
        </Col>
      </Row>

      {/* Filtros en línea */}
      <Row className="g-2">
        {/* Filtro por Puesto */}
        <Col md={3}>
          <InputGroup size="sm">
            <InputGroup.Text>Puesto</InputGroup.Text>
            <Form.Control
              placeholder="Ej: Gerente"
              value={puesto}
              onChange={(e) => setPuesto(e.target.value)}
            />
            <Button 
              variant="outline-primary" 
              onClick={handleFiltrarPuesto}
              disabled={!puesto}
            >
              ✓
            </Button>
          </InputGroup>
        </Col>

        {/* Filtro por Estado */}
        <Col md={3}>
          <InputGroup size="sm">
            <InputGroup.Text>Estado</InputGroup.Text>
            <Form.Select 
              value={estado} 
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Form.Select>
            <Button 
              variant="outline-success" 
              onClick={handleFiltrarEstado}
              disabled={!estado}
            >
              ✓
            </Button>
          </InputGroup>
        </Col>

        {/* Filtro por Salario */}
        <Col md={6}>
          <InputGroup size="sm">
            <InputGroup.Text>Salario</InputGroup.Text>
            <Form.Select 
              value={tipoSalario} 
              onChange={(e) => setTipoSalario(e.target.value)}
              style={{ maxWidth: '120px' }}
            >
              <option value="">Tipo</option>
              <option value="salarioMayor">Mayor a</option>
              <option value="salarioMenor">Menor a</option>
            </Form.Select>
            <Form.Control
              type="number"
              placeholder="Monto"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              min="0"
              step="0.01"
            />
            <Button 
              variant="outline-warning" 
              onClick={handleFiltrarSalario}
              disabled={!tipoSalario || !salario}
            >
              ✓
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
}

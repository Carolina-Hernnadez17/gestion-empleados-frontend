import React, { useEffect, useState } from "react";
import { Table, Button, Pagination, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { empleadoService } from "../services/empleadoService";
import EmpleadoForm from "./EmpleadoForm";
import EmpleadoFilter from "./EmpleadoFilter";

export default function EmpleadoList() {
  const [empleados, setEmpleados] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchEmpleados = () => {
    empleadoService.getAll().then(setEmpleados);
  };

  useEffect(() => { fetchEmpleados(); }, []);

  const handleAgregar = () => { setSelectedEmpleado(null); setShowForm(true); };

  const handleEdit = (empleado) => { setSelectedEmpleado(empleado); setShowForm(true); };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar empleado?',
      text: "No podrás revertirlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#563ec8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        empleadoService.delete(id).then(() => {
          Swal.fire('Eliminado!', 'El empleado fue eliminado.', 'success');
          fetchEmpleados();
        });
      }
    });
  };

  const handleSubmit = (empleado) => {
    const action = empleado.idEmpleado ? empleadoService.update(empleado.idEmpleado, empleado) : empleadoService.create(empleado);
    action.then(() => {
      Swal.fire('Éxito', `Empleado ${empleado.idEmpleado ? 'actualizado' : 'agregado'} correctamente`, 'success');
      setShowForm(false);
      fetchEmpleados();
    }).catch(async (err) => {
      const msg = await err.text ? await err.text() : err.toString();
      Swal.fire('Error', msg, 'error');
    });
  };

  const handleBuscar = (q) => {
    if (!q) return fetchEmpleados();
    empleadoService.buscar(q).then(setEmpleados);
  };

  const handleFiltrar = (filtro, valor) => {
    if (!filtro || !valor) return fetchEmpleados();
    switch (filtro) {
      case "puesto": empleadoService.filtrarPorPuesto(valor).then(setEmpleados); break;
      case "estado": empleadoService.filtrarPorEstado(valor).then(setEmpleados); break;
      case "salarioMayor": empleadoService.salarioMayor(valor).then(setEmpleados); break;
      case "salarioMenor": empleadoService.salarioMenor(valor).then(setEmpleados); break;
      default: fetchEmpleados();
    }
  };

  // Paginación
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = empleados.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(empleados.length / itemsPerPage);

  return (
    <div>
      <Row className="mb-3">
        <Col><Button variant="primary" onClick={handleAgregar}>Agregar Empleado</Button></Col>
      </Row>

      <EmpleadoFilter onBuscar={handleBuscar} onFiltrar={handleFiltrar} />

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th><th>Apellido</th><th>DUI</th><th>Teléfono</th><th>Correo</th>
            <th>Puesto</th><th>Salario</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(e => (
            <tr key={e.idEmpleado}>
              <td>{e.nombre}</td><td>{e.apellido}</td><td>{e.dui}</td><td>{e.telefono}</td><td>{e.correo}</td>
              <td>{e.puesto}</td><td>${e.salario.toFixed(2)}</td><td>{e.estado}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(e)}>Editar</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(e.idEmpleado)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item key={i+1} active={i+1===currentPage} onClick={() => setCurrentPage(i+1)}>
            {i+1}
          </Pagination.Item>
        ))}
      </Pagination>

      <EmpleadoForm show={showForm} onClose={() => setShowForm(false)} onSubmit={handleSubmit} empleado={selectedEmpleado} />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function EmpleadoForm({ show, onClose, onSubmit, empleado }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dui: "",
    telefono: "",
    correo: "",
    direccion: "",
    fechaContratacion: "",
    puesto: "",
    salario: "",
    estado: "Activo",
  });

  useEffect(() => {
    if (empleado) {
      // Formatear la fecha al formato YYYY-MM-DD si viene en otro formato
      let fechaFormateada = empleado.fechaContratacion;
      if (fechaFormateada && fechaFormateada.length > 10) {
        // Si viene como timestamp o con hora, extraer solo la fecha
        fechaFormateada = fechaFormateada.substring(0, 10);
      }
      setForm({ ...empleado, fechaContratacion: fechaFormateada });
    } else {
      // Si no hay empleado (modo agregar), limpiar el formulario
      setForm({
        nombre: "",
        apellido: "",
        dui: "",
        telefono: "",
        correo: "",
        direccion: "",
        fechaContratacion: "",
        puesto: "",
        salario: "",
        estado: "Activo",
      });
    }
  }, [empleado]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Asegurar que la fecha se envíe en formato YYYY-MM-DD
    const formData = {
      ...form,
      fechaContratacion: form.fechaContratacion?.substring(0, 10) || form.fechaContratacion
    };
    
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{empleado ? "Editar Empleado" : "Agregar Empleado"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={form.nombre} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Apellido</Form.Label>
            <Form.Control name="apellido" value={form.apellido} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>DUI</Form.Label>
            <Form.Control name="dui" value={form.dui} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control name="telefono" value={form.telefono} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" name="correo" value={form.correo} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Dirección</Form.Label>
            <Form.Control name="direccion" value={form.direccion} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Fecha Contratación</Form.Label>
            <Form.Control 
              type="date" 
              name="fechaContratacion" 
              value={form.fechaContratacion} 
              onChange={handleChange} 
              max={new Date().toISOString().split('T')[0]}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Puesto</Form.Label>
            <Form.Control name="puesto" value={form.puesto} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Salario</Form.Label>
            <Form.Control type="number" name="salario" value={form.salario} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Estado</Form.Label>
            <Form.Select name="estado" value={form.estado} onChange={handleChange} required>
              <option>Activo</option>
              <option>Inactivo</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" className="mt-3 w-100">
            {empleado ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

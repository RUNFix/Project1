import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../Componentes/Login";
import RegistroEmpleados from "../Componentes/RegistroEmpleados";
import TablaEmpleados from "../Componentes/TablaEmpleados";
import EmpleadoCard from "../Componentes/EmpleadoCard";

function RoutesApp() {
  const empleados = [
    {
      id: 1,
      nombre: "maria",
      apellido: "perez",
      cedula: "121323",
      edad: "12",
      rol: "abc",
      telefono: "14512",
      email: "aa@gmail.com",
    },
    {
      id: 2,
      nombre: "maria",
      apellido: "perez",
      cedula: "121323",
      edad: "12",
      rol: "abc",
      telefono: "14512",
      email: "aa@gmail.com",
    },
    {
      id: 3,
      nombre: "maria",
      apellido: "perez",
      cedula: "121323",
      edad: "12",
      rol: "abc",
      telefono: "14512",
      email: "aa@gmail.com",
    },
    {
      id: 4,
      nombre: "maria",
      apellido: "perez",
      cedula: "121323",
      edad: "12",
      rol: "abc",
      telefono: "14512",
      email: "aa@gmail.com",
    },
    {
      id: 5,
      nombre: "maria",
      apellido: "perez",
      cedula: "121323",
      edad: "12",
      rol: "abc",
      telefono: "14512",
      email: "aa@gmail.com",
    },
    {
      id: 6,
      nombre: "maria",
      apellido: "perez",
      cedula: "121323",
      edad: "12",
      rol: "abc",
      telefono: "14512",
      email: "aa@gmail.com",
    },
    {
      id: 7,
      nombre: "maria",
      apellido: "perez",
      cedula: "121323",
      edad: "12",
      rol: "abc",
      telefono: "14512",
      email: "aa@gmail.com",
    },
    {
      id: 8,
      nombre: "maria",
      apellido: "perez",
      cedula: "121323",
      edad: "12",
      rol: "abc",
      telefono: "14512",
      email: "aa@gmail.com",
    },
    {
      id: 9,
      nombre: "maria",
      apellido: "perez",
      cedula: "121323",
      edad: "12",
      rol: "abc",
      telefono: "14512",
      email: "aa@gmail.com",
    },
  ];
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route
              path="employee"
              element={<EmpleadoCard empleados={empleados} />}
            />
            <Route path="login" element={<Login />} />
            <Route path="register_employee" element={<RegistroEmpleados />} />
            <Route
              path="table_employee"
              element={<TablaEmpleados empleados={empleados} />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default RoutesApp;

// App.tsx
import React from "react";
import Login from "./Componentes/Login";
import RegistroEmpleados from "./Componentes/RegistroEmpleados";
import TablaEmpleados from "./Componentes/TablaEmpleados";
import EmpleadoCard from "./Componentes/EmpleadoCard";

function App() {
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
    <div>
      <EmpleadoCard empleados={empleados} />
      {/*  <TablaEmpleados empleados={empleados} /> */}
    </div>
  );
}

export default App;

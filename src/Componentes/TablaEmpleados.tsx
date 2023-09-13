import React, { useState } from "react";

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  edad: string;
  rol: string;
  telefono: string;
  email: string;
}

interface TablaEmpleadosProps {
  empleados: Empleado[];
}

const TablaEmpleados: React.FC<TablaEmpleadosProps> = ({ empleados }) => {
  const [selectedEmpleado, setSelectedEmpleado] = useState<number | null>(null);

  const handleButtonPress = (id: number) => {
    if (selectedEmpleado === id) {
      setSelectedEmpleado(null);
    } else {
      setSelectedEmpleado(id);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold mb-8">Lista de empleados</h2>
      <div className="flex justify-center bg-indigo-50 p-6 lg:p-8 rounded-3xl shadow-2xl text-base w-full max-w-5xl overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {[
                "Nombre",
                "Apellido",
                "Cédula",
                "Edad",
                "Rol",
                "Teléfono",
                "Email",
              ].map((header, index) => (
                <th
                  key={index}
                  className="text-center py-4 px-6 uppercase font-semibold text-sm"
                >
                  {header}
                </th>
              ))}
              <th className="text-center py-4 px-6 uppercase font-semibold text-sm">
                Seleccionar
              </th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td className="text-left py-4 px-6">{empleado.nombre}</td>
                <td className="text-left py-4 px-6">{empleado.apellido}</td>
                <td className="text-left py-4 px-6">{empleado.cedula}</td>
                <td className="text-left py-4 px-6">{empleado.edad}</td>
                <td className="text-left py-4 px-6 hidden md:table-cell">
                  {empleado.rol}
                </td>
                <td className="text-left py-4 px-6 hidden md:table-cell">
                  {empleado.telefono}
                </td>
                <td className="text-left py-4 px-6 hidden md:table-cell">
                  {empleado.email}
                </td>
                <td className="text-center py-4 px-6">
                  <button
                    className={`text-white rounded-full h-10 w-10 focus:outline-none ${
                      selectedEmpleado === empleado.id
                        ? "bg-green-700"
                        : "bg-green-400"
                    }`}
                    onClick={() => handleButtonPress(empleado.id)}
                  >
                    ✓
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaEmpleados;

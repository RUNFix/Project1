import axios from "axios";
import React, { useEffect, useState } from "react";

interface Empleado {
  fullName: string;
  cc: string;
  age: string;
  position: string;
  phone: string;
  email: string;
}



const TablaEmpleados: React.FC = () => {
  const [selectedEmpleado, setSelectedEmpleado] = useState<number | null>(null);
  const [empleados, setEmpleados] = useState<any[]>([]); 

  let empleado: any[] = [];
  useEffect(() => {
    axios.get('http://localhost:4000/employee', {})
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log('Respuesta del servidor:', response.data);
        setEmpleados(response.data);
      })
      .catch((error) => {
        // Manejar errores, como mostrar un mensaje de error al usuario
        console.error('Error al enviar la solicitud:', error);
      });
  }, []); // El array vacío significa que este efecto se ejecutará solo una

  console.log(empleado)
  


 

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
              <tr key={empleado.cc}>
                <td className="text-left py-4 px-6">{empleado.fullName}</td>
                <td className="text-left py-4 px-6">{empleado.cc}</td>
                <td className="text-left py-4 px-6 hidden md:table-cell">
                  {empleado.age}
                </td>
                <td className="text-left py-4 px-6 hidden md:table-cell">
                  {empleado.position}
                </td>
                <td className="text-left py-4 px-6 hidden md:table-cell">
                  {empleado.phone}
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

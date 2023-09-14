import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistroEmpleados: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    nombre: "",
    apellido: "",
    cedula: "",
    edad: "",
    rol: "",
    telefono: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del empleado: ", formData);

    // Realizar una solicitud POST utilizando Axios
    axios.post('http://localhost:4000/auth/register/', {
      "cc": formData.cedula,
      "fullName": formData.nombre + ' ' + formData.apellido,
      "age": formData.edad,
      "position": formData.rol,
      "email": formData.email,
      "phone": formData.telefono,
      "password": formData.password
    })
    .then((response) => {
      // Manejar la respuesta del servidor
      console.log('Respuesta del servidor:', response.data);
    })
    .catch((error) => {
      // Manejar errores, como mostrar un mensaje de error al usuario
      console.error('Error al enviar la solicitud:', error);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-max bg-gray-100">
      <h2 className="text-4xl font-bold mb-8 ">Registro de empleados</h2>
      <form
        className="bg-indigo-200 p-4 md:p-6 lg:p-8 rounded-3xl shadow-2xl  text-base w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        {["nombre", "apellido", "cedula", "edad", "rol", "telefono"].map(
          (field) => (
            <div className="mb-4" key={field}>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor={field}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                className="mt-1 p-2 w-full rounded-md border"
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          )
        )}
        <div className="mb-4 md:col-span-2">
          <label
            className="block text-base font-medium text-gray-600"
            htmlFor="email"
          >
            Email {/* Cambiado de "Teléfono" a "Email" */}
          </label>
          <input
            className="mt-1 p-2 w-full rounded-md border"
            type="email" // Cambiado de "text" a "email" para validar el formato del email
            id="email"
            name="email" // Cambiado de "telefono" a "email"
            value={formData.email} // Cambiado de "formData.telefono" a "formData.email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 md:col-span-2">
          <label
            className="block text-base font-medium text-gray-600"
            htmlFor="password"
          >
            Contraseña {/* Cambiado de "Teléfono" a "Email" */}
          </label>
          <input
            className="mt-1 p-2 w-full rounded-md border"
            type="password" // Cambiado de "text" a "email" para validar el formato del email
            id="password"
            name="password" // Cambiado de "telefono" a "email"
            value={formData.password} // Cambiado de "formData.telefono" a "formData.email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600  text-white p-2 rounded-2xl"
          >
            Registrar empleado
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroEmpleados;

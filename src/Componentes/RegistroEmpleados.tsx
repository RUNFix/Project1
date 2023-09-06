import React, { useState } from 'react';

const RegistroEmpleados: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    nombre: '',
    apellido: '',
    cedula: '',
    edad: '',
    rol: '',
    email: '',
    telefono: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del empleado: ', formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h2 className="text-2xl font-semibold mb-5">Registro de empleados</h2>
      <form className="bg-white p-4 md:p-6 lg:p-8 rounded shadow-md w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {['nombre', 'apellido', 'cedula', 'edad', 'rol', 'email'].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-medium text-gray-600" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              className="mt-1 p-2 w-full rounded-md border"
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required />
          </div>
        ))}
        <div className="mb-4 md:col-span-2">
          <label className="block text-sm font-medium text-gray-600" htmlFor="telefono">
            Teléfono
          </label>
          <input
            className="mt-1 p-2 w-full rounded-md border"
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required />
        </div>
        <div className="col-span-1 md:col-span-2">
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Registrar empleado
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroEmpleados;

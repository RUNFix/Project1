import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { errorToast, notValidToast, succesToast } from 'src/utils/Toast';
import { isCcValid } from 'src/utils/ValueChecks';
import { API_CLIENT } from 'src/api/api'; // Assuming you have an API_CLIENT route

// Toast parameters
const ALREADY_USER = 'Cédula ya registrada en el sistema';
const USER_UPDATED = 'El usuario ha sido actualizado';
const ALREADY_EMAIL = 'E-mail ya registrado en el sistema';
const ALREADY_PHONE = 'Número de telefono ya registrado en el sistema';

// ... (previous imports)

const RegistroClientes: React.FC = () => {
  const [userError, setUserError] = useState<string>('');

  const location = useLocation();

  const clienteParaEditar = location.state?.filtrado;
  const { fullName, cc, placas, modelo, phone, email, marca, year } =
    clienteParaEditar || {};
  const validationSchema = Yup.object({
    nombre: Yup.string().required('Requerido'),
    apellido: Yup.string().required('Requerido'),
    cedula: Yup.string().required('Requerido'),
    modelo: Yup.string().required('Requerido'),
    placas: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    email: Yup.string().email('Formato de correo electrónico inválido').required('Requerido'),
    marca: Yup.string().required('Requerido'),
    year: Yup.number().integer('Año debe ser un número entero').required('Requerido'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: fullName ? fullName.split(' ')[0] : '',
      apellido: fullName ? fullName.split(' ')[1] : '',
      cedula: cc || '',
      placas: placas || '',
      modelo: modelo || '',
      telefono: phone || '',
      email: email || '',
      marca: marca || '',
      year: year || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setUserError('');
      console.log('Aqui va el try catch para manejar el backend');
    },
  });

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen min-w-max bg-gray-50">
        <h2 className="text-4xl font-bold mb-8 text-slate-800">
          Registro de clientes
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-slate-800 p-4 md:p-6 lg:p-8 rounded-3xl shadow-2xl text-base w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {['nombres', 'apellidos', 'cedula', 'placas', 'telefono', 'modelo', 'marca', 'año'].map((field) => (
            <div className="mb-4" key={field}>
              <label
                className="block text-sm font-medium text-gray-50"
                htmlFor={field}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                className="mt-1 p-2 w-full rounded-md border"
                type={field === 'año' ? 'number' : 'text'}
                id={field}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                disabled={field === 'cedula' && clienteParaEditar ? true : false}
              />
            </div>
          ))}
          
          <div className="mb-4 md:col-span-2">
            <label className="block text-sm font-medium text-gray-50" htmlFor="email">
              Email
            </label>
            <input
              className="mt-1 p-2 w-full rounded-md border"
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <h1 className="text-center text-red-600">{userError}</h1>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-2xl"
            >
              Registrar cliente del taller
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistroClientes;

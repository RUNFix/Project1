import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import TablaEmpleados from './TablaEmpleados';

interface Empleado {
  fullName: string;
  cc: string;
  age: string;
  position: string;
  phone: string;
  email: string;
}

const RegistroEmpleados: React.FC = () => {
  const [datos, setDatos] = useState(false);
  const [userError, setUserError] = useState<string>('');
  const navegar = useNavigate();
  const location = useLocation();
  const empleadoParaEditar = location.state?.filtrado;

  const { fullName, cc, age, position, phone, email } =
    empleadoParaEditar || {};

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Requerido'),
    apellido: Yup.string().required('Requerido'),
    cedula: Yup.string().required('Requerido'),
    edad: Yup.string().required('Requerido'),
    rol: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    email: Yup.string().email('Email inválido').required('Requerido'),
    password: Yup.string().required('Requerido'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: fullName ? fullName.split(' ')[0] : '',
      apellido: fullName ? fullName.split(' ')[1] : '',
      cedula: cc || '',
      edad: age || '',
      rol: position || '',
      telefono: phone || '',
      email: email || '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setUserError('');
      try {
        const response = await axios.post(
          'http://localhost:4000/auth/register/',
          {
            cc: values.cedula,
            fullName: `${values.nombre.trim()} ${values.apellido.trim()}`,
            age: values.edad.trim(),
            position: values.rol.trim(),
            email: values.email.trim(),
            phone: values.telefono.trim(),
            password: values.password,
          },
        );
        console.log('Respuesta del servidor:', response.data);
        //warning messages
        switch (response.data) {
          case 'ALREADY_USER':
            //alert('Usuario no encontrado');
            setUserError('Usuario ya registrado');
            break;
          default:
            alert('entró');
            break;
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        setDatos(true);
        alert('se ejecuto correctament');
      }
    },
  });

  /*// problema
  useEffect(() => {
    formik.resetForm();
  }, [location]);

  useEffect(() => {
    if (datos) {
      formik.resetForm({
        values: {
          nombre: '',
          apellido: '',
          cedula: '',
          edad: '',
          rol: '',
          telefono: '',
          email: '',
          password: '',
        },
      });
    }
  }, [datos]);
  */
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-max bg-gray-100">
      <h2 className="text-4xl font-bold mb-8">Registro de empleados</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-indigo-200 p-4 md:p-6 lg:p-8 rounded-3xl shadow-2xl text-base w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {['nombre', 'apellido', 'cedula', 'edad', 'telefono'].map((field) => (
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
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              disabled={field === 'cedula' && empleadoParaEditar ? true : false}
            />
            {formik.touched[field] && formik.errors[field] ? (
              <div className="text-red-500">{formik.errors[field]}</div>
            ) : null}
          </div>
        ))}

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="rol"
          >
            Rol
          </label>
          <select
            className="mt-1 p-2 w-full rounded-md border"
            id="rol"
            name="rol"
            value={formik.values.rol}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          >
            <option value="" label="Selecciona un rol" />
            <option value="Tecnico Automotriz">Empleado</option>
            <option value="Jefe de Taller">Jefe del Taller</option>
            <option value="Asesor de Servicio">Administrador</option>
          </select>
          {formik.touched.rol && formik.errors.rol ? (
            <div className="text-red-500">{formik.errors.rol}</div>
          ) : null}
        </div>

        <div className="mb-4 md:col-span-2">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="email"
          >
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
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4 md:col-span-2">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="mt-1 p-2 w-full rounded-md border"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="col-span-1 md:col-span-2">
          <h1 className="text-center text-red-600">{userError}</h1>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-2xl"
          >
            Registrar empleado
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroEmpleados;

import React, { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';

interface Empleado {
  fullName: string;
  cc: string;
  age: string;
  position: string;
  phone: string;
  email: string;
}

const RegistroEmpleados: React.FC = () => {
  const location = useLocation<{ empleadoParaEditar: Empleado | null }>();

  const empleadoParaEditar = location.state?.empleadoParaEditar;
  console.log(empleadoParaEditar);

  const formik = useFormik({
    initialValues: {
      nombre: empleadoParaEditar
        ? empleadoParaEditar.fullName.split(' ')[0]
        : '',
      apellido: empleadoParaEditar
        ? empleadoParaEditar.fullName.split(' ')[1]
        : '',
      cedula: empleadoParaEditar ? empleadoParaEditar.cc : '',
      edad: empleadoParaEditar ? empleadoParaEditar.age : '',
      rol: empleadoParaEditar ? empleadoParaEditar.position : '',
      telefono: empleadoParaEditar ? empleadoParaEditar.phone : '',
      email: empleadoParaEditar ? empleadoParaEditar.email : '',
      password: '',
    },

    validationSchema: Yup.object({
      nombre: Yup.string().required('Requerido'),
      apellido: Yup.string().required('Requerido'),
      cedula: Yup.string().required('Requerido'),
      edad: Yup.string().required('Requerido'),
      rol: Yup.string().required('Requerido'),
      telefono: Yup.string().required('Requerido'),
      email: Yup.string().email('Email inválido').required('Requerido'),
      password: Yup.string().required('Requerido'),
    }),

    onSubmit: (values) => {
      axios
        .post('http://localhost:4000/auth/register/', {
          cc: values.cedula,
          fullName: `${values.nombre} ${values.apellido}`,
          age: values.edad,
          position: values.rol,
          email: values.email,
          phone: values.telefono,
          password: values.password,
        })
        .then((response) => {
          console.log('Respuesta del servidor:', response.data);
        })
        .catch((error) => {
          console.error('Error al enviar la solicitud:', error);
        });
    },
  });

  useEffect(() => {
    if (empleadoParaEditar) {
      formik.setValues({
        nombre: empleadoParaEditar.fullName.split(' ')[0],
        apellido: empleadoParaEditar.fullName.split(' ')[1],
        cedula: empleadoParaEditar[0].cc,
        edad: empleadoParaEditar[1].age,
        rol: empleadoParaEditar[3].position,
        telefono: empleadoParaEditar[0].phone,
        email: empleadoParaEditar.email,
        password: '',
      });
    }
  }, [empleadoParaEditar]);
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

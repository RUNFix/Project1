import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
//import 'react-toastify/dist/ReactToastify.css';

// CUSTOM TOASTS
const errorToast = (message: string) => {
  toast.error(message, {
    position: 'bottom-center',
    iconTheme: {
      primary: '#FA201D',
      secondary: '#FFF',
    },
    style: {
      border: '3px solid #1e293b',
      color: '1e293b',
    },
  });
};

const succesToast = (message: string) => {
  toast.success(message, {
    position: 'bottom-center',
    iconTheme: {
      primary: '#49f770',
      secondary: '#FFF',
    },
    style: {
      border: '3px solid #1e293b',
      color: '1e293b',
    },
  });
};

const notNumberToast = (field: string) => {
  let message = `El campo ${field} debe ser un valor númerico`;
  errorToast(message);
};

const notValidToast = (field: string) => {
  let message = `El valor en el campo ${field} no es valido`;
  errorToast(message);
};
//                TOAST PARAMETERS
//Warning messages
const ALREADY_USER = 'Cédula ya registrada en el sistema';
const USER_UPDATED = 'El usuario ha sido actualizado';
const ALREADY_EMAIL = 'E-mail ya registrado en el sistema';
const ALREADY_PHONE = 'Número de telefono ya registrado en el sitema';

const RegistroEmpleados: React.FC = () => {
  const [userError, setUserError] = useState<string>('');
  const location = useLocation();
  const empleadoParaEditar = location.state?.filtrado;
  const navegar = useNavigate();

  const { fullName, cc, age, position, phone, email } = empleadoParaEditar || {};

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
        const method = empleadoParaEditar ? 'put' : 'post';
        const url = empleadoParaEditar
          ? `http://localhost:4000/employee/${empleadoParaEditar.cc}`
          : 'http://localhost:4000/auth/register';

        console.log(url);

        let isNumeric: boolean = true;

        //checks if cc, age and phone are numeric
        if (isNaN(Number(values.cedula.toString()))) {
          notNumberToast('Cedula');
          isNumeric = false;
        } else if (isNaN(Number(values.telefono.toString()))) {
          notNumberToast('Telefono');
          isNumeric = false;
        } else if (isNaN(Number(values.edad.toString()))) {
          notNumberToast('Edad');
          isNumeric = false;
        }

        let isValid: boolean = true;
        //only checks if values are numeric
        if (isNumeric) {
          //checks if cc, age and phone are valid (>0)
          if (values.cedula <= 0) {
            notValidToast('Cedula');
            isValid = false;
          } else if (values.telefono <= 0) {
            notValidToast('Telefono');
            isValid = false;
          } else if (values.edad <= 0) {
            notValidToast('Edad');
            isValid = false;
          }
        }

        //if cc, phone and age are valid
        if (isValid) {
          const response = await axios[method](url, {
            cc: values.cedula,
            fullName: `${values.nombre} ${values.apellido}`,
            age: values.edad,
            position: values.rol,
            email: values.email,
            phone: values.telefono,
            password: values.password,
          });
          //Warnings from back-end
          switch (response.data) {
            case 'ALREADY_USER':
              setUserError(ALREADY_USER);
              errorToast(ALREADY_USER);
              break;
            case 'USER_UPDATED':
              succesToast(USER_UPDATED);
              break;
            case 'ALREADY_EMAIL':
              setUserError(ALREADY_EMAIL);
              errorToast(ALREADY_EMAIL);
              break;
            case 'ALREADY_PHONE':
              setUserError(ALREADY_PHONE);
              errorToast(ALREADY_PHONE);
              break;
            default:
              break;
          }
        }
        //navegar('/table_employee');
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    },
  });

  /*
  useEffect(() => {
    // Esto resetea el formulario si el estado de location cambia
    formik.resetForm();
  }, [location]);
  */
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen min-w-max bg-gray-50">
        <h2 className="text-4xl font-bold mb-8 text-slate-800">Registro de empleados</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-slate-800 p-4 md:p-6 lg:p-8 rounded-3xl shadow-2xl text-base w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {['nombre', 'apellido', 'cedula', 'edad', 'telefono'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-sm font-medium text-gray-50" htmlFor={field}>
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
            <label className="block text-sm font-medium text-gray-50" htmlFor="rol">
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
              <option value="Empleado">Empleado</option>
              <option value="Administrador">Administrador</option>
            </select>
            {formik.touched.rol && formik.errors.rol ? (
              <div className="text-red-500">{formik.errors.rol}</div>
            ) : null}
          </div>

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
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-4 md:col-span-2">
            <label className="block text-sm font-medium text-gray-50" htmlFor="password">
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
    </>
  );
};

export default RegistroEmpleados;
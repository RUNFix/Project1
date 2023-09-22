import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

//CUSTOM TOASTS:

//Loggin Toast
const logUserToast = (name: string, position: string) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 `}
    >
      <div className="flex-1 w-0 p-4 ">
        <div className="flex items-start ">
          <div className="flex-shrink-0 pt-0.5 ">
            <img
              className="h-10 w-10 rounded-full"
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQWXRgIf4paZOsYrhk1ZUMEAiEih7aKj36UOAmfmuuGxEvxBA2v"
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="mt-1 text-sm text-gray-500">{position}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Cerrar
        </button>
      </div>
    </div>
  ));
};

//Error Toast
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

//                TOAST PARAMETERS
//Warning messages
const NOT_FOUND_USER = 'Usuario no encontrado';
const PASSWORD_INCORRECT = 'Contraseña incorrecta';

const Login: React.FC = () => {
  const [documento, setDocumento] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userError, setUserError] = useState<string>('');
  const [pswdError, setPswdError] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUserError('');
    setPswdError('');
    console.log(`documento: ${documento}, Password: ${password}`);

    let isNumeric: boolean = true;
    if (isNaN(Number(documento.toString()))) {
      isNumeric = false;
      errorToast('El campo Cédula debe ser un valor númerico');
    }
    let isValid: boolean = true;
    if (isNumeric) {
      if (Number(documento) < 0) {
        isValid = false;
        errorToast('El valor en el campo Cédula no es valido');
      }
    }
    if (isValid) {
      // Realizar una solicitud POST utilizando Axios
      axios
        .post('http://localhost:4000/auth/login', {
          cc: documento,
          password: password,
        })
        .then((response) => {
          // Manejar la respuesta del servidor
          console.log('Respuesta del servidor:', response.data);
          const usuario = response.data.user;
          //warning messages
          switch (response.data) {
            case 'NOT_FOUND_USER':
              setUserError(NOT_FOUND_USER);
              errorToast(NOT_FOUND_USER);
              break;
            case 'PASSWORD_INCORRECT':
              setPswdError(PASSWORD_INCORRECT);
              errorToast(PASSWORD_INCORRECT);
              break;
            default:
              console.log('default warning message');
              break;
          }
          logUserToast(usuario.fullName, usuario.position);
          if (usuario.position === 'Administrador') {
            //navegar('/table_employee');
          }
        })
        .catch((error) => {
          //esto es un machetaso ni el hpta, este mensaje deberia ser manejado por el switch case de arriba
          if (error.response.data == 'PASSWORD_INCORRECT') {
            setPswdError(PASSWORD_INCORRECT);
            errorToast(PASSWORD_INCORRECT);
          }

          // Manejar errores, como mostrar un mensaje de error al usuario
          console.error('Error al enviar la solicitud:', error);
        });
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4">
        <div className="mb-8 text-center px-4">
          <div className="mb-8 text-center px-4">
            <h1 className="text-slate-800 font-extrabold mb-12  text-2xl sm:text-3xl">
              TALLER AUTOMOTRIZ RUNFIX
            </h1>
          </div>
        </div>
        <div className="w-full max-w-xs sm:max-w-md  rounded-3xl shadow-2xl p-8 bg-slate-800">
          <h2 className="text-2xl font-extrabold text-blue-500 mb-6">
            Iniciar sesión
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="documento" className="sr-only">
                Documento de identidad
              </label>
              <input
                id="documento"
                name="documento"
                type="documento"
                required
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                className="w-full px-3 py-4 placeholder-gray-600 border rounded-2xl focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Documento"
              />
              <h1 className="text-red-600">{userError}</h1>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-4 placeholder-gray-600 border rounded-2xl focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Contraseña"
              />
              <h1 className="text-red-600">{pswdError}</h1>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full h-12 bg-blue-500 text-white p-2 rounded-2xl
                 hover:bg-blue-700   focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-200"
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

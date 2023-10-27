import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { errorToast, logUserToast } from '../utils/Toast';
import { Toaster } from 'react-hot-toast';
import { isCcValid } from '../utils/ValueChecks';
import { useNavigate } from 'react-router-dom';
import { API_AUTH_LOGIN } from 'src/api/api';
import { TokenExists, setAccessToken, setRefreshToken } from 'src/utils/Token';
import { useUserContext } from 'src/context/Context';
import { LoadingModal } from 'src/utils/Modal';

//CUSTOM TOASTS:
const NOT_FOUND_USER = 'Usuario no encontrado';
const PASSWORD_INCORRECT = 'Contraseña incorrecta';


//Loggin Toast
const Login: React.FC = () => {
  const [documento, setDocumento] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userError, setUserError] = useState<string>('');
  const [pswdError, setPswdError] = useState<string>('');
  const { setCC, setPosition, setEmployeeName } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (TokenExists()) {
      navigate('/home');
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUserError('');
    setPswdError('');

    console.log(`documento: ${documento}, Password: ${password}`);

    const isValid = isCcValid(documento);

    if (isValid) {
      // Realizar una solicitud POST utilizando Axios
      axios
        .post(API_AUTH_LOGIN, {
          cc: documento,
          password: password,
        })
        .then((response) => {
          // Manejar la respuesta del servidor
          setIsLoading(true);
          console.log('Respuesta del servidor:', response.data);

          const usuario = response.data.user;

          logUserToast(usuario.fullName, usuario.position);

          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;

          setAccessToken(accessToken);
          setRefreshToken(refreshToken);

          const rol = usuario.position;
          const cc = usuario.cc;

          setPosition(rol);
          setCC(cc);

          if (rol === 'Empleado') {
            const name = usuario.fullname;
            console.log('Nombre del empleado: ', name);
            setEmployeeName(name);
          }

          setTimeout(() => {
            setIsLoading(false);
            navigate('/submenu');
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          switch (error.response.data.message) {
            case 'NOT_FOUND_USER':
              setUserError(NOT_FOUND_USER);
              errorToast(NOT_FOUND_USER);
              break;
            case 'PASSWORD_INCORRECT':
              setPswdError(PASSWORD_INCORRECT);
              errorToast(PASSWORD_INCORRECT);
              break;
          }
          // DEBUG
          console.error('Error al enviar la solicitud:', error);
        });
    } else {
      errorToast('El valor en el campo Cédula no es valido');
    }
  };

  return (
    <>
      {isLoading && <LoadingModal />}

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

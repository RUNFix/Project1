import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { errorToast, logUserToast } from '../utils/Toast';
import { Toaster } from 'react-hot-toast';
import { isCcValid } from '../utils/ValueChecks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authActions';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../store/index';

//CUSTOM TOASTS:
const NOT_FOUND_USER = 'Usuario no encontrado';
const PASSWORD_INCORRECT = 'Contraseña incorrecta';

//Loggin Toast
const Login: React.FC = () => {
  const [documento, setDocumento] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userError, setUserError] = useState<string>('');
  const [pswdError, setPswdError] = useState<string>('');

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUserError('');
    setPswdError('');

    const isValid = isCcValid(documento);

    if (isValid) {
      try {
        const responseAction = await dispatch(
          loginUser({
            cc: documento,
            password: password,
          }),
        );

        if (loginUser.fulfilled.match(responseAction)) {
          const data = responseAction.payload;
          logUserToast(data.user.fullName, data.user.position);

          const accessToken = data.accessToken;
          const refreshToken = data.refreshToken;

          sessionStorage.setItem('refreshToken', refreshToken);
          sessionStorage.setItem('accessToken', accessToken);

          console.log('rol del usuario: ', data.user.position);

          switch (data.user.position) {
            case 'Administrador':
              navigate('/submenu', { state: { user: 'ADMIN' } });
              break;
            case 'Empleado':
              navigate('/submenu', { state: { user: 'EMPLOYEE' } });
              break;
            default:
              navigate('/submenu');
          }
        }
      } catch (error) {
        // handle errors
        console.log(error);

        switch (error.response.data.error) {
          case 'NOT_FOUND_USER':
            setUserError(NOT_FOUND_USER);
            errorToast(NOT_FOUND_USER);
            break;
          case 'PASSWORD_INCORRECT':
            setPswdError(PASSWORD_INCORRECT);
            errorToast(PASSWORD_INCORRECT);
            break;
        }
      }
    } else {
      errorToast('El valor en el campo Cédula no es valido');
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

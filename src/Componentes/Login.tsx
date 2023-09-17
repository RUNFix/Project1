import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import TablaEmpleados from './TablaEmpleados';
import { useNavigate } from 'react-router-dom';
const Login: React.FC = () => {
  const [documento, setDocumento] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userError, setUserError] = useState<string>('');
  const [pswdError, setPswdError] = useState<string>('');
  const navegar = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUserError('');
    setPswdError('');
    console.log(`documento: ${documento}, Password: ${password}`);

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
            //alert('Usuario no encontrado');
            setUserError('Usuario no encontrado');
            break;
          case 'PASSWORD_INCORRECT':
            //alert('Contraseña errada');
            setPswdError('Contraseña errada');
            break;
          default:
            console.log('default warning message');
            break;
        }
        if (usuario.position === 'Administrador') {
          navegar('/table_employee');
        }
      })
      .catch((error) => {
        //esto es un machetaso ni el hpta, este mensaje deberia ser manejado por el switch case de arriba
        if (error.response.data == 'PASSWORD_INCORRECT') {
          setPswdError('Contraseña errada');
        }

        // Manejar errores, como mostrar un mensaje de error al usuario
        console.error('Error al enviar la solicitud:', error);
      });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 px-4">
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

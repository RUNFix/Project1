import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { errorToast, succesToast } from '../utils/Toast';
import { Toaster } from 'react-hot-toast';
import { isCcValid } from '../utils/ValueChecks';
import { API_AUTH_UPDATE } from 'src/api/api';

const PasswordChange: React.FC = () => {
  const [documento, setDocumento] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [userError, setUserError] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUserError('');

    const isValid = isCcValid(documento);

    if (!isValid) {
      errorToast('El valor en el campo Cédula no es válido');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      errorToast('Las contraseñas no coinciden');
      return;
    }

    axios
      .put(`${API_AUTH_UPDATE}/${documento}`, {
        password: newPassword,
      })
      .then((response) => {
        if (response) {
          succesToast('Contraseña actualizada con éxito');
        }
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
        if (error.response && error.response.data.message) {
          switch (error.response.data.message) {
            case 'NOT_FOUND_USER':
              setUserError('Usuario no encontrado');
              errorToast('Usuario no encontrado');
              break;
            default:
              errorToast('Ocurrió un error al cambiar la contraseña');
          }
        }
      });
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
            Cambio de contraseña
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
                Contraseña nueva
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-3 py-4 placeholder-gray-600 border rounded-2xl focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Contraseña"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="sr-only">
                Confirmar contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-4 placeholder-gray-600 border rounded-2xl focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Contraseña"
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full h-12 bg-green-500 text-white p-2 rounded-2xl
                 hover:bg-green-700   focus:outline-none focus:border-green-900 focus:ring focus:ring-blue-200"
              >
                Actualizar contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordChange;

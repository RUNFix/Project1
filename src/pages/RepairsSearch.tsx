import React, { useState, FormEvent } from 'react';
import { isCcValid } from 'src/utils/ValueChecks';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

//Loggin Toast
const RepairSearch: React.FC = () => {
  const [documento, setDocumento] = useState<string>('');
  const [plate, setPlate] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isValid = isCcValid(documento);

    if (isValid) {
      // Inside your handleSubmit function
      navigate(`/repair-history/${plate}/${documento}`);
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
            Busqueda de reparaciones
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="plate" className="sr-only">
                Placa del vehiculo
              </label>
              <input
                id="plate"
                name="plate"
                type="plate"
                required
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                className="w-full px-3 py-4 placeholder-gray-600 border rounded-2xl focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Placa del vehiculo"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="documento" className="sr-only">
                Documento del cliente
              </label>
              <input
                id="documento"
                name="documento"
                type="documento"
                required
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                className="w-full px-3 py-4 placeholder-gray-600 border rounded-2xl focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Documento del cliente"
              />
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

export default RepairSearch;

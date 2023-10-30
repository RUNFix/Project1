import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { errorToast } from '../utils/Toast';

const ReparacionCliente: React.FC = () => {
  const [placa, setPlaca] = useState<string>('');
  const [reparacionData, setReparacionData] = useState<any | null>(null);

  const handlePlacaSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Realizar una solicitud al backend para obtener los datos de reparación
    axios
      .get(`/api/reparacion/${placa}`) // Reemplaza con la ruta real de tu backend
      .then((response) => {
        // Manejar la respuesta del servidor
        const data = response.data;
        setReparacionData(data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de reparación:', error);
        errorToast('Error al obtener los datos de reparación');
      });
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4">
        <div className="mb-8 text-center px-4">
          <div className="mb-8 text-center px-4">
            <h1 className="text-slate-800 font-extrabold mb-12 text-2xl sm:text-3xl">
              TALLER AUTOMOTRIZ RUNFIX
            </h1>
          </div>
        </div>
        <div className="w-full max-w-xs sm:max-w-md rounded-3xl shadow-2xl p-8 bg-slate-800">
          <h2 className="text-2xl font-extrabold text-blue-500 mb-6">
            Consultar Reparación
          </h2>
          <form onSubmit={handlePlacaSubmit}>
            <div className="mb-6">
              <label htmlFor="placa" className="sr-only">
                Placa del vehículo
              </label>
              <input
                id="placa"
                name="placa"
                type="text"
                required
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                className="w-full px-3 py-4 placeholder-gray-600 border rounded-2xl focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Placa del vehículo"
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full h-12 bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-700 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-200"
              >
                Buscar Reparación
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sección para mostrar los datos de la reparación */}
      {reparacionData && (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4">
          <div className="w-full max-w-md rounded-3xl shadow-2xl p-8 bg-slate-800">
            <h2 className="text-2xl font-extrabold text-blue-500 mb-6">
              Detalles de Reparación
            </h2>
            <div className="mb-4">
              <strong>Nombre del Cliente:</strong> {reparacionData.clientName}
            </div>
            <div className="mb-4">
              <strong>Placa del Vehículo:</strong> {reparacionData.licensePlate}
            </div>
            <div className="mb-4">
              <strong>Razón de la Visita:</strong> {reparacionData.visitReason}
            </div>
            <div className="mb-4">
              <strong>Repuestos Utilizados:</strong> {reparacionData.parts.join(', ')}
            </div>
            <div className="mb-4">
              <strong>Marca del Vehículo:</strong> {reparacionData.vehicleBrand}
            </div>
            <div className="mb-4">
              <strong>Modelo del Vehículo:</strong> {reparacionData.vehicleModel}
            </div>
            <div className="mb-4">
              <strong>Año del Vehículo:</strong> {reparacionData.vehicleYear}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReparacionCliente;

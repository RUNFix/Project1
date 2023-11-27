import React, { useEffect, useState } from 'react';
import 'src/index.css';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { API_BILL_ID, API_PDF } from 'src/api/api';
import { Bill } from 'src/Interfaces/Bill';
import { Client } from 'src/Interfaces/Client';
import { Vehicle } from 'src/Interfaces/Vehicle';
import { Repair } from 'src/Interfaces/Repair';
import logom from '../../assets/RUNFIXmorado.png';
import { useUserContext } from 'src/context/Context';
import { useParams } from 'react-router-dom';

const InvoiceGenerate: React.FC = () => {
  const [billData, setBillData] = useState<Bill>();
  const [clientData, setClientData] = useState<Client>();
  const [vehicleData, setVehicleData] = useState<Vehicle>();
  const [repairData, setRepairData] = useState<Repair>();
  const [hasPosted, setHasPosted] = useState(false);
  const params = useParams();

  const { setUrlPDF } = useUserContext();

  const { id } = params;
  console.log(id)

  console.log(window.location.origin);

  const frontUrl = window.location.origin;

  useEffect(() => {
    const postData = async () => {
      if (!hasPosted) {
        try {
          const response = await axios.post(API_PDF, {
            url: `${frontUrl}/invoice/${id}`,
            _id: id,
          });
   

          console.log('PDF created:', response.data.url);
          setUrlPDF(response.data.url);
          setHasPosted(true);
          console.log(hasPosted);
        } catch (error) {
          console.error('Error converting to PDF:', error);
        }
      }
    };

    postData();
  }, [hasPosted]);

  useEffect(() => {
    console.log('hasPosted updated to:', hasPosted);
  }, [hasPosted]);

  useEffect(() => {
    async function fetchBill() {
      try {
        const response = await axios.get(`${API_BILL_ID}/${id}`);

        const { billData, clientData, vehicleData, repairData } = response.data;

        setBillData(billData);
        setClientData(clientData);
        setVehicleData(vehicleData);
        setRepairData(repairData);

        // If your state is structured differently, adjust the assignments accordingly
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchBill();
  }, [id]);
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="flex justify-between w-full max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-slate-800">
            Recibo de pago
          </h2>
          <div className="bg-azul rounded-lg h-10">
            <img src={logom} className="h-10 ml-2" alt="Runfix logo" />
          </div>
        </div>

        {/* Información personal del dueño en formato de tabla */}

        {clientData && (
          <div className="shadow-xl mb-8 w-full max-w-4xl">
            <table className="min-w-full text-xs md:text-sm bg-white rounded-xl overflow-hidden">
              <thead className="bg-blue-500">
                <tr>
                  <th colSpan={4} className="py-4 px-6 text-center">
                    <strong>Datos del propietario</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <strong>Nombre</strong>
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {clientData.name}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <strong>Apellidos</strong>
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {clientData.lastname}
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6">
                    <strong>Número de cédula</strong>
                  </td>
                  <td className="py-4 px-6">{billData.cc}</td>
                  <td className="py-4 px-6">
                    <strong>E-mail</strong>
                  </td>
                  <td className="py-4 px-6">{clientData.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Información del vehículo en formato de tabla */}
        {vehicleData && repairData && (
          <div className="shadow-xl mb-8 w-full max-w-4xl">
            <table className="min-w-full text-xs md:text-sm bg-white rounded-xl overflow-hidden">
              <thead className="bg-teal-500">
                <tr>
                  <th colSpan={6} className="py-4 px-6  text-center">
                    <strong>Datos del vehiculo</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 px-6">
                    <strong>Placas</strong>
                  </td>
                  <td className="py-4 px-6">{billData.plate}</td>
                  <td className="py-4 px-6">
                    <strong>Estado</strong>
                  </td>
                  <td className="py-4 px-6">{repairData.status}</td>
                  <td className="py-4 px-6">
                    <strong>Modelo</strong>
                  </td>
                  <td className="py-4 px-6">{vehicleData.model}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">
                    <strong>Marca</strong>
                  </td>
                  <td className="py-4 px-6">{vehicleData.brand}</td>
                  <td className="py-4 px-6">
                    <strong>Año</strong>
                  </td>
                  <td className="py-4 px-6">{vehicleData.year}</td>
                  <td className="py-4 px-6">
                    <strong>Color</strong>
                  </td>
                  <td className="py-4 px-6">{vehicleData.color}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">
                    <strong>Empleado Encargado</strong>
                  </td>
                  <td className="py-4 px-6">{repairData.employee}</td>
                  <td className="py-4 px-6">
                    <strong>Numero de telefono</strong>
                  </td>
                  <td className="py-4 px-6">{clientData.phoneNumber}</td>
                  <td className="py-4 px-6">
                    <strong>Total ($)</strong>
                  </td>
                 
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {billData && (
          <div className="shadow-xl mb-6 w-full max-w-4xl">
            <table className="min-w-full text-xs md:text-sm">
              {/* Encabezados de la tabla */}
              <thead className="bg-indigo-600">
                <tr>
                  <th className="text-left py-2 px-6">Descripción</th>
                  <th className="text-left py-2 px-6">Cantidad</th>

                  <th className="text-left py-2 px-6 ">Precio Unitario</th>
                  <th className="text-left py-2 px-6 ">Descuento</th>
                  <th className="text-left py-2 px-6 ">Total</th>
                </tr>
              </thead>
              {/* Cuerpo de la tabla */}
              <tbody>
                {billData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="text-left py-4 px-6">
                      {item.itemDescription}
                    </td>
                    <td className="text-left py-4 px-6">{item.quantity}</td>

                    <td className="text-left py-4 px-6">{item.price}</td>
                    <td className="text-left py-4 px-6">{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:blue-red-700 text-white font-semibold py-2 px-4 rounded-2xl 
            shadow-md transition duration-300 ease-in-out mt-4
          "
          onClick={() => window.location.replace('/submenu')}
          >
          
            Volver al menu
          </button>
        </div>
      </div>
    </>
  );
};
export default InvoiceGenerate;
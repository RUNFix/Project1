import React, { useState } from 'react';
import { Repuesto } from 'src/types/Spare';
import 'src/index.css';
import axios from 'axios';
import { errorToast, notValidToast, succesToast } from '../utils/Toast';
import { Toaster } from 'react-hot-toast';
import { API_BILL } from 'src/api/api';

const VehicleReceipt: React.FC = () => {
    const [repuestos, setRepuestos] = useState<Repuesto[]>([]);
    const [Repuesto, getNuevoRepuesto] = useState<Repuesto>({
      cantidad: 0,
      descripcion: '',
      precioUnitario: 0,
      descuento: 0,
      subtotal: 0,
    });
    const [vehiculoInfo, getVehiculoInfo] = useState({
        name: 'Juan',//ok
        lastname: 'Rodriguez',//ok
        email: 'sdfdf',//ok/
        cc: '123456',//ok
        plate: 'SIA011',//ok
        phoneNumber: '123456',
        model: 'Toyota',//ok
        brand: 'Camry',//ok
        year: '2021',//ok
        color:'Dark gray',//ok
        status: 'Checked',//ok
        priceToPay: '12000',//ok
        employee: 'Juan',//ok
        items: 'fewrrfg'
      });
      return(
        <>
        <Toaster/>
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
            <h2 className='text-2xl md:text-4xl font-bold mb-8 text-slate-800'>
                Recibo de pago
            </h2>
            {/*Información personal del dueño*/}
            <div className='bg-slate-800 px-4 lg:p-8 rounded-3xl shadow-2xl mb-6 w-3/4 md:w-full max-w-3xl md:max-w-6xl"'>
                <h3 className="text-xl font-semibold mb-4 text-white">
                    Datos del propietario
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='mb-4'>
                        <label className='text-white'>
                            Nombre
                        </label>
                        <input
                        type='text'
                        name='nombre'
                        value={vehiculoInfo.name}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-white'>
                            Apellidos
                        </label>
                        <input
                        type='text'
                        name='Apellidos'
                        value={vehiculoInfo.lastname}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-white'>
                            Número de cédula
                        </label>
                        <input
                        type='text'
                        name='cc'
                        value={vehiculoInfo.cc}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-white'>
                            E-mail
                        </label>
                        <input
                        type='text'
                        name='email'
                        value={vehiculoInfo.email}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                </div>
            </div>
            {/*Información del vehículo*/}
            <div className='bg-slate-800 px-4 lg:p-8 rounded-3xl shadow-2xl mb-6 w-3/4 md:w-full max-w-3xl md:max-w-6xl"'>
                <h3 className="text-xl font-semibold mb-4 text-white">
                    Datos del vehículo
                </h3>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='mb-4'>
                        <label className='text-white'>
                            Placas
                        </label>
                        <input
                        type='text'
                        name='plates'
                        value={vehiculoInfo.plate}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-white'>
                            Estado
                        </label>
                        <input
                        type='text'
                        name='State'
                        value={vehiculoInfo.status}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-white'>
                            Modelo
                        </label>
                        <input
                        type='text'
                        name='model'
                        value={vehiculoInfo.model}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-white'>
                            Marca
                        </label>
                        <input
                        type='text'
                        name='brand'
                        value={vehiculoInfo.brand}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-white'>
                            Año
                        </label>
                        <input
                        type='text'
                        name='year'
                        value={vehiculoInfo.year}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-white'>
                            Color
                        </label>
                        <input
                        type='text'
                        name='color'
                        value={vehiculoInfo.color}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-white'>
                            Total ($)
                        </label>
                        <input
                        type='text'
                        name='priceToPay'
                        value={vehiculoInfo.priceToPay}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-white'>
                            Empleado encargado
                        </label>
                        <input
                        type='text'
                        name='employee'
                        value={vehiculoInfo.employee}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-white'>
                            Número de teléfono
                        </label>
                        <input
                        type='text'
                        name='phoneNumber'
                        value={vehiculoInfo.phoneNumber}
                        className='spareInputStyle'
                        readOnly
                        />
                    </div>
                </div>
            </div>
            <div className='w-3/4 md:w-full max-w-3xl md:max-w-6xl overflow-x-auto mb-4 overflow-y-auto max-h-[480px]'>
                <table className='min-w-full bg-white text-xs md:text-sm'>
                    {/* Encabezados de la tabla */}
                    <thead className='bg-slate-400'>
                        <tr>
                            <th className='text-left py-2 px-6 text-white'>Cantidad</th>
                            <th className="text-left py-2 px-6 text-white">Descripción</th>
                            <th className="text-left py-2 px-6 text-white">Precio Unitario</th>
                            <th className="text-left py-2 px-6 text-white">Descuento</th>
                            <th className="text-left py-2 px-6 text-white">Total</th>
                        </tr>
                    </thead>
                    {/* Cuerpo de la tabla */}
                    <tbody>
                        {repuestos.map((Repuesto, index) => (
                            <tr key={index}>
                                <td className='text-left py-4 px-6'>{Repuesto.cantidad}</td>
                                <td className='text-left py-4 px-6'>{Repuesto.descripcion}</td>
                                <td className='text-left py-4 px-6'>{Repuesto.precioUnitario}</td>
                                <td className='text-left py-4 px-6'>{Repuesto.descuento}</td>
                                <td className='text-left py-4 px-6'>{Repuesto.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl shadow-md transition duration-300 ease-in-out mt-4'
                >
                    Convertir a PDF
                </button>
            </div>
        </div>
        </>
      );
    }
export default VehicleReceipt;
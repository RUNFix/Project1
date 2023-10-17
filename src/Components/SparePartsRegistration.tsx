import React, { useState } from 'react';
import { Repuesto } from '../types/Spare';
import '../index.css';
import axios from 'axios';
import {
  isCcValid,
  isPlateValid,
  isPriceValid,
  isValidDiscount,
} from '../utils/ValueChecks';
import { errorToast, notValidToast, succesToast } from '../utils/Toast';
import { Toaster } from 'react-hot-toast';

const TablaRepuestos: React.FC = () => {
  const [repuestos, setRepuestos] = useState<Repuesto[]>([]);
  const [nuevoRepuesto, setNuevoRepuesto] = useState<Repuesto>({
    cantidad: 0,
    descripcion: '',
    precioUnitario: 0,
    descuento: 0,
    total: 0,
  });
  const [vehiculoInfo, setVehiculoInfo] = useState({
    nombreDueño: '',
    numeroDocumento: '',
    placas: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNuevoRepuesto({
      ...nuevoRepuesto,
      [name]:
        name === 'cantidad' || name === 'precioUnitario' || name === 'descuento'
          ? parseFloat(value)
          : value,
    });
  };

  const handleVehiculoInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setVehiculoInfo({
      ...vehiculoInfo,
      [name]: value,
    });
  };

  const handleGuardarClick = async () => {
    let isValid = true;
    if (!isCcValid(vehiculoInfo.numeroDocumento)) {
      notValidToast('Número de Documento del Dueño');
      isValid = false;
    } else if (!isPlateValid(vehiculoInfo.placas)) {
      notValidToast('Placa del Vehículo');
      isValid = false;
    } else if (repuestos.length === 0) {
      errorToast('No se han agregado repuestos');
      isValid = false;
    }

    if (isValid) {
      // Envía los datos del vehículo al backend utilizando una solicitud POST o PUT
      try {
        //Creates items array for the back-end
        const repuestosParaGuardar = repuestos.map((repuesto) => ({
          quantity: repuesto.cantidad,
          itemDescription: repuesto.descripcion,
          price: repuesto.precioUnitario,
          discount: repuesto.descuento,
          subtotal: repuesto.subtotal,
        }));

        const total = repuestosParaGuardar.reduce((accumulator, repuesto) => {
          return accumulator + repuesto.subtotal;
        }, 0);

        const vehiculoData = {
          //nombreDueño: vehiculoInfo.nombreDueño, //no estoy seguro si usarla (nope, no se usa)
          cc: vehiculoInfo.numeroDocumento,
          plate: vehiculoInfo.placas,
          items: repuestosParaGuardar,
          total: total,
        };
        // Realiza la solicitud al backend con vehiculoData
        await axios.post('http://localhost:4000/bill', vehiculoData);

        // Aquí puedes manejar la respuesta del servidor si es necesario
        console.log('Datos del vehículo guardados exitosamente');
        succesToast('La factura ha sido registrada');
        //También puedes limpiar el formulario del vehículo aquí si lo deseas
        setVehiculoInfo({
          nombreDueño: '',
          numeroDocumento: '',
          placas: '',
        });
        setRepuestos([]);
      } catch (error: any) {
        //Warnings from back-end
        switch (error.response.data.message) {
          case 'VEHICLE_DOES_NOT_EXIST':
            errorToast('Esta placa no esta registrada en el sistema');
            break;
          case 'USER_DOES_NOT_EXIST':
            errorToast('Este usuario no esta registrado en el sistema');
            break;
        }
        console.error(
          'Hubo un error al guardar los datos del vehículo:',
          error,
        );
      }
    }
  };

  const handleAgregarClick = () => {
    // Validar que se hayan ingresado todos los campos obligatorios
    if (
      !nuevoRepuesto.cantidad ||
      !nuevoRepuesto.descripcion ||
      !nuevoRepuesto.precioUnitario
    ) {
      alert('Por favor, complete todos los campos de repuestos.');
      return;
    }

    let isValid = true;
    if (!isPriceValid(nuevoRepuesto.cantidad)) {
      notValidToast('Cantidad');
      isValid = false;
    } else if (!isPriceValid(nuevoRepuesto.precioUnitario)) {
      notValidToast('Precio Unitario');
      isValid = false;
    } else if (!isValidDiscount(nuevoRepuesto.descuento)) {
      notValidToast('Descuento');
      isValid = false;
    }

    if (isValid) {
      succesToast('Repuesto agregado exitosamente');
      // Calcular el total
      const subtotal =
        nuevoRepuesto.cantidad *
        nuevoRepuesto.precioUnitario *
        (1 - nuevoRepuesto.descuento / 100);

      // Agregar el nuevo repuesto al estado local
      setRepuestos([...repuestos, { ...nuevoRepuesto, subtotal }]);

      // Limpiar el formulario de repuestos
      setNuevoRepuesto({
        cantidad: 0,
        descripcion: '',
        precioUnitario: 0,
        descuento: 0,
        subtotal: 0,
      });
    }
  };

  const handleEliminarClick = (index: number) => {
    // Eliminar el repuesto en la posición 'index' del estado local
    const nuevosRepuestos = [...repuestos];
    nuevosRepuestos.splice(index, 1);
    setRepuestos(nuevosRepuestos);
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-slate-800">
          Lista de Repuestos
        </h2>
        {/* Formulario para datos del vehículo */}
        <div className="bg-slate-800 px-4 lg:p-8 rounded-3xl shadow-2xl mb-6 w-3/4 md:w-full max-w-3xl md:max-w-6xl">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Datos del Vehículo
          </h3>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="text-white">
                  Número de Documento del Dueño
                </label>
                <input
                  type="text"
                  name="numeroDocumento"
                  value={vehiculoInfo.numeroDocumento}
                  onChange={handleVehiculoInputChange}
                  className="spareInputStyle"
                />
              </div>
              <div className="mb-4">
                <label className="text-white">Placa del Vehículo</label>
                <input
                  type="text"
                  name="placas"
                  value={vehiculoInfo.placas}
                  onChange={handleVehiculoInputChange}
                  className="spareInputStyle"
                />
              </div>
            </div>
          </form>
          {/* Botón "Guardar" alineado a la derecha */}
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl shadow-md transition duration-300 ease-in-out mt-4"
              onClick={handleGuardarClick}
            >
              Guardar Factura
            </button>
          </div>
        </div>
        {/* Formulario para agregar un nuevo repuesto */}
        <div className="bg-slate-800 px-4 lg:p-8 rounded-3xl shadow-2xl mb-6 w-3/4 md:w-full max-w-3xl md:max-w-6xl">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Agregar Nuevo Repuesto
          </h3>
          <form className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white">Cantidad</label>
              <input
                type="number"
                name="cantidad"
                value={nuevoRepuesto.cantidad}
                onChange={handleInputChange}
                className="spareInputStyle"
              />
            </div>
            <div>
              <label className="text-white">Descripción</label>
              <input
                type="text"
                name="descripcion"
                value={nuevoRepuesto.descripcion}
                onChange={handleInputChange}
                className="spareInputStyle"
              />
            </div>
            <div>
              <label className="text-white">Precio Unitario</label>
              <input
                type="number"
                name="precioUnitario"
                value={nuevoRepuesto.precioUnitario}
                onChange={handleInputChange}
                className="spareInputStyle"
              />
            </div>
            <div>
              <label className="text-white">Descuento</label>
              <input
                type="number"
                name="descuento"
                value={nuevoRepuesto.descuento}
                onChange={handleInputChange}
                className="spareInputStyle"
              />
            </div>
          </form>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl shadow-md transition duration-300 ease-in-out mt-4"
              onClick={handleAgregarClick}
            >
              Añadir
            </button>
          </div>
        </div>
        {/* Tabla de repuestos */}
        <div className="w-3/4 md:w-full max-w-3xl md:max-w-6xl overflow-x-auto mb-4 overflow-y-auto max-h-[480px]">
          <table className="min-w-full bg-white text-xs md:text-sm">
            {/* Encabezados de la tabla */}
            <thead className="bg-slate-400">
              <tr>
                <th className="text-left py-2 px-6 text-white">Cantidad</th>
                <th className="text-left py-2 px-6 text-white">Descripción</th>
                <th className="text-left py-2 px-6 text-white">
                  Precio Unitario
                </th>
                <th className="text-left py-2 px-6 text-white">Descuento</th>
                <th className="text-left py-2 px-6 text-white">Total</th>
                <th className="text-left py-2 px-6 text-white">Acciones</th>
              </tr>
            </thead>
            {/* Cuerpo de la tabla */}
            <tbody>
              {repuestos.map((repuesto, index) => (
                <tr key={index}>
                  <td className="text-left py-4 px-6">{repuesto.cantidad}</td>
                  <td className="text-left py-4 px-6">
                    {repuesto.descripcion}
                  </td>
                  <td className="text-left py-4 px-6">
                    {repuesto.precioUnitario}
                  </td>
                  <td className="text-left py-4 px-6">{repuesto.descuento}</td>
                  <td className="text-left py-4 px-6">{repuesto.subtotal}</td>
                  <td className="text-left py-4 px-6">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-md shadow-md transition duration-300 ease-in-out"
                      onClick={() => handleEliminarClick(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TablaRepuestos;

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
screen;
import { Empleado } from '../../Interfaces/Employee';
import InvalidCredentialsModal, { ConfirmModal } from '../../utils/Modal';
import { API_EMPLOYEE } from 'src/api/api';
import { getAccessToken } from 'src/utils/Token';
import { useUserContext } from 'src/context/Context';

import SearchEmployee from './SearchEmployee';
import axiosInstance from 'src/utils/Auth';

const EmployeeTable: React.FC = () => {
  const [selectedEmpleado, setSelectedEmpleado] = useState<string | null>(null);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const tableDivRef = useRef<HTMLDivElement>(null);
  const navegar = useNavigate();
  const [showInvalidCredentialsModal, setShowInvalidCredentialsModal] =
    useState(false);
  const { position } = useUserContext();

  const handleEmployeeFilter = (datos: any) => {
    setEmpleados(datos);
    console.log('pasando props');
  };

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await axiosInstance.get(API_EMPLOYEE);
        setEmpleados(response.data);
      } catch (error) {
        console.error('error', error);
        if (error.response?.status === 401) {
          if (position !== 'Administrador') {
            setShowInvalidCredentialsModal(true);
          }
        }
      }
    }

    const initialAccessToken = getAccessToken();
    if (initialAccessToken) {
      fetchEmployees();
    }
  }, [setEmpleados]);

  useEffect(() => {
    const handleScroll = () => {
      if (!tableDivRef.current) return;

      const isBottom =
        tableDivRef.current.scrollTop + tableDivRef.current.clientHeight >=
        tableDivRef.current.scrollHeight;

      if (isBottom) {
        setVisibleCount((prevCount) =>
          Math.min(prevCount + 20, empleados.length),
        );
      }
    };

    if (tableDivRef.current) {
      tableDivRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableDivRef.current) {
        tableDivRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [empleados]);

  const handleButtonPress = (cc: string) => {
    setSelectedEmpleado(cc);
  };

  const goRegistroEmpleado = () => {
    const id = selectedEmpleado;
    const filtrado = empleados.filter((empleado) => {
      return empleado.cc === id;
    });

    console.log('Esto es el filtadro ' + filtrado);
    if (id) {
      navegar('/register-employee', {
        state: { filtrado: filtrado[0] },
      });
    } else {
      alert('Por favor, seleccione un empleado para actualizar');
    }
  };

  const deleteEmployee = async () => {
    if (selectedEmpleado === null) {
      alert('Por favor, seleccione un empleado para eliminar');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    try {
      await axiosInstance.delete(`${API_EMPLOYEE}/${selectedEmpleado}`);
      setEmpleados(empleados.filter((emp) => emp.cc !== selectedEmpleado));
      setSelectedEmpleado(null);
    } catch (error) {
      console.error('Hubo un error al eliminar el empleado:', error);
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      {showInvalidCredentialsModal && <InvalidCredentialsModal />}
      {showConfirmModal && (
        <ConfirmModal onConfirm={handleConfirm} onCancel={handleCancel} />
      )}

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-slate-800">
          Lista de empleados
        </h2>
        <SearchEmployee onEmployeeFilter={handleEmployeeFilter} />
        <div className=" bg-slate-800 mt-8 px-4 lg:p-8 rounded-3xl shadow-2xl mb-6">
          <div
            ref={tableDivRef}
            className="flex justify-center text-xs md:text-base w-3/4 md:w-full max-w-3xl md:max-w-6xl overflow-x-auto mb-4 overflow-y-auto max-h-[480px]"
          >
            <table className="min-w-full bg-white text-xs md:text-sm">
              <thead className="bg-slate-400 sticky top-0">
                <tr>
                  {['Nombre', 'Cédula', 'Edad', 'Rol', 'Teléfono', 'Email'].map(
                    (header, index) => (
                      <th
                        key={index}
                        className="text-center py-2 px-4 uppercase font-semibold text-sm"
                      >
                        {header}
                      </th>
                    ),
                  )}
                  <th className="text-center py-2 px-4 uppercase font-semibold text-sm">
                    Seleccionar
                  </th>
                </tr>
              </thead>
              <tbody>
                {empleados.slice(0, visibleCount).map((empleado) => (
                  <tr
                    key={empleado.cc}
                    className={`${
                      selectedEmpleado === empleado.cc ? 'bg-indigo-200' : ''
                    }`}
                  >
                    <td className="text-left py-4 px-6">{empleado.fullName}</td>
                    <td className="text-left py-4 px-6">{empleado.cc}</td>
                    <td className="text-left py-4 px-6 hidden md:table-cell">
                      {empleado.age}
                    </td>
                    <td className="text-left py-4 px-6 hidden md:table-cell">
                      {empleado.position}
                    </td>
                    <td className="text-left py-4 px-6 hidden md:table-cell">
                      {empleado.phone}
                    </td>
                    <td className="text-left py-4 px-6 hidden md:table-cell">
                      {empleado.email}
                    </td>
                    <td className="text-center py-4 px-6">
                      <button
                        className={`text-white rounded-full h-10 w-10 focus:outline-none ${
                          selectedEmpleado === empleado.cc
                            ? 'bg-green-700'
                            : 'bg-green-500'
                        }`}
                        onClick={() => handleButtonPress(empleado.cc)}
                      >
                        ✓
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-2xl shadow-md transition duration-300 ease-in-out"
            onClick={() => goRegistroEmpleado()}
          >
            Actualizar empleado
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-2xl shadow-md transition duration-300 ease-in-out"
            onClick={() => deleteEmployee()}
          >
            Eliminar Empleado
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;

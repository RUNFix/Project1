import React, { useState } from "react";
import RegistroEmpleados from "./RegistroEmpleados";
import RoutesApp from "../Routes/Router";
import { useNavigate } from "react-router-dom";

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  edad: string;
  rol: string;
  telefono: string;
  email: string;
  imageUrl: string;
}

interface EmpleadoCardProps {
  empleados: Empleado[];
}

const EmpleadoCard: React.FC<EmpleadoCardProps> = ({ empleados }) => {
  const [selectedEmpleado, setSelectedEmpleado] = useState<null | number>(null);
  const [showRegistro, setShowRegistro] = useState(true);

  const handleCardClick = (id: number) => {
    setSelectedEmpleado(id);
    setShowRegistro(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-100">
      {showRegistro ? (
        <>
          <h2 className="text-4xl font-bold mb-8">Lista de Empleados</h2>
          <div className="flex flex-wrap justify-center">
            {empleados.map((empleado) => (
              <button
                key={empleado.id}
                onClick={() => handleCardClick(empleado.id)}
                className="bg-indigo-500 text-zinc-100 text-left m-4 p-8 font-semibold rounded-3xl shadow-lg w-auto flex items-center hover: "
              >
                <div className="flex-1">
                  <h3 className="text-3xl mb-6 font-semibold">{`${empleado.nombre} ${empleado.apellido}`}</h3>
                  <p>{`Cédula: ${empleado.cedula}`}</p>
                  <p>{`Edad: ${empleado.edad}`}</p>
                  <p>{`Rol: ${empleado.rol}`}</p>
                  <p>{`Teléfono: ${empleado.telefono}`}</p>
                  <p>{`Email: ${empleado.email}`}</p>
                </div>
                <img
                  src={
                    "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                  }
                  alt={`${empleado.nombre} ${empleado.apellido}`}
                  className="w-32 h-32 rounded-full ml-4 "
                />
              </button>
            ))}
          </div>
        </>
      ) : (
        <RegistroEmpleados/>
      )}
    </div>
  );
};

export default EmpleadoCard;

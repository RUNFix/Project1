import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SubMenu() {
  const [adminActive, setAdminActive] = useState(true);
  const location = useLocation();
  const rol = location.state?.user || 'DEFAULT';
  console.log('rol en submenu: ', rol);

  useEffect(() => {
    if (rol === 'EMPLOYEE') {
      setAdminActive(false);
    }
  }, [rol]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-justify">
      <Navbar />
      <main className="flex-grow md:p-6 lg:p-12 mx-32 md:mx-48 lg:mx-52">
        <h1 className="text-4xl text-center font-semibold">
          Bienvenido a RUNFIX
        </h1>
        <h2 className="text-2xl mt-8 md:mt-12 text-center font-semibold">
          ¿Hacia donde te diriges?
        </h2>
        {adminActive ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12 my-8 md:my-12">
            <Card
              title={'Creacion de empleado'}
              img="https://img.freepik.com/vector-premium/oficina-negocios-empleado-espacio-trabajo-dibujos-animados_24640-32917.jpg"
              showDetails={false}
              screen="register-employee"
            />
            <Card
              title={'Ver empleados'}
              img="https://img.freepik.com/vector-premium/analisis-datos-investigacion-vector-dibujos-animados-plana_101884-309.jpg?w=2000"
              showDetails={false}
              screen="tableEmployee"
            />
          </section>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12 my-8 md:my-12">
            <Card
              title={'Tareas pendientes'}
              img="https://img.freepik.com/vector-premium/lista-verificacion-completa-ilustracion-plana-mujer-dibujos-animados_74855-18269.jpg"
              showDetails={false}
              screen="vehicle"
            />
            <Card
              title={'Cambio de credenciales'}
              img="https://media.istockphoto.com/id/578111122/es/vector/licencia-m%C3%A9dico-en-mano.jpg?s=612x612&w=0&k=20&c=Q1mjRrzykYuOVmbSInOE_oHE48dNRT96V1_kmtwUj8M="
              showDetails={false}
              screen="password-change"
            />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

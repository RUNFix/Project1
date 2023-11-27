import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Card from './Card';
import { useUserContext } from 'src/context/Context';
import { Toaster } from 'react-hot-toast';

export default function SubMenu() {
  const [adminActive, setAdminActive] = useState(true);

  const { position } = useUserContext();

  console.log('rol en submenu: ', position);

  useEffect(() => {
    if (position === 'Empleado') {
      setAdminActive(false);
    }
  }, [position]);

  return (
    <>
      <Toaster />
      <div className="flex flex-col min-h-screen bg-azul text-justify text-white">
        <Navbar />
        <main className="flex-grow md:p-6 lg:p-12 mx-32 md:mx-48 lg:mx-52">
          <h1 className="text-4xl text-center font-semibold">
            Bienvenido a RUNFIX
          </h1>
          <h2 className="text-2xl mt-8 md:mt-12 text-center font-semibold">
            ¿Hacia dónde te diriges?
          </h2>
          {adminActive ? (
            <section className="place-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12 my-8 md:my-12">
              <Card
                title={'Creación de empleado'}
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
              <Card
                title={'Cambio de credenciales'}
                img="https://media.istockphoto.com/id/578111122/es/vector/licencia-m%C3%A9dico-en-mano.jpg?s=612x612&w=0&k=20&c=Q1mjRrzykYuOVmbSInOE_oHE48dNRT96V1_kmtwUj8M="
                showDetails={false}
                screen="password-change"
              />
              <Card
                title={'Creación de reparación'}
                img="https://media.istockphoto.com/id/578111122/es/vector/licencia-m%C3%A9dico-en-mano.jpg?s=612x612&w=0&k=20&c=Q1mjRrzykYuOVmbSInOE_oHE48dNRT96V1_kmtwUj8M="
                showDetails={false}
                screen="vehicle-repair"
              />
            </section>
          ) : (
            <section className="place-items-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12 my-8 md:my-12">
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
              <Card
                title={'Registro vehiculo'}
                img="https://media.istockphoto.com/id/578111122/es/vector/licencia-m%C3%A9dico-en-mano.jpg?s=612x612&w=0&k=20&c=Q1mjRrzykYuOVmbSInOE_oHE48dNRT96V1_kmtwUj8M="
                showDetails={false}
                screen="vehicle-menu"
              />
              <Card
                title={'Resgistro de cliente'}
                img="https://media.istockphoto.com/id/578111122/es/vector/licencia-m%C3%A9dico-en-mano.jpg?s=612x612&w=0&k=20&c=Q1mjRrzykYuOVmbSInOE_oHE48dNRT96V1_kmtwUj8M="
                showDetails={false}
                screen="customer-register"
              />
              <Card
                title={'Creación de reparación'}
                img="https://media.istockphoto.com/id/578111122/es/vector/licencia-m%C3%A9dico-en-mano.jpg?s=612x612&w=0&k=20&c=Q1mjRrzykYuOVmbSInOE_oHE48dNRT96V1_kmtwUj8M="
                showDetails={false}
                screen="vehicle-repair"
              />
            </section>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

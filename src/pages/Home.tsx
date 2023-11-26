import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import SocialMediaIcons from '../components/SocialMediaCards';
import logo from '../assets/RUNFIX.png'
import logom from '../assets/RUNFIXmorado.png'
import car from '../assets/lux-car.jpg'

const MenuPrincipal: React.FC = () => {
  const quienesRef = useRef<HTMLDivElement>(null);

  const handleScrollToQuienes = () => {
    if (quienesRef.current) {
      quienesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-azul text-justify">
        <main className="flex-grow container mx-auto p-10 mt-14 text-white ">

          <div className='grid grid-cols-2 gap-20 h-screen'>
            <div className='col-span-1 p-8'>
              <h1 className="text-4xl mb-12 text-center font-semibold text-white">
                Una nueva forma de ir al mecánico
              </h1>
              <p>Velamos por tu tranquilidad, al llevar el proceso de reparación al siguiente
                nivel, con personal integro y transparente que hará lo mejor por tu vehículo
              </p>

              <div className='grid grid-cols-1 mt-5'>
              <div className="flex flex-col justify-center items-center">
                <div className='m-4 w-1/3'> 
                <button className="bg-morado hover:bg-green-500 text-white p-2 rounded ml-2 flex-grow-0 w-full"
                onClick={handleScrollToQuienes}>
                  
                  Conoce más
                </button>
                </div>
                
                <div className='m-4 w-1/3'>
                <button className="bg-morado hover:bg-green-500 text-white p-2 rounded ml-2 flex-grow-0 w-full"
                >
                  <a href="https://t.me/">Agenda una cita</a>
                 
                </button>
                </div>
                
              </div>
            </div>
              
            </div>

            <div>

              <img src={car} alt="" />
            </div>
            
          </div>
          
          <div className='mb-9'>
            <h2 className="text-2xl text-center font-semibold text-white max-lg:hidden ">
              Con RunFix puede esperar nada menos que integridad, habilidad y un
              servicio excepcional."
            </h2>
          </div>
          
          
          
          {/* CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-auto mt-8">
            <Card
              title={
                'Cómo RunFix está cambiando la industria en la reparación automotriz '
              }
              description={
                'Eche un vistazo detrás de escena de cómo RunFix está utilizando tecnología de punta y prácticas centradas en el cliente para transformar la experiencia de reparación de automóviles.'
              }
              img="https://blog.reparacion-vehiculos.es/hs-fs/hubfs/Mantenimiento%20coche.jpg?width=600&name=Mantenimiento%20coche.jpg"
              showDetails={false}
            />
            <Card
              title={
                'Evite Sorpresas: cómo nuestro sistema de fotografías mejora su experiencia'
              }
              description={
                'Exploramos cómo el registro fotográfico del estado del vehículo antes, durante y después de la reparación puede marcar una gran diferencia en su satisfacción como cliente y en la calidad del servicio'
              }
              img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRPUHcpF5-Puip-OwsmM6i1YN3yg6G5OvTLg&usqp=CAU"
              showDetails={false}
            />

            <Card
              title={
                'Consejos para mantener su vehículo en óptimas condiciones y evitar futuras reparaciones'
              }
              description={
                'Mantener su vehículo en buen estado es esencial para evitar reparaciones costosas en el futuro. En este artículo, compartimos consejos útiles que le ayudarán a mantener su coche funcionando de manera óptima.'
              }
              img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaoI7AskRBDIGz-iwD_TWE5A-7UmV_GE7njbPIULGO5muZEfMG5T1GQN5ao8CoJpE_5TI&usqp=CAU"
              showDetails={false}
            />
          </section>
          {/* Quienes somos Seccion */}
          <section className="flex flex-col items-center my-24" ref={quienesRef}>
            <h2 className="text-4xl text-center mb-20">¿Quienes somos?</h2>
            <img
              className="rounded-full mx-auto h-1/2  w-1/2 mb-16 transform hover:scale-110 transition-transform duration-300"
              src="https://blog.reparacion-vehiculos.es/hubfs/Taller%20mecanico.jpg"
              alt="Taller Mecánico"
            />
            <p className="text-justify text-xl w-3/4">
              Somos RunFix, la revolución en la reparación y mantenimiento
              automotriz. Con un enfoque centrado en la transparencia, la
              tecnología y el talento, estamos redefiniendo la relación entre
              los propietarios de vehículos y los talleres mecánicos. A través
              de nuestro software avanzado, brindamos un seguimiento en tiempo
              real y documentación detallada que contribuyen al bienestar de los
              propietarios de vehículos al ofrecer un servicio excepcional,
              eficiente y de plena confianza.Aunque nuestra especialidad es la
              mecánica automotriz, nuestra verdadera pasión es la mejora
              continua del servicio al cliente en todo el proceso de reparación
              y mantenimiento de vehículos. Somos más que un taller mecánico;
              somos su aliado estratégico en el cuidado de su vehículo.
            </p>
            <h3 className="text-4xl my-16">¿Por Qué Somos Diferentes?</h3>
            <img
              className="rounded-3xl mx-auto h-1/4  w-1/4 hover:translate-x-32 transition-transform duration-300"
              src="https://img.freepik.com/vector-gratis/diseno-pegatinas-personaje-dibujos-animados-mecanico-automoviles_1308-58247.jpg?w=2000"
            />
            <p className="text-xl w-3/4 mt-8">
              Somos más que un taller mecánico; somos su aliado estratégico en
              el cuidado de su vehículo. Nos diferenciamos al adoptar un enfoque
              de servicio completo que va más allá de la simple reparación y
              mantenimiento. Utilizamos la tecnología para mejorar la
              transparencia, agilizar la comunicación y optimizar todas las
              etapas del servicio. Nos diferenciamos al adoptar un enfoque de
              servicio completo que va más allá de la simple reparación y
              mantenimiento. Utilizamos la tecnología para mejorar la
              transparencia, agilizar la comunicación y optimizar todas las
              etapas del servicio.
            </p>
          </section>
          

          
          <h4 className="m-16 text-center text-xl font-semibold">
            Contactanos en nuestras redes sociales
          </h4>
          <SocialMediaIcons />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MenuPrincipal;

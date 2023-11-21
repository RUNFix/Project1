import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import SocialMediaIcons from '../components/SocialMediaCards';
import logo from '../assets/RUNFIX.png'


const MenuPrincipal: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-azul text-justify">
        <main className="flex-grow container mx-auto p-10 mt-14 text-white ">

          <div className='grid grid-cols-2 gap-20 h-80'>
            <div className='col-span-1'>
              <h1 className="text-4xl mb-12 text-center font-semibold text-white">
                Una Nueva Forma de ir al Mecánico
              </h1>
              <p>Velamos por tu tranquilidad, al llevar el proceso de reparación al siguiente
                nivel, con personal integro y transparente que hará lo mejor por tu vehículo
              </p>

              <div className='grid grid-cols-1 mt-5'>
              <div className="flex">
                <button className="bg-logo hover:bg-green-500 text-white p-1 rounded ml-2 flex-grow-0">
                  Conoce más
                </button>

                <button className="bg-logo hover:bg-green-500 text-white p-1 rounded ml-2 flex-grow-0">
                  Agenda una cita
                </button>
              </div>
            </div>
              
            </div>

            <div>

              <img src={logo} alt="" />
            </div>
            
          </div>
          
          
          <h2 className="text-2xl mb-16 text-center font-semibold text-white">
            Con RunFix puede esperar nada menos que integridad, habilidad y un
            servicio excepcional."
          </h2>
          {/* CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-auto">
            <Card
              title={
                'Cómo RunFix Está Cambiando el Juego en la Reparación Automotriz'
              }
              description={
                'Eche un vistazo detrás de escena de cómo RunFix está utilizando tecnología de punta y prácticas centradas en el cliente para transformar la experiencia de reparación de automóviles.'
              }
              img="https://blog.reparacion-vehiculos.es/hs-fs/hubfs/Mantenimiento%20coche.jpg?width=600&name=Mantenimiento%20coche.jpg"
              showDetails={true}
            />
            <Card
              title={
                'Evite Sorpresas: Cómo Nuestro Sistema de Fotografías Mejora su Experiencia'
              }
              description={
                'Exploramos cómo el registro fotográfico del estado del vehículo antes, durante y después de la reparación puede marcar una gran diferencia en su satisfacción como cliente y en la calidad del servicio'
              }
              img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRPUHcpF5-Puip-OwsmM6i1YN3yg6G5OvTLg&usqp=CAU"
              showDetails={true}
            />

            <Card
              title={
                'Consejos para Mantener su Vehículo en Óptimas Condiciones'
              }
              description={
                ' "Mantener su vehículo en buen estado es esencial para evitar reparaciones costosas en el futuro. En este artículo, compartimos consejos útiles que le ayudarán a mantener su coche funcionando de manera óptima.'
              }
              img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaoI7AskRBDIGz-iwD_TWE5A-7UmV_GE7njbPIULGO5muZEfMG5T1GQN5ao8CoJpE_5TI&usqp=CAU"
              showDetails={true}
            />
          </section>
          {/* Quienes somos Seccion */}
          <section className="flex flex-col items-center my-24">
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
          <section className="m-8 bg-slate-50 border-4 p-12 rounded-3xl">
            <h2 className="text-3xl mb-12 text-center font-semibold">
              Acerca de RUNFIX
            </h2>

            {/* Tarjeta de la Misión */}
            <article className="flex mt-4 items-center mb-8">
              <img
                className="mr-5 rounded-3xl w-1/4  h-auto"
                src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Misión de RUNFix"
              />
              <div className="transform hover:scale-90 transition-transform duration-300">
                <h3 className="text-3xl mb-4">Misión</h3>
                <p className="text-xl justify-center ">
                  Transformar la experiencia de reparación y mantenimiento
                  automotriz mediante la innovación tecnológica y la excelencia
                  en el servicio al cliente. Nos comprometemos a brindar
                  transparencia, eficiencia y comunicación efectiva en cada
                  interacción, garantizando la satisfacción total del cliente y
                  la máxima eficacia en nuestras operaciones de taller.
                </p>
              </div>
            </article>

            {/* Tarjeta de la Visión */}
            <article className="flex mt-4 items-center mb-16">
              <div className="w-3/4 ">
                <h3 className="text-3xl mb-4 ">Visión</h3>
                <p className="text-xl justify-center">
                  Ser líderes en la industria de reparación y mantenimiento
                  automotriz, definiendo nuevos estándares de transparencia y
                  servicio al cliente. Aspiramos a ser la elección preferida de
                  los propietarios de vehículos al brindar soluciones
                  tecnológicas avanzadas que simplifican el proceso de
                  reparación y fortalecen la relación de confianza entre el
                  cliente y el taller.
                </p>
              </div>
              <img
                className="ml-5 rounded-2xl w-1/4 hover:-rotate-12 transition-transform duration-300"
                src="https://images.pexels.com/photos/3769697/pexels-photo-3769697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Visión de RUNFix"
              />
            </article>

            {/* Tarjeta de los Objetivos */}
            <article className="flex mt-4 mb-16 ">
              <img
                className="mr-5 rounded-3xl  w-1/3 h-auto transform hover:rotate-180 transition-transform duration-300"
                src="https://images.unsplash.com/photo-1525011268546-bf3f9b007f6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Objetivos de RUNFix"
              />
              <div>
                <h3 className="text-3xl mb-4">Objetivos</h3>
                <ul className="text-lg  ">
                  <li>
                    <span className="font-semibold">
                      Transparencia Integral:
                    </span>
                    Implementar un sistema de seguimiento en tiempo real y
                    registros fotográficos que permitan a los clientes tener un
                    conocimiento completo del estado de su vehículo durante el
                    proceso de reparación o mantenimiento.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Eficiencia Operacional:
                    </span>
                    Desarrollar e implementar un software que optimice las
                    operaciones del taller, reduciendo el tiempo de inactividad
                    y maximizando la productividad.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Comunicación Efectiva:
                    </span>
                    Establecer canales de comunicación fluidos entre el equipo
                    de mecánicos y los clientes para evitar malos entendidos y
                    mejorar la satisfacción del cliente.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Expansión de Servicios:
                    </span>
                    Expandir nuestro alcance geográfico y diversificar nuestros
                    servicios para atender una gama más amplia de necesidades
                    automotrices.
                  </li>
                </ul>
              </div>
            </article>
          </section>

          {/*    Valores de la empresa */}
          <div className="mt-24">
            <h3 className="text-center font-semibold text-3xl mb-8">
              Valores de la empresa
            </h3>
            <article className="flex mt-4 bg-white rounded-lg shadow-lg p-5 mb-8  transform hover:translate-x-10 transition-transform duration-300">
              <div className="w-1/2">
                <h2 className="text-xl font-semibold mb-2">
                  Responsabilidad y Eficacia: Los Valores que Impulsan al Equipo
                  de RunFix
                </h2>
                <p>
                  En RunFix, entendemos que la reparación y el mantenimiento de
                  su vehículo son tareas que requieren una responsabilidad y
                  eficacia incomparables. Es por eso que nos enorgullece contar
                  con un equipo de profesionales altamente capacitados y
                  dedicados, que no solo son expertos en sus respectivos campos,
                  sino que también se comprometen con los valores de
                  transparencia, comunicación y servicio al cliente que definen
                  nuestra marca.
                </p>
              </div>
              <img
                className="ml-5 rounded-lg w-1/2"
                src="https://imgcom.masterd.es/49/blog/2023/02/42555.jpeg"
                alt="imagen del equipo"
              />
            </article>
            <article className="flex mt-4 bg-white rounded-lg shadow-lg p-5 ">
              <img
                className="mr-5 rounded-lg w-1/3"
                src="https://www.autoavance.co/wp-content/uploads/2021/10/taller-mecanico-productividad.jpeg"
                alt="imagen del taller"
              />
              <div className="w-2/3">
                <h2 className="text-xl font-semibold mb-2">
                  Redefiniendo la Experiencia de Reparación de Automóviles
                </h2>
                <p>
                  Desde nuestro inicio, la misión de RunFix ha sido cambiar
                  radicalmente cómo los propietarios de vehículos perciben y
                  experimentan el proceso de reparación y mantenimiento
                  automotriz. ¿Cómo lo hacemos? A través de un enfoque en tres
                  pilares fundamentales: transparencia, tecnología y talento.
                  Pero no nos detenemos ahí; también priorizamos la comunicación
                  continua y la educación del cliente, asegurando que cada
                  interacción con RunFix no sea simplemente una transacción,
                  sino una experiencia educativa y enriquecedora.
                </p>
              </div>
            </article>
          </div>
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

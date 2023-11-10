import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_REPAIR } from 'src/api/api';
import Footer from 'src/components/Footer';
import Navbar from 'src/components/Navbar';

export default function Repairs() {
  const [repairs, setRepairs] = useState([]);
  const params = useParams();

  // The params object will contain the `plate` and `documento` as defined in your route
  const { plate, documento } = params;

  console.log('placa', plate, 'cedula', documento);

  useEffect(() => {
    // Ensure that plate and documento are not undefined
    if (plate && documento) {
      async function fetchRepair() {
        try {
          const response = await axios.get(
            `${API_REPAIR}/${plate}?cc=${documento}`,
          );
          const reparaciones = response.data;
          // Normalize the response to always be an array
          setRepairs(
            Array.isArray(reparaciones) ? reparaciones : [reparaciones],
          );
        } catch (error) {
          console.error('Error fetching repairs:', error);
        }
      }

      fetchRepair();
    }
  }, [plate, documento]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow mb-16">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center m-4 sm:m-8 md:m-16">
          Reparaciones del Vehiculo
        </h1>
        <div className="flex-grow">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 m-4 md:m-8 lg:m-16">
            {repairs &&
              repairs.map((repair) => (
                <div key={repair.plate} className="vehicleStyle">
                  <img
                    src={repair.beforeImages[0]}
                    className="object-cover w-full h-40 sm:h-60 rounded-t-3xl"
                  />
                  <div className="p-2 sm:p-4">
                    <h2>
                      <strong>Fecha:</strong> {repair.date}
                    </h2>
                    <h2>
                      <strong>Servicio:</strong> {repair.reasonForService}
                    </h2>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

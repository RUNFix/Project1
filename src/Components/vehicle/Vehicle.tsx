import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';
import { Vehicle } from '../../types/Vehicle';
import VehicleRepair from './VehicleRepair';
import { API_REPAIR_EMPLOYEE, API_VEHICLE } from 'src/api/api';
import { useUserContext } from 'src/context/Context';

export default function Vehicles() {
  const [plates, setPlates] = useState<Vehicle[]>([]);
  const [selectedPlate, setSelectedPlate] = useState<string>('');
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const { cc } = useUserContext();

  const ccEmployee = cc;

  useEffect(() => {
    async function fetchRepair() {
      try {
        const response = await axios.get(
          `${API_REPAIR_EMPLOYEE}/${ccEmployee}`,
        );

        if (response && response.data) {
          const plates = response.data.map((vehicle) => vehicle.plate);
          setPlates(plates);
          console.log('Plates:', plates);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }

    fetchRepair();
  }, []);

  useEffect(() => {
    async function fetchVehicleDetails() {
      try {
        // Crea un array de promesas para las solicitudes de la API de cada placa
        const vehiclePromises = plates.map((plate) =>
          axios.get(`${API_VEHICLE}/${plate}`),
        );

        // Usa Promise.all para esperar que todas las promesas se resuelvan
        const vehicleResponses = await Promise.all(vehiclePromises);

        // Extrae los datos de cada respuesta y establécelos en el estado
        const vehicleData = vehicleResponses.map((response) => response.data);
        setVehicleDetails(vehicleData);
        console.log('data', typeof vehicleData);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    }

    if (plates.length > 0) {
      fetchVehicleDetails();
    }
  }, [plates]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow mb-16">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center m-4 sm:m-8 md:m-16">
          {selectedPlate ? 'Reparacion de vehiculo' : 'Vehiculos asignados '}
        </h1>
        <div className="flex-grow">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 m-4 md:m-8 lg:m-16">
            {selectedPlate ? (
              <VehicleRepair plate={selectedPlate} />
            ) : (
              vehicleDetails.map((vehicle) => (
                <button
                  key={vehicle.plate}
                  onClick={() => setSelectedPlate(vehicle.plate)}
                  className="vehicleStyle"
                >
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.color}
                    className="object-cover w-full h-40 sm:h-60 rounded-t-3xl"
                  />
                  <div className="p-2 sm:p-4">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      {vehicle.plate}
                    </h2>
                    <p>
                      <strong>Modelo:</strong> {vehicle.model}
                    </p>
                    <p>
                      <strong>Marca:</strong> {vehicle.brand}
                    </p>
                    <p>
                      <strong>Año:</strong> {vehicle.year}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

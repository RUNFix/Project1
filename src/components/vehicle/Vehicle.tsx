import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';
import { Vehicle } from '../../Interfaces/Vehicle';
import VehicleRepair from './VehicleRepair';
import { API_REPAIR_EMPLOYEE, API_VEHICLE } from 'src/api/api';
import { useUserContext } from 'src/context/Context';


export default function Vehicles() {
  const [plates, setPlates] = useState<Vehicle[]>([]);
  const [selectedPlate, setSelectedPlate] = useState<string>('');
  const [clientID, setClientID] = useState<string>('');
  const [repairs, setRepairs] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const { cc } = useUserContext();

  const ccEmployee = cc;
  console.log(window.location.origin);
  console.log(window.location.pathname);
  console.log(window.location.href)


  const handleSelectPlate = (plate) => {
    setSelectedPlate(plate);
    const repair = repairs.find((repair) => repair.plate === plate);
    if (repair) {
      setClientID(repair.cc.toString());
    }
  };

  useEffect(() => {
    async function fetchRepair() {
      try {
        const response = await axios.get(
          `${API_REPAIR_EMPLOYEE}/${ccEmployee}`,
        );
        if (response && response.data) {
          console.log(response);
          const fetchedRepairs = response.data;
          setRepairs(fetchedRepairs);
          const fetchedPlates = fetchedRepairs.map((repair) => repair.plate);
          setPlates(fetchedPlates);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }
    fetchRepair();
  }, [ccEmployee]);

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
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    }

    console.log(vehicleDetails);
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
              <VehicleRepair plate={selectedPlate} cc={clientID} />
            ) : (
              vehicleDetails.map((vehicle) => (
                <button
                  key={vehicle._id}
                  onClick={() => handleSelectPlate(vehicle.plate)}
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

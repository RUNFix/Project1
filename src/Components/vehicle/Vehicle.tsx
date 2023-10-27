import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';
import { Vehicle } from '../../types/Vehicle';
import VehicleCard from './VehicleCard';
import { API_VEHICLE_EMPLOYEE } from 'src/api/api';
import { useUserContext } from 'src/context/Context';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedPlate, setSelectedPlate] = useState<string>('');

  const { cc } = useUserContext();

  const ccEmployee = cc;

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await axios.get(
          `${API_VEHICLE_EMPLOYEE}/${ccEmployee}`,
        );
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }

    fetchVehicles();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow mb-16">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center m-4 sm:m-8 md:m-16">
          Reparacion de vehiculo
        </h1>

        <div className="flex-grow">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 m-4 md:m-8 lg:m-16">
            {selectedPlate ? (
              <VehicleCard plate={selectedPlate} />
            ) : (
              vehicles.map((vehicle) => (
                <button
                  key={vehicle.plate}
                  onClick={() => setSelectedPlate(vehicle.plate)}
                  className="vehicleStyle"
                >
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="object-cover w-full h-40 sm:h-60 rounded-t-3xl"
                  />
                  <div className="p-2 sm:p-4">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      {vehicle.name}
                    </h2>
                    <p>
                      <strong>Modelo:</strong> {vehicle.model}
                    </p>
                    <p>
                      <strong>Marca:</strong> {vehicle.brand}
                    </p>
                    <p>
                      <strong>Color:</strong> {vehicle.color}
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

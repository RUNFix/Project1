import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import axios from 'axios';
import { Vehicle } from '@/types/Vehicle';
import VehicleCard from '@/components/VehicleCard';
import ProgressBar from './ProgressBar';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedPlate, setSelectedPlate] = useState<string>('');

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await axios.get('http://localhost:4000/vehicle');
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
        <h1 className="text-3xl font-bold mb-4 text-center m-16">
          Vehículos Registrados
        </h1>
        <div className="flex-grow">
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-16 m-16">
            {selectedPlate ? (
              <VehicleCard plate={selectedPlate} />
            ) : (
              vehicles.map((vehicle) => (
                <button
                  key={vehicle.plate}
                  onClick={() => setSelectedPlate(vehicle.plate)}
                  className="border-4 border-slate-800 rounded-3xl shadow hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 h-96"
                >
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="object-cover w-full h-60 rounded-t-3xl"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
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
          {/*    <div className=" mx-48 justify-center">
            {selectedPlate ? <ProgressBar /> : ''}
          </div> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}

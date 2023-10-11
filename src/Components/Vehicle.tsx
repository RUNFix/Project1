import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import axios from 'axios';
import { Vehicle } from '@/types/Vehicle';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

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
    <>
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 text-center m-16">
        Vehículos Registrados
      </h1>
      <div className="flex-grow">
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 m-16">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="border rounded shadow hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={vehicle.images[0]}
                alt={vehicle.name}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{vehicle.name}</h2>
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
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

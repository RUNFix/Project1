import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Vehicle } from '@/types/Vehicle';
import ProgressBar from '@/components/ProgressBar';

type Props = {
  plate: string;
};

const VehicleCard: React.FC<Props> = ({ plate }) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    async function fetchVehicleDetails() {
      try {
        const response = await axios.get(
          `http://localhost:4000/vehicle/${plate}`,
        );
        setVehicle(response.data);
      } catch (err) {
        setError('Error fetching vehicle details.');
        console.error('Error fetching vehicle details:', err);
      }
    }

    fetchVehicleDetails();
  }, [plate]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!vehicle) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {vehicle.images.map((image, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <img
            src={image}
            alt={`Vehicle Image ${index}`}
            className="object-cover w-full h-60 mb-4"
          />
          <p className="text-center">Descripción de la Imagen lorem</p>
        </div>
      ))}
    </>
  );
};
export default VehicleCard;

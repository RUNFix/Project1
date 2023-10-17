import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Vehicle } from '../types/Vehicle';
import ProgressBar from '../components/ProgressBar';
import ImageDropzone from './ImageDropzone';

type Props = {
  plate: string;
};

const VehicleCard: React.FC<Props> = ({ plate }) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);

  const handleImageDrop = (index: number) => (file: File) => {
    setImages(images.map((img, i) => (i === index ? file : img)));
  };

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
          <p className="text-center">Descripción de la Imagen</p>
        </div>
      ))}

      <div className=" justify-center items-center col-span-3 my-16">
        <ProgressBar />
      </div>

      <h2 className="col-span-3 text-2xl font-bold  text-center">
        Fotos de las reparaciones
      </h2>
      {images.map((imageFile, index) => (
        <div key={index} className="mb-8 border-4 flex-shrink-0">
          <ImageDropzone onImageDrop={handleImageDrop(index)} index={index} />
          {imageFile && (
            <div>
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Dropped Image"
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300 relative p-4 text-center"
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};
export default VehicleCard;

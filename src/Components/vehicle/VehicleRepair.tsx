import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from '../ProgressBar';
import ImageDropzone from '../ImageDropzone';
import { API_REPAIR, API_REPAIR_UPDATE } from 'src/api/api';
import { Repair } from 'src/types/Repair';
import { useUserContext } from 'src/context/Context';

type Props = {
  plate: string;
  cc: string;
};

const VehicleRepair: React.FC<Props> = ({ plate, cc }) => {
  const { status, setStatus } = useUserContext();
  const [repair, setRepair] = useState<Repair>();
  const [error, setError] = useState<string | null>(null);
  const [afterImages, setAfterImages] = useState<(File | null)[]>([null, null, null]);
  const [originalAfterImages, setOriginalAfterImages] = useState<(string | null)[]>([null, null, null]);

  console.log('Placa:', plate);
  console.log('Cédula:', cc);
  console.log('Estado:', status);

  const handleImageDrop = (index: number) => (file: File) => {
    setAfterImages(currentAfterImages => {
      // Crear un nuevo array para asegurar que el estado cambie y cause un rerender
      const newAfterImages = [...currentAfterImages];
      // Actualizar la imagen en el índice correcto
      newAfterImages[index] = file;
      // Devolver el nuevo array para actualizar el estado
      return newAfterImages;
    });
  };
  
  

  useEffect(() => {
    async function fetchRepair() {
      try {
        const response = await axios.get(`${API_REPAIR}/${plate}?cc=${cc}`);

        if (response && response.data) {
          setRepair(response.data);
          setStatus(response.data.status);
          setOriginalAfterImages(response.data.afterImages);
          setAfterImages(response.data.afterImages.map((img) => img || null));
        

        
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }

    fetchRepair();
  }, [cc, plate, setStatus]);

  useEffect(() => {
    if (status !== undefined) {
      updateRepairDetails();
    }
  }, [status]);

  console.log('Datos backend', repair);

  async function updateRepairDetails() {
    const formData = new FormData();
    formData.append('status',  status.toString() /*  '2'*/ );

    afterImages.forEach((image, index) => {
      if (image instanceof File) {
        formData.append('afterImages', image, `afterImages${index}.jpg`);
      }
    });
  
    // Envía las URLs de las imágenes existentes para indicar al backend que deben mantenerse
    originalAfterImages.forEach((image, index) => {
      if (image && !(afterImages[index] instanceof File)) {
        formData.append(`originalAfterImages[${index}]`, image);
      }
    });

    try {
      const response = await axios.patch(
        `${API_REPAIR_UPDATE}/${plate}/${cc}`,
        formData,
      );
      setRepair(response.data);
    } catch (err) {
      console.error('Mi error', err);
      setError('Error updating vehicle images.');
    }
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {repair &&
        repair.beforeImages.map((image, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <img
              src={image}
              alt={`Vehicle Image ${index}`}
              className="object-cover w-full h-60 mb-4"
            />
            <p className="text-center">{repair?.beforeDescriptions}</p>
          </div>
        ))}
      <div className=" justify-center items-center col-span-3">
        <ProgressBar />
      </div>
      <h2 className="col-span-3 text-2xl font-bold  text-center">
        Fotos de las reparaciones
      </h2>
      {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="mb-8 border-4 overflow-hidden">
        <ImageDropzone onImageDrop={handleImageDrop(index)} index={index} />
        <p className="text-center">{repair?.afterDescriptions && repair.afterDescriptions[index]}</p>
      </div>
    ))}


    </>
  );
};

export default VehicleRepair;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from '../ProgressBar';
import ImageDropzone from '../ImageDropzone';
import { API_REPAIR, API_REPAIR_EMPLOYEE } from 'src/api/api';
import { useUserContext } from 'src/context/Context';
import { Repair } from 'src/types/Repair';

type Props = {
  plate: string;
  cc: string;
};

const VehicleRepair: React.FC<Props> = ({ plate, cc }) => {
  const [repair, setRepair] = useState<Repair>();
  const [error, setError] = useState<string | null>(null);
  const [afterImages, setAfterImages] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);

  const { status } = useUserContext();

  console.log('Estado actual:', status);
  console.log('Placa:', plate);
  console.log('Cédula:', cc);

  const handleImageDrop = (index: number) => (file: File) => {
    setAfterImages(afterImages.map((img, i) => (i === index ? file : img)));
  };

  useEffect(() => {
    async function fetchRepair() {
      try {
        const response = await axios.get(`${API_REPAIR}/${plate}?cc=${cc}`);

        if (response && response.data) {
          setRepair(response.data);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }

    fetchRepair();
  }, [cc, plate]);

  useEffect(() => {
    // Verifica si el paso es 4 para actualizar los detalles del vehículo
    if (status === 4) {
      updateRepairDetails();
    }
  }, [status]);

  console.log('Datos backend', repair);
  async function updateRepairDetails() {
    const formData = new FormData();
    formData.append('plate', repair.plate);
    formData.append('cc', repair.cc.toString());
    formData.append('status', repair.status.toString());
    formData.append('priceToPay', repair.priceToPay.toString());
    formData.append('reasonForService', repair.reasonForService);
    formData.append('date', repair.date.toString());
    formData.append('employee', repair.employee.toString());

    await Promise.all(
      repair.beforeImages.map(async (imageFile, index) => {
        if (imageFile) {
          const response = await fetch(imageFile);
          const blob = await response.blob();
          formData.append('beforeImages', blob, `image${index}.jpg`);
        }
      }),
    );

    afterImages.forEach((imageFile, index) => {
      if (imageFile) {
        formData.append('afterImages', imageFile, `afterImages${index}.jpg`);
      }
    });

    try {
      const response = await axios.put(`${API_REPAIR}/${plate}`, formData);

      console.log('Se actualiza el estado del vehículo con la respuesta');
      setRepair(response.data);
      console.log(repair);
    } catch (err) {
      setError('Error updating vehicle images.');
      console.error('Error updating vehicle images:', err);
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
            <p className="text-center">Descripción de la Imagen</p>
          </div>
        ))}
      <div className=" justify-center items-center col-span-3">
        <ProgressBar />
      </div>
      <h2 className="col-span-3 text-2xl font-bold  text-center">
        Fotos de las reparaciones
      </h2>
      {afterImages.map((imageFile, index) => (
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
export default VehicleRepair;

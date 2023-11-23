import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from '../ProgressBar';
import ImageDropzone from '../ImageDropzone';
import { API_REPAIR, API_REPAIR_UPDATE } from 'src/api/api';
import { Repair } from 'src/Interfaces/Repair';
import { useUserContext } from 'src/context/Context';
import { NotificationModal } from '../../utils/Modal';

type Props = {
  plate: string;
  cc: string;
};

const VehicleRepair: React.FC<Props> = ({ plate, cc }) => {
  const [showNotiModal, setShowNotiModal] = useState(false);
  const { status, setStatus } = useUserContext();
  const [repair, setRepair] = useState<Repair>();
  const [error, setError] = useState<string | null>(null);
  const [afterImages, setAfterImages] = useState<(File | string | null)[]>([null, null, null]);
  const [originalAfterImages, setOriginalAfterImages] = useState<string[]>([]);

  console.log('Placa:', plate);
  console.log('Cédula:', cc);
  console.log('Estado:', status);

  const handleImageDrop = (index: number) => (file: File) => {
    setAfterImages(currentAfterImages => {
      const newAfterImages = [...currentAfterImages];
      // Replace the image at the specific index
      newAfterImages[index] = file;

      // If any null entries exist before the current index, replace them with the original images
      for (let i = 0; i < index; i++) {
        if (newAfterImages[i] === null && originalAfterImages[i]) {
          newAfterImages[i] = originalAfterImages[i];
        }
      }

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
          setOriginalAfterImages(response.data.afterImages || []);
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

  const handleNotiButton = () => {
    setShowNotiModal(true);
  };

  const handleOnSubmit = () => {
    console.log("Se envía")
  };

  const handleCancel = () => {
    setShowNotiModal(false);
  };

  console.log('Datos backend', repair);

  async function updateRepairDetails() {
    const formData = new FormData();
    formData.append('status', status.toString());
  
    afterImages.forEach((image, index) => {
      if (image instanceof File) {
        // Append File objects as files
        formData.append('afterImages', image, `afterImage${index}.jpg`);
      } else if (typeof image === 'string') {
        // Append strings as text fields, not as files
        formData.append(`originalAfterImages[${index}]`, image);
      }
    
    });
  
    try {
      const response = await axios.patch(`${API_REPAIR_UPDATE}/${plate}/${cc}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setRepair(response.data);
    } catch (err) {
      console.error('Error updating vehicle:', err);
      setError('Error updating vehicle images.');
    }
  }
  

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {showNotiModal && <NotificationModal onConfirm={handleOnSubmit} onCancel={handleCancel} />}
      {repair && repair.beforeImages.map((image, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <img
            src={image}
            alt={`Vehicle Image ${index}`}
            className="object-cover w-full h-60 mb-4"
          />
          <p className="text-center">{repair?.beforeDescriptions}</p>
        </div>
      ))}
      <div className="justify-center items-center col-span-3">
        <ProgressBar />
      </div>
      <button
        className="bg-green-600 text-white rounded-md max-w-xs"
        onClick={handleNotiButton}
      >
        Notificar Cliente
      </button>
      <h2 className="col-span-3 text-2xl font-bold text-center">
        Fotos de las reparaciones
      </h2>
      {Array.from({ length: 3 }).map((_, index) => (
      <div key={`afterImage-${index}`} className="mb-8 border-4 overflow-hidden">
        <ImageDropzone onImageDrop={handleImageDrop(index)} index={index} />
        <p className="text-center">
          {repair?.afterDescriptions && repair.afterDescriptions[index]}
        </p>
      </div>
    ))}
    </>
  );
};

export default VehicleRepair;

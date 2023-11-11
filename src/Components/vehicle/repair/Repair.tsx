import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_REPAIR_ID } from 'src/api/api';
import { Repair } from 'src/types/Repair';
import ProgressBar from 'src/components/ProgressBar';
type Props = {
  id: string;
};

const Repair: React.FC<Props> = ({ id }) => {
  const [repair, setrepair] = useState<Repair | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    async function fetchrepairDetails() {
      try {
        const response = await axios.get(`${API_REPAIR_ID}/${id}`);
        setrepair(response.data);
        setStatus(response.data.status);
      } catch (err) {
        setError('Error fetching repairdetails.');
        console.error('Error fetching repairdetails:', err);
      }
    }

    fetchrepairDetails();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!repair) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2 className="col-span-3 text-2xl font-bold  text-center">
        Fotos de los daños
      </h2>
      {repair.beforeImages.map((image, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <img
            src={image}
            alt={`repairImage ${index}`}
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
      {repair.afterImages.map((image, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <img
            src={image}
            alt={`repairImage ${index}`}
            className="object-cover w-full h-60 mb-4"
          />
          <p className="text-center">Descripción de la Imagen</p>
        </div>
      ))}
    </>
  );
};
export default Repair;

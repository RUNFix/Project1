import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from '../ProgressBar';
import { API_BILL, API_REPAIR, API_REPAIR_UPDATE } from 'src/api/api';
import { Repair } from 'src/Interfaces/Repair';
import { useUserContext } from 'src/context/Context';
import { ModalRepair } from 'src/utils/ModalRepair';
import { useNavigate } from 'react-router-dom';

type Props = {
  plate: string;
  cc: string;
};

const VehicleRepair: React.FC<Props> = ({ plate, cc }) => {
  const { status, setStatus, totalPrice, items } = useUserContext();
  const [repair, setRepair] = useState<Repair>();
  const [error, setError] = useState<string | null>(null);
  const [showRepairModal, setShowRepairModal] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<number | null>(null);
  const navigate = useNavigate();

  console.log('total en vehiculo', totalPrice);
  console.log('repuestos', items);

  useEffect(() => {
    async function fetchRepair() {
      try {
        const response = await axios.get(`${API_REPAIR}/${plate}?cc=${cc}`);
        if (response && response.data) {
          setRepair(response.data);
          setStatus(response.data.status);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }

    fetchRepair();
  }, [cc, plate, setStatus]);

  useEffect(() => {
    // Define la función asincrónica dentro del useEffect
    const updateRepair = async () => {
      const formData = new FormData();
      formData.append('status', status.toString());

      try {
        const response = await axios.patch(
          `${API_REPAIR_UPDATE}/${plate}/${cc}`,
          formData,
        );
        console.log('Response:', response.data);
      } catch (err) {
        console.error('Error updating repair:', err);
        setError('Error updating repair.');
      }
    };

    updateRepair();
  }, [status]);

useEffect(() => {
  if (status === 4) {
    const timer = setTimeout(async () => {
      // Crear el objeto de datos como JSON
      const billData = {
        state: 'Pendiente',
        plate,
        cc: cc.toString(),
        total: totalPrice.toString(),
        items: items.map((item) => ({
          quantity: item.quantity,
          itemDescription: item.name,
          price: item.sparePrice.toString(),
          subtotal: item.totalPriceSpare.toString(),
        })),
      };

      try {
        const response = await axios.post(`${API_BILL}`, billData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
           console.log('responose', response)
           const billId = response.data._id;
           console.log('bills', billId)
           navigate(`/invoice-generate/${billId}`);
      } catch (err) {
        console.error('Error post bill:', err);
        setError('Error POST BILL.');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [status, plate, cc, totalPrice, items, navigate]);


  const handleCardClick = (cardId: number) => {
    setCurrentCardId(cardId);
    setShowRepairModal(true);
  };

  const handleitemsClick = () => {
    navigate('/spare-parts');
  };
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {/*  {status === 4 && <InvoiceGenerate />} */}
      {repair &&
        repair.beforeImages.map((image, index) => (
          <div key={index} className="border rounded-3xl shadow">
            <img
              src={image}
              alt={`Vehicle Image ${index}`}
              className="object-cover w-full h-72 rounded-3xl "
            />
            <p className="text-center">{repair?.beforeDescriptions}</p>
          </div>
        ))}
      <div className="justify-center items-center col-span-3">
        <ProgressBar />
      </div>

      <div
        key="1"
        className=" brounded-lg  overflow-hiddentransform hover:scale-105 
    transition-transform duration-300"
        onClick={handleitemsClick}
      >
        <div className="w-full h-48 sm:h-64 md:h-80 flex justify-center items-center">
          <img
            src="src/assets/tuerca.png"
            alt="partes"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mt-4">
          Respuesto del cliente
        </h2>
      </div>
      <div
        key="2"
        onClick={() => handleCardClick(2)}
        className="rounded-lg overflow-hidden transform hover:scale-105 
transition-transform duration-300"
      >
        <div className="w-full h-48 sm:h-64 md:h-80 flex justify-center items-center">
          <img
            src="src/assets/camera.png"
            alt="partes"
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-center  mt-4">
          Tomar Fotos de las reparaciones
        </h2>
      </div>
      <div
        key="3"
        onClick={() => handleCardClick(3)}
        className="rounded-lg overflow-hidden transform hover:scale-105 
transition-transform duration-300"
      >
        <div className="w-full h-96 sm:h-64 md:h-80 flex justify-center items-center">
          <img
            src="src/assets/telegram.png"
            alt="Notificacion"
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-center">Notificar al cliente</h2>
      </div>
      {showRepairModal && (
        <ModalRepair
          cardId={currentCardId}
          onCancel={() => setShowRepairModal(false)}
          cc={cc}
          plate={plate}
        />
      )}
    </>
  );
};

export default VehicleRepair;

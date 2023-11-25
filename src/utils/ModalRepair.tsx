import axios from 'axios';
import { useState } from 'react';

import { API_REPAIR_UPDATE } from 'src/api/api';
import ImageDropzone from 'src/components/ImageDropzone';
import { useUserContext } from 'src/context/Context';


type ModalRepairProps = {
  cardId: number | null;
  onCancel: () => void;
  cc?: string;
  plate?: string;
};

export function ModalRepair({ cardId, onCancel, cc, plate }: ModalRepairProps) {
  const [image, setImage] = useState<File | null>(null);
  const { status} = useUserContext();
  const [error, setError] = useState<string | null>(null);

  const handleImageDrop = (file: File) => {
    setImage(file);
  };

  console.log('estado' ,status)

  const updateRepair = async () => {
    if (!plate || !cc) {
      console.error('Plate or CC is missing');
      return;
    }
    const formData = new FormData();
    formData.append('status', status.toString() );

   if (!image) {
     console.log('No image selected');
     return;
   }

   formData.append('afterImages', image, image.name);
    try {
      // Asegúrate de reemplazar 'plate' y 'cc' con valores reales o pasarlos como props
      const response = await axios.patch(
        `${API_REPAIR_UPDATE}/${plate}/${cc}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Response:', response.data);
      // Aquí puedes manejar la respuesta, como actualizar el estado del vehículo
    } catch (err) {
      console.error('Error updating repair:', err);
      setError('Error updating repair.');
    }
  };

  
  const postAlert = async function postAlert() {};

const handleFetchData = async () => {
  if (cardId === null) return;

  try {
    if (cardId === 2) {
      await updateRepair();
    } else if (cardId === 3) {
      await postAlert();
    } else {
      // Manejar otros casos o error
      throw new Error('Card ID no válido');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Manejar el error en el UI si es necesario
  }
};


  // Puedes llamar a handleFetchData cuando se confirme la acción en el modal:
  const handleConfirm = () => {
    handleFetchData();
    // Probablemente quieras cerrar el modal después de la confirmación
    onCancel();
  };

  return (
    <>
      <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative mx-auto my-4  max-h-full md:max-w-md lg:max-w-lg w-full">
          {/* Ajuste en max-w-md y my-4 para reducir tamaño y margen */}
          <div className="flex flex-col w-full bg-white rounded-xl shadow-2xl outline-none focus:outline-none border-0">
            <div className="p-4 text-center border-b border-solid border-blueGray-200 rounded-t-xl">
              {/* Ajuste en p-4 para reducir padding */}
              <h2 className="text-2xl font-bold mb-3">Notificación Cliente</h2>

              <div className="mb-3 overflow-hidden">
                <ImageDropzone onImageDrop={handleImageDrop} />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600"
                >
                  Descripción
                </label>
                <textarea
                  id="description"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                ></textarea>
              </div>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={handleConfirm}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Enviar
                </button>
                <button
                  onClick={onCancel}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

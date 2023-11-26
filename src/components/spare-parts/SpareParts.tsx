import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';

export default function SpareParts() {
  const [parts, setParts] = useState([]);
    const [selectedPart, setSelectedPart] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchSpare() {
      try {
        const response = await axios.get(`${'http://localhost:4000/part'}`);

        if (response && response.data) {
          console.log(response.data);
          setParts(response.data);
        }
      } catch (error) {
        console.error('Error fetching parts:', error);
      }
    }
    fetchSpare();
  }, []);


   function handleSelectPart(part) {
     setSelectedPart(part);
     setQuantity(1); 
     setShowModal(true); 
   }

   function handleQuantityChange(newQuantity) {
     setQuantity(newQuantity);
   }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow mb-32">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center m-4 sm:m-8 md:m-16">
          Repuestos disponibles
        </h1>
        <div className="flex-grow mx-40">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-items-center items-center">
            {parts.map((part) => (
              <div
                key={part._id}
                className="bg-white shadow hover:shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-95 rounded-xl
                w-80 sm:w-96 h-96 flex flex-col justify-between mb-12"
              >
                <button
                  onClick={() => handleSelectPart(part)}
                  className="flex flex-col items-center justify-center text-center"
                >
                  {/* Envuelve la imagen en un contenedor para controlar el tamaño */}
                  <div className="w-full h-30 sm:h-60 flex items-center justify-center p-4">
                    <img
                      src={part.image}
                      alt={part.name}
                      className="object-contain h-30 sm:h-60 w-full"
                    />
                  </div>
                  <div className="p-4 w-full">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      {part.name}
                    </h2>
                    <p>
                      <strong>Marca:</strong> {part.brand}
                    </p>
                    <p>
                      <strong>Precio:</strong> {part.price} USD
                    </p>
                    <p>
                      <strong>Inventario:</strong> {part.stock}
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      {showModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
          id="my-modal"
        >
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center ">
              <img
                src={selectedPart.image}
                alt={selectedPart.name}
                className="mx-auto mb-8"
              />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {selectedPart.name}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-lg text-gray-500 ">
                  <strong>Precio:</strong> ${selectedPart.price} USD
                </p>
                <p className="text-lg text-gray-500">
                  <strong>Cantidad:</strong>
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    ➖
                  </button>
                  {` ${quantity} `}
                  <button onClick={() => handleQuantityChange(quantity + 1)}>
                    ➕
                  </button>
                </p>
                <p className="text-lg text-gray-500">
                  <strong>Total:</strong> ${selectedPart.price * quantity} USD
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Agregar
                </button>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

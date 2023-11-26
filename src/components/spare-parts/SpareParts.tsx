import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';


export default function SpareParts() {
  
  const [parts, setParts] = useState([]);



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

  
  function handleSelectPlate(id: string): void {
      console.log(id);
  }

  
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow mb-16">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center m-4 sm:m-8 md:m-16">
          Repuestos disponibles
        </h1>
        <div className="flex-grow mx-24">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12">
            {parts.map((part) => (
              <div
                key={part._id}
                className="bg-white shadow hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-95 rounded-xl flex flex-col items-center"
              >
                <button
                  onClick={() => handleSelectPlate(part._id)}
                  className="flex flex-col items-center justify-center w-full text-center"
                >
                  {/* Envuelve la imagen en un contenedor para controlar el tamaño */}
                  <div className="w-full h-30 sm:h-60 flex items-center justify-center p-4">
                    <img
                      src={part.image}
                      alt={part.name}
                      className="object-contain h-full max-w-xs" // Limita el ancho máximo para mantener la imagen dentro de un rango de tamaño
                    />
                  </div>
                  <div className="p-4 w-full">
                    {' '}
                    {/* Asegura que el padding aplique para todo el ancho */}
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
    </div>
  );
}

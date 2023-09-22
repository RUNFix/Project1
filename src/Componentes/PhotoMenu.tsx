import React, { useState } from 'react';
import axios from 'axios';

type Props = {
  onImageDrop: (file: File) => void;
};

function ImageDropzone({ onImageDrop }: Props) {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    onImageDrop(file);
  };

  return (
    <div
      className={`dropzone ${dragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>Drag and drop an image here</p>
    </div>
  );
}

interface Part {
  name: string;
  description: string;
}
interface Vehicle {
  id: number;
  name: string;
  cc: number;
  model: string;
  brand: string;
  year: number;
  color: string;
  status: string;
  priceToPay: number;
  employee: string;
  parts: Part[];
  date: Date;
  images: string;
}

export default function PhotoMenu() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageDrop = (file: File) => {
    setImageFile(file);
  };

  const vehicle = {
    name: 'Benz',
    cc: 666,
    model: 'Aaa',
    brand: 'lambo',
    year: 1999,
    color: 'red',
    status: 'amazing',
    priceToPay: 1,
    employee: 'javier',
    parts: [
      { name: 'carro', description: 'Some description' },
      { name: 'fino', description: 'Some other description' },
    ],
    date: new Date(),
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('name', vehicle.name);
      formData.append('cc', vehicle.cc.toString());
      formData.append('model', vehicle.model);
      formData.append('brand', vehicle.brand);
      formData.append('year', vehicle.year.toString());
      formData.append('color', vehicle.color);
      formData.append('status', vehicle.status);
      formData.append('priceToPay', vehicle.priceToPay.toString());
      formData.append('employee', vehicle.employee);
      formData.append('parts', JSON.stringify(vehicle.parts)); // stringify parts array
      formData.append('date', vehicle.date.toString());

      if (imageFile) {
        const file = new File([imageFile], 'filename.jpg', {
          type: 'image/jpeg',
        });
        formData.append('image', file);
      }

      const response = await axios.post(
        'http://localhost:4000/vehicle',
        formData,
      );

      console.log('Funciona', response);
      if (response.status === 200) {
        alert('Vehicle added');
        setImageFile(null);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Image Dropzone Example</h1>
      <div className="w-full max-w-md">
        <ImageDropzone onImageDrop={handleImageDrop} />
        {imageFile && (
          <div className="mt-8">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Dropped Image"
              className="w-full"
            />
          </div>
        )}
        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Upload Vehicle
        </button>
      </div>
    </div>
  );
}

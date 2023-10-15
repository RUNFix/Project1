import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VehicleForm from '@/components/VehicleForm';
import { Vehicle } from '@/types/Vehicle';
import ImageDropzone from '@/components/ImageDropzone';

export default function PhotoMenu() {
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);

  const handleImageDrop = (index: number) => (file: File) => {
    setImages(images.map((img, i) => (i === index ? file : img)));
  };

  const handleUpload = async (values: Vehicle) => {
    try {
      const formData = new FormData();
      formData.append('plate', values.plate);
      formData.append('name', values.name);
      formData.append('cc', values.cc.toString());
      formData.append('model', values.model);
      formData.append('brand', values.brand);
      formData.append('year', values.year.toString());
      formData.append('color', values.color);
      formData.append('status', values.status);
      formData.append('employee', values.employee);
      formData.append('date', values.date.toString());

      images.forEach((imageFile, index) => {
        if (imageFile) {
          const file = new File([imageFile], `filename${index + 1}.jpg`, {
            type: 'image/jpeg',
          });
          formData.append('images', file);
        }
      });

      const response = await axios.post(
        'http://localhost:4000/vehicle',
        formData,
      );

      console.log('Funciona', response);
      if (response.status === 200) {
        alert('Vehicle added');
        setImages([null, null, null]);
      }
    } catch (error) {
      console.log('No funciona', error);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 text-center m-16">
        Registrar Vehiculo
      </h1>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2 min-h-screen m-16">
        <div className="col-span-1">
          <div className="max-w-sm mx-auto overflow-hidden my-10 text-center ">
            {images.map((imageFile, index) => (
              <div key={index} className="mb-8  border-4">
                <ImageDropzone
                  onImageDrop={handleImageDrop(index)}
                  index={index}
                />
                {imageFile && (
                  <div>
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Dropped Image"
                      className="object-cover w-full h-full ransform hover:scale-105 
                        transition-transform duration-300  relative p-4 text-center"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 mb-8">
          <VehicleForm onSubmit={handleUpload} />
        </div>
      </div>
      <Footer />
    </>
  );
}

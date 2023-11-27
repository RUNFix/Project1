import { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ImageDropzone from '../ImageDropzone';
import { errorToast, notValidToast, succesToast } from '../../utils/Toast';
import { Toaster } from 'react-hot-toast';
import { isPlateValid } from '../../utils/ValueChecks';
import { API_REPAIR } from '../../api/api';
import { Repair } from '../../Interfaces/Repair';
import RepairForm from './RepairForm';
import { useNavigate } from 'react-router-dom';

export default function RepairRegister() {
  const [beforeImages, setBeforeImages] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);
  const navigate = useNavigate();

  const handleImageDrop = (index: number) => (file: File) => {
    setBeforeImages(beforeImages.map((img, i) => (i === index ? file : img)));
  };

  const handleUpload = async (values: Repair) => {
    let isValid = true;
    if (!isPlateValid(values.plate)) {
      notValidToast('Placa');
      isValid = false;
    }

    if (isValid) {
      try {
        const formData = new FormData();
        formData.append('plate', values.plate);
        formData.append('cc', values.cc.toString());
        formData.append('status', values.status.toString());
        formData.append('reasonForService', values.reasonForService);
        formData.append('date', values.date.toString());
        formData.append('employee', values.employee.toString());

        beforeImages.forEach((imageFile, index) => {
          if (imageFile) {
            const file = new File([imageFile], `filename${index + 1}.jpg`, {
              type: 'image/jpeg',
            });
            formData.append('beforeImages', file);
          }
        });
    
        const response = await axios.post(`${API_REPAIR}`, formData);

       
        if (response.status === 200) {
          succesToast('Historia de vehiculo creada exitosamente!');
          setBeforeImages([null, null, null]);
           setTimeout(() => {
             navigate('/home');
           }, 3000);
        }
      } catch (error: any) {
        switch (error.response?.data?.message) {
          case 'INVALID_PARTS_FORMAT':
            errorToast('Datos de creación invalidos');
            break;
          case 'ALREADY_VEHICLE':
            errorToast('Esta placa ya se encuentra registrada');
            break;
          case 'EMPLOYEE_NOT_FOUND':
            errorToast('El empleado asignado no se encuentra registrado');
            break;
          case 'CLIENT_NOT_FOUND':
            errorToast('Cliente no registrado en el sistema');
            break;
        }
      }
    }
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 text-center m-16">
        Registrar Reparación
      </h1>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2 min-h-screen m-16">
        <div className="col-span-1">
          <div className="max-w-sm mx-auto overflow-hidden my-10 text-center">
            {beforeImages.map((imageFile, index) => (
              <div key={index} className="mb-8">
                <ImageDropzone
                  onImageDrop={handleImageDrop(index)}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 mb-8">
          <RepairForm onSubmitRepair={handleUpload} />
        </div>
      </div>
      <Footer />
    </>
  );
}

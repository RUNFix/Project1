import { Toaster } from 'react-hot-toast';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Field, Form, Formik } from 'formik';
import { Client, initialValuesClient } from 'src/types/Client';
import { errorToast, notValidToast, succesToast } from 'src/utils/Toast';
import { isCcValid } from 'src/utils/ValueChecks';
import { API_CLIENT } from 'src/api/api';
import axios from 'axios';

export default function RepairRegister() {

  const handleUpload = async (values: Client) => {
    let isValid = true;
    if (!isCcValid(values.cc.toString())) {
      notValidToast('Docuemnto de identidad');
      isValid = false;
    }

    if (isValid) {
      try {
     /*    const formData = new FormData();
        formData.append('name', values.name);
        formData.append('lastname', values.lastname);
        formData.append('cc', values.cc.toString());
        formData.append('email', values.email);
        formData.append('phoneNumber', values.phoneNumber.toString());
        formData.append('ccExpiration', values.ccExpirationDate);

        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
      }); */

      const response = await axios.post(`${API_CLIENT}`, values, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
      
        console.log('Funciona', response);
        if (response.status === 200) {
          succesToast('Historia de vehiculo creada exitosamente!');

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
        Regsitro Cliente
      </h1>
      <ClientForm onSubmit={handleUpload} />
      <Footer />
    </>
  );
}

interface Props {
  onSubmit: (values: Client) => void;
}

const ClientForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValuesClient}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ values }) => (
        <Form className="formStyles">
          <div className="mb-4">
            <label className="block  text-sm font-medium  mb-3" htmlFor="name">
              Nombre
            </label>
            <Field className="fieldStyles" type="text" name="name" required />
          </div>
          <div className="mb-4">
            <label
              className="block  text-sm font-medium mb-3"
              htmlFor="lastname"
            >
              Apellido
            </label>
            <Field
              className="fieldStyles"
              type="text"
              name="lastname"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block   text-sm font-medium mb-3" htmlFor="cc">
              Documento de identidad
            </label>
            <Field
              className="fieldStyles"
              type="number"
              name="cc"
              min={0}
              max={9999999999}
              value={values.cc === 0 ? '' : values.cc}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-3" htmlFor="email">
              email
            </label>
            <Field className="fieldStyles" type="email" name="email" required />
          </div>
          <div className="mb-4">
            <label className="block   text-sm font-medium mb-3" htmlFor="phoneNumber">
              Numero de telefono
            </label>
            <Field
              className="fieldStyles"
              type="number"
              name="phoneNumber"
              min={0}
              max={9999999999}
              value={values.phoneNumber === 0 ? '' : values.phoneNumber}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-3"
              htmlFor="ccExpirationDate"
            >
              Fecha de Expiración (dd/mm/aaaa)
            </label>
            <Field
              className="fieldStyles"
              type="text"
              name="ccExpirationDate"
              placeholder="DD/MM/AAAA"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};



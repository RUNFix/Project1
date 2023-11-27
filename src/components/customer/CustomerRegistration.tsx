import { Toaster } from 'react-hot-toast';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Field, Form, Formik } from 'formik';
import { Client, initialValuesClient } from 'src/Interfaces/Client';
import { errorToast, notValidToast, succesToast } from 'src/utils/Toast';
import { isCcValid } from 'src/utils/ValueChecks';
import { API_CLIENT } from 'src/api/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RepairRegister() {
  const navigate = useNavigate();
  const handleUpload = async (values: Client) => {
    let isValid = true;
    if (!isCcValid(values.cc.toString())) {
      notValidToast('Docuemnto de identidad');
      isValid = false;
    }

    if (isValid) {
      try {
 
      const response = await axios.post(`${API_CLIENT}`, values, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
      
        console.log('Funciona', response);
        if (response.status === 200) {
          succesToast('Historia de vehiculo creada exitosamente!');
             setTimeout(() => {
               navigate('/submenu');
             }, 3000);

        }
      } catch (error: any) {
        console.log(error.response.data.error);
        switch (error.response.data.error) {
          case 'INVALID_PARTS_FORMAT':
            errorToast('Datos de creación invalidos');
            break;
          case 'ALREADY_CLIENT':
            errorToast('Cliente ya registrado en el sistema');
            break;
          case 'EMPLOYEE_NOT_FOUND':
            errorToast('El empleado asignado no se encuentra registrado');
            break;
          case 'CLIENT_NOT_FOUND':
            errorToast('Cliente no registrado en el sistema');
            break;
          case 'ERROR_POST_CLIENT':
            errorToast('Datos invalidos para el registro');
            break;
        }
      }
    }
  };
  return (
    <>
      <Toaster />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-4 text-center m-16">
            Registro Cliente
          </h1>
        </div>
        <ClientForm onSubmit={handleUpload} />
        <Footer />
      </div>
    </>
  );
}

interface Props {
  onSubmit: (values: Client) => void;
}

const ClientForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
    classname="mb-12"
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
              Email
            </label>
            <Field className="fieldStyles" type="email" name="email" required />
          </div>
          <div className="mb-4">
            <label className="block   text-sm font-medium mb-3" htmlFor="phoneNumber">
              Numero de teléfono
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
              Fecha de expedición del documento (dd/mm/aaaa)
            </label>
            <Field
            type="date"
            id="ccExpirationDate"
            name="ccExpirationDate"
            className="fieldStyles"
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


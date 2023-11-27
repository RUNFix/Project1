import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { API_CLIENT, API_VEHICLE } from 'src/api/api';
import { useUserContext } from 'src/context/Context';
import { Client } from 'src/Interfaces/Client';
import { Repair, initialValues } from 'src/Interfaces/Repair';
import { Vehicle } from 'src/Interfaces/Vehicle';
import { errorToast } from 'src/utils/Toast';

interface Props {
  onSubmitRepair: (values: Repair) => void;
}

const RepairForm: React.FC<Props> = ({ onSubmitRepair }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const { cc } = useUserContext();

  const ccEmployee = cc;
  const ccEmployeeNumber = Number(ccEmployee);


  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await axios.get(API_VEHICLE);

        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }

    fetchVehicles();
  }, []);

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await axios.get(API_CLIENT);

        setClients(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }

    fetchClients();
  }, []);

 const checkDataExistence = (cc: number, plate: string): boolean => {
   const clientExists = clients.some((client) => client.cc === cc);
   const vehicleExists = vehicles.some((vehicle) => vehicle.plate === plate);

   console.log(vehicleExists, clientExists)

    
   if (!vehicleExists && !clientExists) {
      errorToast(
        `La placa ${plate} y  el documento ${cc} no existe. Por favor, registre el vehículo y el cliente.`,
      );
      return false;
    }

   if (!clientExists) {
     errorToast(
       `El documento de identidad ${cc} no existe. Por favor, registre el cliente.`,
     );
     return false;
   }

   if (!vehicleExists) {
     errorToast(`La placa ${plate} no existe. Por favor, registre el vehículo.`);
     return false;
   }

   return true;
 };
  return (
    <Formik
      initialValues={{ ...initialValues, employee: ccEmployeeNumber }}
      onSubmit={(values) => {
        const { cc, plate } = values;

        if (checkDataExistence(cc, plate)) {
          onSubmitRepair(values);
        }
      }}
    >
      {({ values }) => (
        <Form className="formStyles">
          <div className="mb-4">
            <label className="block  text-sm font-medium  mb-3" htmlFor="plate">
              Placa
            </label>
            <Field className="fieldStyles" type="text" name="plate" required />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-medium mb-3" htmlFor="cc">
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
            <label
              className="block text-sm font-medium mb-3"
              htmlFor="reasonForService"
            >
              Razón del servicio
            </label>
            <Field
              className="fieldStyles"
              as="select"
              name="reasonForService"
              required
            >
              <option value="" label="Seleccione una opción" />
              <option
                value="Mantenimiento preventivo."
                label="Mantenimiento preventivo"
              />
              <option
                value="Reparación correctiva"
                label="Reparación correctiva"
              />
              <option value="Garantía" label="Garantía" />
              <option value="Otro" label="Otro" />
            </Field>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-3"
              htmlFor="employee"
            >
              Cedula del empleado
            </label>
            <Field
              className="fieldStyles"
              type="text"
              name="employee"
              readOnly
              value={ccEmployeeNumber}
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

export default RepairForm;

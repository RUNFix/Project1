import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Vehicle, initialValues } from 'src/types/Vehicle';
import { API_AUTH_REFRESH, API_EMPLOYEE } from 'src/api/api';
import axios from 'axios';
import { Empleado } from 'src/types/Employee';
import { useUserContext } from 'src/context/Context';
import { getAccessToken, getRefreshToken, setAccessToken } from 'src/utils/Token';

interface Props {
  onSubmit: (values: Vehicle) => void;
}

const VehicleForm: React.FC<Props> = ({ onSubmit }) => {
  const [employees, setEmployees] = useState<Empleado[]>([]);
  const [adminActive, setAdminActive] = useState(true);

  const { position } = useUserContext();
  const { employeeName } = useUserContext();

  useEffect(() => {
    /*REFRESH TOKEN*/
    async function refreshAndRetry() {
      const refreshToken = getRefreshToken();

      console.log(
        'Token expired. Attempting refresh with token: ' + refreshToken,
      );
      if (!refreshToken) {
        console.log('Refresh token not found in session storage.');
        return;
      }

      try {
        const response = await axios.post(API_AUTH_REFRESH, {
          refreshToken: refreshToken,
        });

        const newAccessToken = response.data.accessToken.token;

        setAccessToken(newAccessToken);

        fetchEmployees();
      } catch (refreshError: any) {
        console.log('Error refreshing the access token:', refreshError);
        if (refreshError.response) {
          console.log('Data:', refreshError.response.data);
          console.log('Status:', refreshError.response.status);
          console.log('Headers:', refreshError.response.headers);
        } else if (refreshError.request) {
          console.log('Request:', refreshError.request);
        } else {
          console.log('General Error:', refreshError.message);
        }
      }
    }
    /*FETCH EMPLOYEES */
    async function fetchEmployees() {
      const accessToken = getAccessToken();

      try {
        const res = await axios.get(API_EMPLOYEE, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        });

        setEmployees(res.data);
      } catch (error: any) {
        console.error('error', error);

        if (
          error.response &&
          error.response.data.message === 'TokenExpiredError'
        ) {
          console.log('Token expirado zzz');
          refreshAndRetry();
        } else {
          
      }
    }
  }
    /*code logic */

    console.log(position);
    if (position === 'Empleado') {
      setAdminActive(false);
    } else {
      const initialAccessToken = getAccessToken();
      if (initialAccessToken) {
        fetchEmployees();
      }
    }  
  }, [position]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values);
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
            <label
              className="block text-sm font-medium mb-3"
              htmlFor="reasonForService"
            >
              Razón del servicio
            </label>
            {adminActive ? (
              <Field className="fieldStyles" as="select" name="reasonForService" required>
              <option value="" label="Seleccione una opción" />
              <option value="Mantenimiento preventivo." label='Mantenimiento preventivo'/>
              <option value="Reparación correctiva" label='Reparación correctiva'/>
              <option value="Garantía" label='Garantía'/>
              <option value="Otro" label='Otro'/>
            </Field>
            ) : (
              <input type="text" placeholder='papaya' />
            )}
            
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
            <label className="block  text-sm font-medium mb-3" htmlFor="model">
              Modelo
            </label>
            <Field className="fieldStyles" type="text" name="model" required/>
          </div>
          <div className="mb-4">
            <label className="block   text-sm font-medium mb-3" htmlFor="brand">
              Marca
            </label>
            <Field className="fieldStyles" type="text" name="brand" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-3" htmlFor="year">
              Año
            </label>
            <Field
              className="fieldStyles"
              type="number"
              name="year"
              min={0}
              max={9999}
              value={values.year === 0 ? '' : values.year}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-medium mb-3" htmlFor="color">
              Color
            </label>
            <Field className="fieldStyles" type="text" name="color" required />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-3"
              htmlFor="employee"
            >
              Empleado Encargado
            </label>
            {adminActive ? (
              <Field className="fieldStyles" as="select" name="employee" required>
              <option value="" label="Select employee" />
              {employees.map((employee) => (
                <option
                  value={employee.cc}
                  label={employee.fullName}
                  key={employee.cc}
                />
              ))}
            </Field>
            ) : (
              <input type="text" placeholder={employeeName} />
            )}
            
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

export default VehicleForm;

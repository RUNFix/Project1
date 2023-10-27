import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Vehicle, initialValues } from 'src/types/Vehicle';
import { API_EMPLOYEE } from 'src/api/api';
import axios from 'axios';
import { Empleado } from 'src/types/Employee';

interface Props {
  onSubmit: (values: Vehicle) => void;
}

const VehicleForm: React.FC<Props> = ({ onSubmit }) => {
  const [employees, setEmployees] = useState<Empleado[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_EMPLOYEE);
        setEmployees(response.data);
      } catch (error: any) {
        console.error('error', error);
      }
    };

    fetchData();
  }, []);

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
            <label className="block  text-sm font-medium  mb-3" htmlFor="name">
              Nombre
            </label>
            <Field className="fieldStyles" type="text" name="name" required />
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
            <Field className="fieldStyles" type="text" name="model" required />
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

import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Vehicle, initialValues } from '@/types/Vehicle';
import '@/index.css';

interface Props {
  onSubmit: (values: Vehicle) => void;
}

const VehicleForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ values }) => (
        <Form className="formStyles">
          <div className="mb-4">
            <label className="block  text-sm font-medium  mb-3" htmlFor="name">
              Placa
            </label>
            <Field className="fieldStyles" type="text" name="name" required />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-medium  mb-3" htmlFor="name">
              Nombre
            </label>
            <Field className="fieldStyles" type="text" name="name" required />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-medium mb-3" htmlFor="cc">
              CC
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
            <label className="block text-sm font-medium mb-3" htmlFor="status">
              Estado del vehiculo
            </label>
            <Field className="fieldStyles" type="text" name="status" required />
          </div>
          <div className="mb-4">
            <label
              className="block  text-sm font-medium mb-3"
              htmlFor="priceToPay"
            >
              Precio Reparaciones
            </label>
            <Field
              className="fieldStyles"
              type="number"
              name="priceToPay"
              min={0}
              value={values.priceToPay === 0 ? '' : values.priceToPay}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-3"
              htmlFor="employee"
            >
              Empleado Encargado
            </label>
            <Field
              className="fieldStyles"
              type="text"
              name="employee"
              required
            />
          </div>
          <FieldArray name="parts">
            {({ push, remove }) => (
              <div className="my-4">
                <button
                  type="button"
                  onClick={() => push({ name: '', description: '' })}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3"
                >
                  Agregar Partes del Vehiculo a Reparar
                </button>
                {values.parts.map((part, index) => (
                  <div key={index} className="mb-4">
                    <label
                      className="block text-gray-50 text-sm font-medium my-3"
                      htmlFor="partsName"
                    >
                      Nombre de la parte
                    </label>
                    <Field
                      className="fieldStyles"
                      type="text"
                      name={`parts.${index}.name`}
                    />
                    <label
                      className="block text-gray-50 text-sm font-medium my-4"
                      htmlFor="partsDescription"
                    >
                      Descripcion del Daño
                    </label>
                    <Field
                      className="fieldStyles"
                      type="text"
                      name={`parts.${index}.description`}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded  my-4"
                    >
                      Eliminar Parte
                    </button>
                  </div>
                ))}
              </div>
            )}
          </FieldArray>
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

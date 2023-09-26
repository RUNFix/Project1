import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

interface Part {
  name: string;
  description: string;
}

interface Vehicle {
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

interface Props {
  onSubmit: (values: Vehicle) => void;
}

const initialValues: Vehicle = {
  name: '',
  cc: 0,
  model: '',
  brand: '',
  year: 0,
  color: '',
  status: '',
  priceToPay: 0,
  employee: '',
  parts: [{ name: '', description: '' }],
  date: new Date(),
  images: '',
};

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
        <Form className="bg-slate-800 text mt-10 text-base text-gray-50 shadow-md rounded-3xl  px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block  text-sm font-medium  mb-3" htmlFor="name">
              Nombre
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline "
              type="text"
              name="name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-medium mb-3" htmlFor="cc">
              CC
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline "
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
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="model"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block   text-sm font-medium mb-3" htmlFor="brand">
              Marca
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="brand"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-3" htmlFor="year">
              Año
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline "
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
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="color"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-3" htmlFor="status">
              Estado del vehiculo
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="status"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block  text-sm font-medium mb-3"
              htmlFor="priceToPay"
            >
              Precio Reparaciones
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-3"
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline mb-2"
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline mb-2"
                      type="text"
                      name={`parts.${index}.description`}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2"
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
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default VehicleForm;

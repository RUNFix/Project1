import { Field, Form, Formik } from 'formik';
import { Vehicle, initialValues } from 'src/types/Vehicle';

interface Props {
  onSubmit: (values: Vehicle) => void;
}

const VehicleForm: React.FC<Props> = ({ onSubmit }) => {
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

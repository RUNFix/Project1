import { Field, Form, Formik } from 'formik';
import { Vehicle, initialValues } from 'src/types/Vehicle';

interface Props {
  onSubmit: (values: Vehicle) => void;
}

const VehicleForm: React.FC<Props> = ({ onSubmit }) => {

  const years = Array.from({ length: 2024 - 1950 + 1 }, (_, index) => 1950 + index).reverse();
  const colors = ['Rojo', 'Verde', 'Azul', ,'Morado', 'Beige', 'Naranja', 'Amarillo', 'Negro', 'Blanco', 'Gris', 'Plateado', 'Otro'];

  // Función para generar las opciones de la lista desplegable de colores
  const renderColorOptions = () => {
    return colors.map((color, index) => (
      <option key={index} value={color}>
        {color}
      </option>
    ));
  };


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
            <Field className="fieldStyles" type="number" as="select" name="year" required>
              <option value="" disabled hidden>
                  Selecciona un año
                </option>
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
            </Field>
            
            
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-medium mb-3" htmlFor="color">
              Color
            </label>
            <Field
              as="select"
              className="fieldStyles"
              name="color"
              required
            >
              <option value="" disabled hidden>
                Selecciona un color
              </option>
              {renderColorOptions()}
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

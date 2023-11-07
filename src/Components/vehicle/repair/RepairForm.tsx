import { Formik, Form, Field } from 'formik';
import { Repair, initialValues } from 'src/types/Repair';

interface Props {
  onSubmitRepair: (values: Repair) => void;
}

const RepairForm: React.FC<Props> = ({ onSubmitRepair }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmitRepair(values);
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
              className="block  text-sm font-medium mb-3"
              htmlFor="employee"
            >
              Cedula empleado
            </label>
            <Field
              className="fieldStyles"
              type="number"
              name="employee"
              min={0}
              max={9999999999}
              value={values.employee === 0 ? '' : values.employee}
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

export default RepairForm;

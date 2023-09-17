import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../Componentes/Login';
import RegistroEmpleados from '../Componentes/RegistroEmpleados';
import TablaEmpleados from '../Componentes/TablaEmpleados';
import Watson from '../Componentes/Watson';

function RoutesApp() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            {/* <Route
              path="employee"
              element={<EmpleadoCard empleados={empleados} />}
            /> */}
            <Route path="login" element={<Login />} />
            <Route path="register_employee" element={<RegistroEmpleados />} />
            <Route path="table_employee" element={<TablaEmpleados />} />
            <Route path="watson" element={<Watson />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default RoutesApp;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../Componentes/Login';
import RegistroEmpleados from '../Componentes/RegistroEmpleados';
import TablaEmpleados from '../Componentes/TablaEmpleados';
import Watson from '../Componentes/Watson';
import MenuPrincipal from '../Componentes/MenuPrincipal';
import SubMenu from '../Componentes/SubMenu';

function RoutesApp() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="home" element={<MenuPrincipal />} />
            <Route path="register-employee" element={<RegistroEmpleados />} />
            <Route path="table-employee" element={<TablaEmpleados />} />
            <Route path="submenu" element={<SubMenu user={'admin'} />} />
            <Route path="watson" element={<Watson />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default RoutesApp;

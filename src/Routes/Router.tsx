import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Watson from '../components/Watson';
import SubMenu from '../components/SubMenu';
import Home from '../pages/Home';
import EmployeeRegistration from '../components/employee/EmployeeRegistration';
import EmployeeTable from '../components/employee/EmployeeTable';
import SparePartsRegistration from '../components/SparePartsRegistration';
import PhotoMenu from '../components/vehicle/VehiclesPhotos';
import Vehicle from '../components/vehicle/Vehicle';
import PasswordChange from '../pages/PasswordChange';

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-change" element={<PasswordChange />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register-employee" element={<EmployeeRegistration />} />
        <Route path="/table-employee" element={<EmployeeTable />} />
        <Route path="/submenu" element={<SubMenu />} />
        <Route path="/watson" element={<Watson />} />
        <Route
          path="/spare-parts-registration"
          element={<SparePartsRegistration />}
        />
        <Route path="/vehicle-menu" element={<PhotoMenu />} />
        <Route path="/vehicle" element={<Vehicle />} />
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesApp;

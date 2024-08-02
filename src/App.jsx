import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Ensure correct import path
import Home from './pages/Home'; // Ensure correct import path
import NewEmployeesForm from './pages/NewEmployeesForm'; // Ensure correct import path

export default function App() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newemployee" element={<NewEmployeesForm />} />
      </Routes>
    </div>
  );
}

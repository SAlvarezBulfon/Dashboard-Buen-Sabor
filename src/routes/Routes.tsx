import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseNavbar from '../components/ui/common/Navbar/BaseNavbar';
import BasicSidebar from '../components/ui/common/Sidebar/BasicSidebar';
import Inicio from '../components/screens/Inicio/Inicio';
import './routes.css'; 
import Empresa from '../components/screens/Empresa/Empresa';
import Sucursal from '../components/screens/Sucursal/Sucursal';
import Producto from '../components/screens/Producto/Producto';
import Insumo from '../components/screens/Insumo/Insumo';
import Promocion from '../components/screens/Promocion/Promocion';
import Categoria from '../components/screens/Categoria/Categoria';

const Rutas: React.FC = () => {
  return (
    <Router>
      <div className='navbar'>
      <BaseNavbar />
      </div>
        <div className="sidebar">
          <BasicSidebar />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/empresas" element={<Empresa />} />
            <Route path="/empresas/:empresaId" element={<Sucursal />} />
            <Route path='/productos' element={<Producto/>}/>
            <Route path='/insumos' element={<Insumo/>}/>
            <Route path='/promociones' element={<Promocion/>}/>
            <Route path='/categorias' element={<Categoria/>}/>
          </Routes>
        </div>
    </Router>
  );
}

export default Rutas;


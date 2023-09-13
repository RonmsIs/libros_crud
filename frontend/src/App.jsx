import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CrearLibros from './pages/crearLibros';
import EditarLibros from './pages/editarLibro';
import MostrarLibro from './pages/mostrarLibro';
import BorrarLibros from './pages/borrarLibro';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/libros/crear' element={<CrearLibros />} />
            <Route path='/libros/detalles/:id' element={<MostrarLibro />} />
            <Route path='/libros/editar/:id' element={<EditarLibros />} />
            <Route path='/libros/borrar/:id' element={<BorrarLibros />} />
        </Routes>
    );
};

export default App;
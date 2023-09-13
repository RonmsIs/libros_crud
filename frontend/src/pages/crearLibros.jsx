import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const crearLibros = () => {
  const[titulo, setTitulo] = useState('');
  const[autor, setAutor] = useState('');
  const[publishYear, setPublishYear] = useState('');
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const handleGuardarLibro = () => {
    const data ={
      titulo,
      autor,
      publishYear
    };
    setLoading(true);
    axios
      .post('http://localhost:8080/libros', data)
      .then(() =>{
        setLoading(false);
        enqueueSnackbar('Libro creado de forma correcta', { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('Un error aparecio. Por favor revise la consola');
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3x1 my-4'> Crear Libro</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> Titulo </label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> Autor </label>
          <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> Año de publicación  </label>
          <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleGuardarLibro}>
          Guardar
        </button>
      </div>
    </div>
  )
}

export default crearLibros;
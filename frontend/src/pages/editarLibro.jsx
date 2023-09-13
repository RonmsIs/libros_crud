import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const editarLibro = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/libros/${id}`)
      .then((response) => {
        setAutor(response.data.autor);
        setPublishYear(response.data.publishYear);
        setTitulo(response.data.titulo);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('Un error aparecio. Por favor revise la consola');
        console.log(error);
      })
  }, []);
  const handleEditarLibro = () => {
    const data = {
      titulo,
      autor,
      publishYear
    };
    setLoading(true);
    axios
      .put(`http://localhost:8080/libros/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Libro editado de forma correcta', {variant: 'success'});
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
      <h1 className='text-3x1 my-4'> Editar Libro</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> Titulo </label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> Autor </label>
          <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> Año de publicación  </label>
          <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditarLibro}>
          Guardar
        </button>
      </div>
    </div>
  )
}

export default editarLibro;
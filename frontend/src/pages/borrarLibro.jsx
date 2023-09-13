import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const borrarLibro = () => {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleBorrarLibro =() =>{
    setLoading(true);
    axios
      .delete(`http://localhost:8080/libros/${id}`)
      .then(() =>{
        setLoading(false);
        enqueueSnackbar('Libro borrado de forma correcta', {variant: 'success'});
        navigate('/');
      })
      .catch((error) =>{
        setLoading(false);
        // alert('Un error aparecio. Por favor revise la consola');
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error);
      });
  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Borrar Libro</h1>
      {Loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Seguro desea eliminar este libro?</h3>
          <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleBorrarLibro}>Si, Borrar</button>
      </div>
    </div>
  )
}

export default borrarLibro;
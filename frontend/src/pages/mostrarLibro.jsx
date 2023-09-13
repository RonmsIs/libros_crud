import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const mostrarLibro = () => {
  const [libro, setLibro] = useState({});
  const[loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:8080/libros/${id}`)
    .then((response) =>{
      setLibro(response.data);
      setLoading(false);
    })
    .catch((error) =>{
      console.log(error);
      setLoading(false);
    })

  }, [])
  return(
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3x1 my-4'>Mostrar Libro</h1>
      {loading ? (
        <Spinner />
      ):(
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>     
            <span>{libro._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Titulo</span>     
            <span>{libro.titulo}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Autor</span>     
            <span>{libro.autor}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Año de Publicación</span>     
            <span>{libro.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Fecha de creación</span>     
            <span>{new Date(libro.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Ultima actualización</span>     
            <span>{new Date(libro.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
  
}

export default mostrarLibro;
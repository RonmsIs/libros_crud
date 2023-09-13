import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Titulo</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Autor</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Año de Publicacion</th>
              <th className='border border-slate-600 rounded-md'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books.map((libro, index) => (
              <tr key={libro._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {libro.titulo}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {libro.autor}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {libro.publishYear}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/libros/detalles/${libro._id}`}>
                      <BsInfoCircle className='text-2x1 text-green-800' />
                    </Link>
                    <Link to={`/libros/editar/${libro._id}`}>
                      <AiOutlineEdit className='text-2x1 text-yellow-600' />
                    </Link>
                    <Link to={`/libros/borrar/${libro._id}`}>
                      <MdOutlineDelete className='text-2x1 text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}

export default BooksTable
import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();


//ruta para guardar los libros
router.post('/', async(req, res) =>{
    try {
        if(
            !req.body.titulo ||
            !req.body.autor ||
            !req.body.publishYear
        ){
            return res.status(404).send({
                message: 'Envie todos los datos: titulo, autor y año de publicacion',
            });
        }
        const newBook = {
            titulo: req.body.titulo,
            autor: req.body.autor,
            publishYear: req.body.publishYear
        };
        
        const book = await Book.create(newBook);

        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//ruta paraa obtener todos los libros de la dv
router.get('/', async (req, res) => {
    try {

        const books = await Book.find({disponible: true});

        return res.status(200).send({
            count: books.length,
            data: books
        });   
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//ruta para obtener 1 libro por el id
router.get('/:id', async (req, res) => {
    try {
        
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).send(book);   
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//ruta para actualizar los datos del libro
router.put('/:id', async(req, res) =>{
    try {
        if(
            !req.body.titulo ||
            !req.body.autor ||
            !req.body.publishYear
        ){
            return res.status(404).send({
                message: 'Envie todos los datos: titulo, autor y año de publicacion',
            });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result) {
            return res.status(404).json({ message: 'No existe el libro'});
        }

        return res.status(200).send({message: 'Libro actualizado correctamente'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//ruta para borar un libro
router.delete('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, {disponible: false}, {new: true});
        if(!result) {
            return res.status(404).json({ message: 'No existe el libro'});
        }
        return res.status(200).send({message: 'Libro borrado correctamente'});
    } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});  
    }
});


export default router;

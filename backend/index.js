import express from 'express';
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware for pasing request body
app.use(express.json());

//Middleware for handling CORS policy
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
//Option 2: Allow Custom Origins
// app.use(
//     cors({
//       origin: 'http://localhost:8080',
//       methods: ['GET','POST', 'PUT', 'DELETE'],
//       allowedHeaders: ['Content-Type'],  
//     })
// )

app.get('/', (req, res) =>{
    console.log(req);
    return res.status(234).send('MERN')
});

app.use('/libros', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App Connected to database');
        app.listen(PORT, () =>{
            console.log(`listening on port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });
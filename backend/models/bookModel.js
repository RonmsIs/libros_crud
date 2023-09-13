import mongoose from 'mongoose';

const bookSchema= mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        autor: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        },
        disponible:{
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
    }
    );


export const Book = mongoose.model('book',bookSchema);
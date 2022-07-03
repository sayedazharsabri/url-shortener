import mongoose from 'mongoose';

const shortenerSchema = new mongoose.Schema({
    shortURL:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    originalURL:{
        type:String,
        required:true
    }
},{ timestamps: true });

export const Shortener = mongoose.model('Shortener', shortenerSchema);
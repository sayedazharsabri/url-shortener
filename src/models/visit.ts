import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
    shortURL: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    visitCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const Visit = mongoose.model('Visit', visitSchema);
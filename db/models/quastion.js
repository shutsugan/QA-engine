import mongoose from 'mongoose';

import { timestamps } from './utils';

const Schema = mongoose.Schema;
const ID = Schema.Types.ObjectId;
const quastionSchema = Schema({
    title: {
        type: String,
        required: [true, 'Quastion title is required'],
        unique: true
    },
    quastion: {
        type: String,
        required: [true, 'The Quastion is required'],
    },
    author: {
        type: ID,
        ref: 'User'
    },
    answers: [{
        type: ID,
        ref: 'Answer'
    }],
    votes: [{
        type: ID,
        ref: 'Vote'
    }]
}, timestamps);

const Quastion = mongoose.model('Quastion', quastionSchema);
export default Quastion;
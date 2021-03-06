import mongoose from 'mongoose';

import { timestamps } from './utils';

const Schema = mongoose.Schema;
const ID = Schema.Types.ObjectId;
const answerSchema = Schema({
    answer: {
        type: String,
        required: [true, 'The answer is required']
    },
    answered: {
        type: Boolean,
        default: false
    },
    published: {
        type: Boolean,
        default: true
    },
    quastion: {
        type: ID,
        ref: 'Quastion'
    },
    author: {
        type: ID,
        ref: 'User' 
    },
    votes: [{
        type: ID,
        ref: 'Vote'
    }]
}, timestamps);

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;
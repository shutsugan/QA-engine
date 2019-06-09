import mongoose from 'mongoose';

import { timestamps } from './utils';

const Schema = mongoose.Schema;
const ID = Schema.Types.ObjectId;
const voteSchema = Schema({
    author: {
        type: ID,
        ref: 'User'
    },
    quastion: {
        type: ID,
        ref: 'Quastion'
    },
    answer: {
        type: ID,
        ref: 'answer'
    }
}, timestamps);

const Vote = mongoose.model('Vote', voteSchema);
export default Vote;
import mongoose from 'mongoose';

import { timestamps } from './utils';

const Schema = mongoose.Schema;
const ID = Schema.Types.ObjectId;
const voteSchema = Schema({
    published: {
        type: Boolean,
        default: true
    },
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
        ref: 'Answer'
    }
}, timestamps);

const Vote = mongoose.model('Vote', voteSchema);
export default Vote;
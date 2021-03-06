import mongoose from 'mongoose';

import { addValidation, timestamps } from './utils';

const Schema = mongoose.Schema;
const ID = Schema.Types.ObjectId;
const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        unique: true,
        validate: addValidation(/[a-zA-Z0-9._]/, 'is not a valid user name')
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        validate: addValidation(/\S+@\S+\.\S+/, 'is not a valid email')
    },
    profile: String,
    google_id: String,
    quastions: [{
        type: ID,
        ref: 'Quastion'
    }],
    answers: [{
        type: ID,
        ref: 'Answer'
    }],
    votes: [{
        type: ID,
        ref: 'Vote'
    }]
}, timestamps);

const User = mongoose.model('User', userSchema);
export default User;

import mongoose from 'mongoose';

import User from './models/user';
import Quastion from './models/quastion';
import Answer from './models/answer';
import Vote from './models/vote';

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

export const startDb = ({ dburl }) => mongoose.connect(dburl);
export const models = { User, Quastion, Answer, Vote };
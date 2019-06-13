import { user } from './User';
import { Quastion } from './Quastion';

export default {
  user,
  hello: (_, { name }) => `Hello ${name || 'World'}`
};

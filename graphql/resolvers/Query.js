import { user } from './User';
import { quastions, quastion } from './Quastion';

export default {
  user,
  quastions,
  quastion,
  hello: (_, { name }) => `Hello ${name || 'World'}`
};

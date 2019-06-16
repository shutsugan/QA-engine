import { updateById } from './utils';

const quastions = async (_, { skip = 0, limit = 10, published = true }, { models }) => {
  const { Quastion } = models;
  const options = { published };

  const quastions = await Quastion
    .find(options, null, { skip, limit })
    .populate('author answers votes')
    .sort({ createdAt: 1 });
  
  const count = await Quastion.countDocuments(options);

  if (!quastions) throw new Error('Quastions do not exist');

  return {
    quastions,
    count
  }
};

const quastion = async (_, { id }, { models }) => {
  const quastion = models.Quastion
    .findById(id)
    .populate('author answers votes');

  if (!quastion) throw new Error('Quastion not found!');

  return quastion;
};

const createQuation = async (_, { input }, { models }) => {
  const { Quastion, User } = models;

  try {
    const quastion = await Quastion({ ...input });
    const ops = { $push: { quastions: quastion._id } };

    await quastion.save();
    await updateById(User, input.author, ops, 'User was not updated');
    
    return quastion;
  } catch (err) {
    throw new Error(err);
  }
};

const updateQuation = async (_, { id, input }, { models }) => {
  const { Quastion } = models;
  const ops = { $set: input };

  return updateById(Quastion, id, ops, 'Quastion was not updated');
};

const deleteQuation = async (_, { id }, { models }) => {
  const { Quastion } = models;
  const ops = { $set: { published: false } };

  return updateById(Quastion, id, ops, 'Quastion was not deleted');
};

export {
  quastions,
  quastion,
  createQuation,
  updateQuation,
  deleteQuation
};

const author = async ({ id }, _, { models }) => {
  const quastion = models.Quastion
    .findById(id)
    .populate('author');

  if (!quastion) throw new Error('Author not found');

  return quastion.author;
};

const votes = async ({ id }, _, { models }) => {
  const quastion = models.Quastion
    .findById(id)
    .populate('votes');

  if (!quastion) throw new Error('Votes not found');

  return quastion.votes;
};

export default {
  author,
  votes
};

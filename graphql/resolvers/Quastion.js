import { checkById, updateById } from './utils';

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
  createQuation,
  updateQuation,
  deleteQuation
};

export default {};

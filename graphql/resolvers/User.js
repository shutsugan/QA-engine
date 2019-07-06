import { populateById } from "./utils";

const user = async (_, { id }, { models }) => {
  try {
    const user = await models.User
      .findById(id)
      .populate('quastions');

    if (!user) throw new Error('User do not exist');

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

const login = async (_, __, { models }) => {};

const signup = async (_, { input }, { models }) => {
  try {
    const user = await models.User.create({...input});
    await user.save();

    return user;
  } catch(err) {
    throw new Error('User was not created');
  }
};

export {
  user,
  signup,
  login,
};

const quastions = async ({ id }, _, { models }) => {
  const { User } = models;
  const { quastions } = await populateById(User, id, 'quastions', 'Quastions not found');

  return quastions;
};

const answers = async ({ id }, _, { models }) => {
  const { User } = models;
  const { answers } = await populateById(User, id, 'answers', 'Answers not found');

  return answers;
};

export default {
  quastions,
  answers
};

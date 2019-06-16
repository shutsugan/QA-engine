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

export default {};

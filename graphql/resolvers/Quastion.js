const createQuation = async (_, { author, input }, { models }) => {
  const { Quastion } = models;
  try {
    const quastion = await Quastion({ author, ...input });

    await Quastion.updateOne({ _id: author }, { $push: { quastions: quastion._id } });
    await quastion.save();
    return quastion;
  } catch (err) {
    throw new Error('Quastion was not created');
  }
};

const updateQuation = async (_, { id, input }, { models }) => {
  const { Quastion } = models;

  const quationExist = await Quastion.findById(id);
  if (!quationExist) throw new Error('Quastion does not exist');

  try {
    const quastion = await Quastion.findByIdAndUpdate(id, { $set: input });
    const updatedQuastion = await Quastion.findById(id);

    return updatedQuastion;
  } catch (err) {
    throw new Error('Quastion was not updated');
  }
};

export {
  createQuation,
  updateQuation
};

export default {};

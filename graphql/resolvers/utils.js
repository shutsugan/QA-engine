export const checkById = async (model, id, message) => {
  const exist = await model.findById(id);
  if (!exist) throw new Error(message);
};

export const updateById = async (model, id, ops, message) => {
  checkById(model, id, message);

  try {
    await model.findByIdAndUpdate(id, ops);
    const updatedInstance = await model.findById(id);

    return updatedInstance;
  } catch (err) {
    throw new Error(err);
  }
};

export const populateById = async (model, id, populate, message) => {
  const instance = await model
    .findById(id)
    .populate(populate);

  if (!instance) throw new Error(message);

  return instance;
}

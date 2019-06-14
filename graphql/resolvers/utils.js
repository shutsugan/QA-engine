export const checkById = async (model, id, message) => {
  const exist = await model.findById(id);
  if (!exist) throw new Error(message);
};

export const updateById = async (model, id, ops, message) => {
  try {
    const instance = await model.findByIdAndUpdate(id, ops);
    const updatedInstance = await model.findById(id);

    return updatedInstance;
  } catch (err) {
    throw new Error(err);
  }
}

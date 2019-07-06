import { updateById, populateById } from "./utils";

const answers = async (_, { skip = 0, limit = 10, published = true}, { models }) => {
    const { Answer } = models;
    const options = { published };

    const count = await Answer.countDocuments(options);
    const answers = await Answer
        .find(options, null, { skip, limit })
        .populate('quastion author votes')
        .sort({ createdAt: 1 });

    if (!answers) throw new Error('Answers do not exist');

    return {
        answers,
        count
    }
};

const answer = async (_, { id }, { models }) => {
    const answer = models.Answer
        .findById(id)
        .populate('quastion author votes');
    
    if (!answer) throw new Error('Answer not found!');

    return answer;
};

const createAnswer = async (_, { input }, { models }) => {
    const { Answer, Quastion, User } = models;

    try {
        const answer = await Answer({ ...input });
        const ops = { $push: { answers: answer._id} };

        await answer.save();
        await updateById(Quastion, input.quastion, ops, 'Quastion was not updated');
        await updateById(User, input.author, ops, 'User was not updated');

        return answer;
    } catch (err) {
        throw new Error(err);
    }
};

const updateAnswer = async (_, { id, input }, { models }) => {
    const { Answer } = models;
    const ops = { $set: input };

    return updateById(Answer, id, ops, 'Answer was not updated');
};

const deleteAnswer = async (_, { id }, { models }) => {
    const { Answer } = models;
    const ops = { $set: { published: false } };

    return updateById(Answer, id, ops, 'Quastion was not deleted');
}

export {
    answers,
    answer,
    createAnswer,
    updateAnswer,
    deleteAnswer
};

const author = async ({ id }, _, { models }) => {
    const { Answer } = models;
    const { author } = await populateById(Answer, id, 'author', 'Author not found');

    return author;
};

const quastion = async ({ id }, _, { models }) => {
    const { Answer } = models;
    const { quastion } = await populateById(Answer, id, 'quastion', 'quation not found');

    return quastion;
}

const votes = async ({ id }, _, { models }) => {
    const { Answer } = models;
    const { votes } = await populateById(Answer, id, 'votes', 'Votes not found');

    return votes;
};

export default {
    author,
    quastion,
    votes
};

import { updateById, populateById } from "./utils";

const answerVote = async (_, { author, answer }, { models }) => {
    const vote = await models.Vote
        .find({ author, answer })
        .populate('author answer quastion');

    if (!vote) throw new Error('Vote not found!');

    return vote;
};

const quastionVote = async (_, { author, quastion }, { models }) => {
    const vote = models.Vote
        .find({ author, quastion })
        .populate('author answer quastion');

    if (!vote) throw new Error('Vote not found!');

    return vote;
};

const createVote = async (_, { input }, { models }) => {
    const { Vote, User, Answer, Quastion } = models;
    const { author, answer, quastion } = input;

    try {
        const vote = await Vote({ ... input});
        const ops = { $push : { votes: vote._id } };

        await vote.save();
        await updateById(User, author, ops, 'User was not updated');

        if (quastion) await updateById(Quastion, quastion, ops, 'Quastion was not updated');
        if (answer) await updateById(Answer, answer, ops, 'Answer was not updated');

        return vote;
    } catch (err) {
        throw new Error(err);
    }
};

const deleteVote = async (_, { id }, { models }) => {
    const { Vote } = models;
    const ops = { $set: { published: false } };

    return updateById(Vote, id, ops, 'Vote was not deleted');
};

export {
    answerVote,
    quastionVote,
    createVote,
    deleteVote
};

const author = async ({ id }, _, { models }) => {
    const { Vote } = models;
    const { author } = await populateById(Vote, id, 'author', 'Author not found');

    return author;
};

const quastion = async  ({ id }, _, { models }) => {
    const { Vote } = models;
    const { quastion } = await populateById(Vote, id, 'quastion', 'Quastion not found');

    return quastion;
};

const answer = async ({ id }, _, { models }) => {
    const { Vote } = models;
    const { answer } = await populateById(Vote, id, 'answer', 'Answer not found');

    return answer;
}

export default {
    author,
    quastion,
    answer
};

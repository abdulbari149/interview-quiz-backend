const fs = require("fs");
const data = require("./data.json");
const { models, sequelize } = require("./models");
const header = data.Sheet1[0];

function transformQuestion(question) {
	const options = [];
	const data = new Map();
	Object.entries(question).forEach(([key, value]) => {
		const headerKey = header[key];
		if (!isNaN(parseInt(headerKey))) {
			options.push(value);
		}
		data.set(headerKey, value);
	});

	const correctAnswer = data.get(data.get("correct_answer"));

	return {
		question: data.get("question"),
		options,
		correctAnswer,
	};
}

const questions = data.Sheet1.slice(1).map(transformQuestion);

const createQuestion = async (data, { transaction }) => {
	const [question, ...options] = await Promise.all([
		models.Question.create({ question: data.question }, { transaction }),
		...data.options.map((option) =>
			models.Option.create({ option }, { transaction })
		),
	]);

	const questionOptions = await Promise.all(
		options.map((option) =>
			models.QuestionOption.create(
				{
					questionId: question.id,
					optionId: option.id,
					isCorrect: option.dataValues.option == data.correctAnswer,
				},
				{ transaction }
			)
		)
	);
};

async function seed() {
	const transaction = await sequelize.transaction();
	try {
		await Promise.all(questions.map((q) => createQuestion(q, { transaction })));
		await transaction.commit()
	} catch (error) {
		await transaction.rollback()
		console.log(error)
		throw error;
	}
}

module.exports = seed;

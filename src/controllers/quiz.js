const db = require("../config/db");
const { models } = require("../models");
const getCompleteQuiz = async (req, res, next) => {
	const limit = 5;
	const query = `
    SELECT questions.question, questions.id, array_agg(json_build_object('name', "options"."option", 'id',"options".id)) as options,
    array_agg("options".id) as option_ids
    FROM "question_options" 
    left join "questions" on "questions"."id" = "question_options"."question_id" 
    left join "options" on "options"."id" = "question_options"."option_id"
    group by questions.id
    ORDER BY RANDOM()
    LIMIT $1
  `;
	const values = [limit];

	try {
		const { rows } = await db.pool.query(query, values);

		res.status(200).json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
};

const calculateResult = async (req, res) => {
	const { answers, user_id } = req.body;

	const user = await models.User.findOne({
		where: { id: user_id },
		raw: true,
		nest: true,
	});

	if (!user) {
		res.status(404).json({ message: "user not found" });
	}

	const answerPromises = answers.map(async (answer) => {
		const { question_id, option_id } = answer;
		return await db.pool.query(
			"SELECT is_correct from question_options where question_id = $1 and option_id = $2",
			[question_id, option_id]
		);
	});

	let count = 0;
	const answerResults = await Promise.all(answerPromises);
	for (let answer of answerResults) {
		if (answer.rows.length >= 1 && answer.rows[0].is_correct) {
			count += 1;
		}
	}
	const score = (count / 5) * 100;
	db.pool.query(
		"UPDATE users SET score = $1, correct_answers = $2 WHERE id = $3",
		[score, count, user_id]
	);

	res.status(200).json({ noOfCorrectAnswers: count, score, user });
};

module.exports = {
	getCompleteQuiz,
	calculateResult,
};

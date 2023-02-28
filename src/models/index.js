const { Sequelize } = require("sequelize");
const database = require("../config/database");
const fs = require("fs");
const { resolve } = require("path");

const config = database["development"];
console.log(config);
const sequelize = new Sequelize({
	...config,
	port: 5432,
	dialect: "postgres",
	logging: console.log,
	schema: "public",
	sync: true,
});

fs.readdirSync(__dirname)
	.filter((file) => file.endsWith(".model.js"))
	.forEach((file) => {
		const modelPath = resolve(__dirname, `./${file}`);
		const { init } = require(modelPath);
		init(sequelize);
	});

const { Question } = require("./question.model");
const { Option } = require("./option.model");
const { QuestionOption } = require("./question_option.model");
const { User } = require("./user.model");
const initModels = async () => {
	try {
		// await sequelize.sync({ force: true, alter: true });
		await sequelize.authenticate();
		// QuestionOption and Question
		QuestionOption.belongsTo(Question, { foreignKey: "question_id" });
		Question.hasMany(QuestionOption, { foreignKey: "question_id" });

		// QuestionOption and Option
		QuestionOption.belongsTo(Option, { foreignKey: "option_id" });
		Option.hasMany(QuestionOption, { foreignKey: "option_id" });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	initModels,
	models: {
		Question,
		QuestionOption,
		Option,
		User,
	},
	sequelize
};

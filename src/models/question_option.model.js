const { DataTypes, Model } = require("sequelize");

class QuestionOption extends Model {}

const init = (sequelize) => {
	QuestionOption.init(
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			questionId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "questions",
					key: "id",
				},
				field: "question_id",
			},
			optionId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "options",
					key: "id",
				},
				field: "option_id",
			},
			isCorrect: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				field: "is_correct",
			},
		},
		{
			sequelize,
			underscored: true,
			paranoid: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
			deletedAt: "deleted_at",
			tableName: "question_options",
			timestamps: true,
		}
	);
};

module.exports = { init, QuestionOption };

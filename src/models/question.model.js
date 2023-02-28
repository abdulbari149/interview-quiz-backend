const { DataTypes, Model } = require("sequelize");

class Question extends Model {}

const init = (sequelize) => {
	Question.init(
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			question: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			sequelize,
			underscored: true,
			paranoid: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
			deletedAt: "deleted_at",
			tableName: "questions",
			timestamps: true,
		}
	);
};

module.exports = { init, Question };

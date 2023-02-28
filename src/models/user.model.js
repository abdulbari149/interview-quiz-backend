const { DataTypes, Model } = require("sequelize");

class User extends Model {}

const init = (sequelize) => {
	User.init(
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			cnic: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			correctAnswers: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'correct_answers'
			},
			score: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'score'
			},
		},
		{
			sequelize,
			underscored: true,
			paranoid: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
			deletedAt: "deleted_at",
			tableName: "users",
			timestamps: true,
		}
	);
};

module.exports = { init, User };

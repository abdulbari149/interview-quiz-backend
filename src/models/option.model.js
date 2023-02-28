const { DataTypes, Model } = require("sequelize");

class Option extends Model {}

const init = (sequelize) => {
	Option.init(
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			option: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "option",
			},
		},
		{
			sequelize,
			underscored: true,
			paranoid: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
			deletedAt: "deleted_at",
			tableName: "options",
			timestamps: true,
		}
	);
};
module.exports = { init, Option };

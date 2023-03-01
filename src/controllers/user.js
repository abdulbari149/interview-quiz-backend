const { Sequelize, ValidationError } = require("sequelize");
const { models } = require("../models");

const createUser = async (req, res) => {
	try {
		const { name, cnic } = req.body;
		const userExists = await models.User.findOne({
			where: {
				cnic
			}
		})
		if (userExists) {
			const error = new Error("CNIC already exists")
			error.status = 402
			throw error;
		}
		const user = await models.User.create({ name, cnic });
		res.status(201).send(user);
	} catch (error) {
		res.status(error?.status ?? 500).json({ message: error.message })
	}
};

const getUserById = async (req, res, next) => {
	try {
		const userId = parseInt(req.params.id, 10);
		console.log(typeof userId)
		if (isNaN(userId) || userId <= 0) {
			return res.status(400).json({ message: "User should be a number" });
		}
		const user = await models.User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
module.exports = {
	createUser,
	getUserById
};

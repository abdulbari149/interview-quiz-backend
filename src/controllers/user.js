const { models } = require("../models");

const createUser = async (req, res) => {
	try {
		const { name, cnic } = req.body;
		const user = await models.User.create({ name, cnic });
		res.status(201).send(user);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = {
	createUser,
};

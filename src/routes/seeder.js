const { Router } = require("express");
const seed = require("../seed");
const router = Router();
router.get("/", async (req, res) => {
	try {
		await seed();
		res.status(200).json({ message: "Seed completed Successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});



module.exports = router;
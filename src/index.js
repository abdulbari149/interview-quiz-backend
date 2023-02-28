const express = require("express");
const { initModels } = require("./models");
const { config } = require("dotenv");
config({ path: "../.env" });
initModels();

const  cors = require("cors");
const userRouter = require("./routes/user");
const seederRouter = require("./routes/seeder");
const quizRouter = require("./routes/quiz");

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use("/seed", seederRouter);
app.use("/quiz", quizRouter);
app.use("/user", userRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});

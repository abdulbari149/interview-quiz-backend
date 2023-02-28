const Pool = require("pg").Pool;
const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "interviewappdb",
	password: "postgres123",
	port: 5432,
});
pool.connect(() => {
	console.log("Connection to DB successful");
});

module.exports = {
	pool,
};

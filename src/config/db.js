const database = require("./database");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const config = database[typeof process.env.NODE_ENV === "undefined" ? "development" : process.env.NODE_ENV];


const Pool = require("pg").Pool;

const pool = new Pool({
	user: config.username,
	host: config.host,
	database: config.database,
	password: config.password,
	port: 5432,
});
pool.connect(() => {
	console.log("Connection to DB successful");
});

module.exports = {
	pool,
};

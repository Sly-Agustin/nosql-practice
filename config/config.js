require('dotenv').config();
module.exports = {
	development: {
		port: process.env.PORT,
        mongodb_url: process.env.MONGODB_URL
	},
};
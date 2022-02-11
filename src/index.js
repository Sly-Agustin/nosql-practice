const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});

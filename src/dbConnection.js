const mongoose = require('mongoose');
require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
    try {
        const credentials = process.env.MONGODB_URL;
        await mongoose.connect(credentials);

        console.log("Connected to database... I think?");
        console.log("State of connection (0: disc, 1: connected, 2: connecting, 3: disconnecting): "+mongoose.connection.readyState);
    }
    catch(e){
        console.log("Error: "+e);
    }   
}
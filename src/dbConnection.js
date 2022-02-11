// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect('mongodb+srv://nosqltest:vukDLYS5871UBZWk@cluster0.uxa4v.mongodb.net/nosql-test?retryWrites=true&w=majority');
        console.log("Connected to database... I think?");
        console.log("State of connection (0: disc, 1: connected, 2: connecting, 3: disconnecting): "+mongoose.connection.readyState);
    }
    catch(e){
        console.log("Error: "+e);
    }   
}
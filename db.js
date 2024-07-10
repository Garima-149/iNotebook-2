const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/?";

const connectToMongo =async ()=>{
     mongoose.connect(mongoURI)
        .then(()=>{
        console.log("Connected successfully")
    })
    .catch((error)=> {
        console.log("error",error);
    })
}

module.exports = connectToMongo;
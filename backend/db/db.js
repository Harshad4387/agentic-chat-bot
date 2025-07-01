const mongoose = require("mongoose");
const connect = async()=>{
    try{ 
        console.log(process.env.MONGO_URL);
        const connection = await mongoose.connect(`${process.env.MONGO_URL}/chatbot`);
        console.log("database conneted succesfully");
        

    }
    catch(error){
        console.log(error);
    }
}

module.exports = connect;
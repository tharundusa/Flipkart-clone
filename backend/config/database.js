const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config({path:"backend/config/config.env"});


const dataBaseConnection=()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`mongodb is connected:${data.connection.host}`);
    });
}

module.exports=dataBaseConnection;
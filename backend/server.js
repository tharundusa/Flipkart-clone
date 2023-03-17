const app=require("./app");

const dotenv=require("dotenv");
const connectDataBase=require("./config/database");

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to uncaughtException`);
    process.exit(1);
})
//handling uncaught exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log (`shutting down due to unhandled caught exceptions`);
    process.exit(1);
})

//config

dotenv.config({path:"backend/config/config.env"});

//database
connectDataBase()

app.listen(process.env.PORT,()=>{
    console.log(`serve is working `);
});

//unhandled promise exception
process.on("unhandledRejection",err=>{
    console.log(`Error;${err.message}`);
    console.log(`shutting down the seerver due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })
});



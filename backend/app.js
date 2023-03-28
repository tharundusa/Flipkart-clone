const express=require("express");
const app=express();
const errorMiddleWare=require("./middlewares/error");
const cookieparser=require("cookie-parser");
app.use(express.json());
app.use(cookieparser());

//route imports
const product=require("./routes/productRoute");
const user = require("./routes/userRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);
// Middle ware for error
app.use(errorMiddleWare);
module.exports=app;
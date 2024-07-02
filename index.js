const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/database");
const {logdata} = require("./config/logger");
const {errorHandlerMiddleware} = require("./config/errorHandler");
const passportJWT = require("./config/passport");
const moniteringMiddleware = require("./config/monitoring")

app.use(logdata)
app.use(moniteringMiddleware)
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/", require("./routes"));
app.use(errorHandlerMiddleware)
app.listen(port, (err)=>{
    if(err){
        console.log("Error in listening the port",err)
    }
    console.log("Server is listening the port", port)
})

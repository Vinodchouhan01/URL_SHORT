const express = require("express") ;
const app = express() ;
const urlRoute = require("./routes/urlRoute")
const DbConnect = require("./database/dbConnect")
const PORT = 8000 ;
require('dotenv').config(); 
app.use(express.json()) ;

DbConnect() ;
app.get("/" , (req , res) => {
    res.send(`<h1> HELLO server is running fine </h1>`)
})
app.use("/api" , urlRoute) ;
app.listen(PORT , (req , res) => {
    console.log("server is running fine") ;
})
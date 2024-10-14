const express = require("express") ;
const app = express() ;
const urlRoute = require("./routes/urlRoute")
const DbConnect = require("./database/dbConnect")
const URL = require("./models/url");
const staticRouter = require("./routes/staticRouter")

const PORT = 8000 ;
const path = require("path"); // 2 for ejs
require('dotenv').config(); 
app.use(express.json()) ;
app.use(express.urlencoded({extended : false}))
DbConnect() ;
app.set("view engine" , "ejs") ; // 1 for ejs first for install ejs
app.set("views" , path.resolve("./views")) ; // 3 for ejs

// app.get("/test" , async (req , res) => {
//     const allurls = await URL.find({}) ;
//     return res.render("home" , { 
//         urls : allurls ,
//     } ) ; // 4 for ejs
// })

app.use("/api/Home" , staticRouter) ;
app.use("/api" , urlRoute) ;
app.listen(PORT , (req , res) => {
    console.log("server is running fine") ;
})
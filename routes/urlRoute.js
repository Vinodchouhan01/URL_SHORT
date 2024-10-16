const express = require("express") ;
const router = express.Router() ;
const {HandleUrlController , loginHandle , signUpHandle} = require("../controller/HandleUrl");
const URL = require("../models/url");



router.post("/url" , HandleUrlController) ;
router.post("/login" , loginHandle) ;
router.post("/signup" , signUpHandle) ;

router.get("/url/:shortid" , async (req , res) => {
    const shortid = req.params.shortid ;
    console.log(shortid)

    const entry = await URL.findOneAndUpdate({
        shortId : shortid ,
    },{
        $push: {
            visitHistory: {
                timestamp : Date.now() 
            },
        }
    } , { new: true }
);
console.log(entry) ;
res.redirect(entry.redirectUrl) ;
}) ;


module.exports = router ;
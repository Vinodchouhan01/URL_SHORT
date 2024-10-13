const url = require("../models/url") ;
const shortid = require("shortid") ;
const HandleUrlController = async (req , res) => {
     try {
        const shortId = shortid(8) ;
        const {redirctUrl} = req.body ;
     if(!redirctUrl){
        return res.status(400).json({error : "redirctUrl is required"}) ;
     } 
     const entry  = await url.create({
        shortId : shortId ,
        redirectUrl : redirctUrl ,
        visitHistory : {}
     })
     return res.status(201).json({
       entry ,
       message : "Handle function is done"
     })
     } catch (error) {
        return res.status(400).json({
            error : "error in HandleController"
        })
     }
}

module.exports = HandleUrlController ;
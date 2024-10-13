const express = require("express") ;
const router = express.Router() ;
const HandleUrlController = require("../controller/HandleUrl");
const URL = require("../models/url");



router.post("/url" , HandleUrlController) ;

module.exports = router ;
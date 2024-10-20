const url = require("../models/url") ;
const User = require("../models/user");
const jwt = require("jsonwebtoken") ;
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
     return res.render("Home" , {
      id:entry.shortId 
     })
     } catch (error) {
        return res.status(400).json({
            error : "error in HandleController"
        })
     }
}

const signUpHandle = async (req, res) => {
   const { fullname, email, password } = req.body;

   try {

      let user = await User.findOne({ email });
       if (user) {
           return res.status(400).json({ message: 'User already exists' });
       }

       // Create new user
       user = new User({ fullname, email, password });
       await user.save();

       // Generate JWT
       const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
       res.status(201).json({ token });
   } catch (error) {
       console.error(error);
       res.status(500).send('Server error');
   }
}

const loginHandle = async(req , res) => {
   const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

module.exports = {HandleUrlController , loginHandle , signUpHandle} ;
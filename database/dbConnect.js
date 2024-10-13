const mongoose = require("mongoose") ;
const DbConnect = () => {

    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DB is connected") ;
    })
    .catch((err) => {
        console.log("error in  connecting DB") ;
    })
}

module.exports = DbConnect ;
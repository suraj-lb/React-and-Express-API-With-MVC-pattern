const mongoose = require('mongoose')
const dbInit = async() =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("Mongo DB is Connected")
      } catch (error) {
        handleError(error);
      }
}

// OR

// mongoose.connect('mongodb://localhost:27017/my-blog', { useNewUrlParser: true }).
// catch(error => handleError(error));

module.exports = {dbInit}
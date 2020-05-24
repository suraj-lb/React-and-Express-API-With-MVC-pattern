var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Blog = new Schema({
    title: {
        type:String
    },
    description: {
        type:String
    },
})

module.exports = mongoose.model('blog', Blog );
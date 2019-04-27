const mongoose = require('mongoose')
//DB configuration
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/index',{useNewUrlParser: true})
    .then(function(){
        console.log('connected to db')
    })
    .catch(function(){
        console.log('OOPS!! , something went wrong')
    })
module.export = {
    mongoose
}
const mongoose = require('mongoose')

const Schema = mongoose.Schema   
const tagSchema = new Schema({
    name: {
        type: String,
    
    },
    stories: [{
        type: String,

    }]
  
})
// create a model based on the schema
const Tag = mongoose.model('Tag',tagSchema)

module.exports = {
    Tag
}
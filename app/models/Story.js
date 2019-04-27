const mongoose = require('mongoose')

const Schema = mongoose.Schema   
const storySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type:String,
    },
    body: {
        type: String,
        required: true
    },
    topicId: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    publishDate: {
        type: Date
    },
    ispublished: {
        type: Boolean
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    tags:{
        type: [String]
        
    }
  
})
// create a model based on the schema
const Story = mongoose.model('Story',storySchema)

module.exports = {
    Story
}
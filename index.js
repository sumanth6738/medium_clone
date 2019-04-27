const express = require('express')
const cors =  require('cors')
const app = express()
app.use(express.json())
const port = 3005

//database connection
const {mongoose} = require('./config/database')

//models
const {User} = require('./app/models/User')
const {Topic}= require('./app/models/Topic')
const {Story}= require('./app/models/Story')
const {Tag}= require('./app/models/Tag')


//controllers
const {userRouter} = require('./app/controllers/UserControllers')
const {topicRouter} = require('./app/controllers/TopicControllers')
const {storyRouter} = require('./app/controllers/StoryControllers')
const {tagRouter} = require('./app/controllers/TagControllers')


//url routing
app.use(cors())
app.use('/users',userRouter)
app.use('/topics',topicRouter)
app.use('/stories',storyRouter)
app.use('/tags',tagRouter)


app.listen(port,function(){
    console.log('Hey, listening to port',port)
})
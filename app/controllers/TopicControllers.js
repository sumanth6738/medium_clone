const express = require('express')
const router = express.Router()
//const { authenticateUser} = require('../middlewares/authentication')
const { Topic } = require('../models/Topic')
// topic router
router.get('/', function(req,res){
    Topic.find()
    .then(function(topics){
        res.send(topics)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.post('/', function(req,res){
    const body = req.body
    const topic = new Topic(body)
   // topic.user = req.user._id
    topic.save()
    .then(function(topic){
        res.send(topic)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.get('/:id', function(req,res){
    const id = req.params.id
    Topic.findById(id)
    .then(function(topic){
        res.send(topic)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.delete('/:id',function(req,res){
    const id = req.params.id
    Topic.findByIdAndDelete(id)
    .then(function(topic){
        res.send(topic)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.put('/:id',function(req,res){
    const id = req.params.id
    const body = req.body
    Topic.findByIdAndUpdate(id, {$set: body}, {new: true, runValidators: true})
    .then(function(topic){
        res.send(topic)
    })
    .catch(function(err){
        res.send(err)
    })

})
module.exports = {
    topicRouter: router
}
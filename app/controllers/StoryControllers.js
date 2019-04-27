const express = require('express')
const router = express.Router()
const { authenticateUser} = require('../middlewares/authentication')
const { Story } = require('../models/Story')
const {User} = require('../models/User')

// storyrouter
router.get('/', authenticateUser, function(req,res){
    Story.find( {user: req.user._id} )
    .then(function(stories){
        console.log(stories)
        res.send(stories)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.post('/', authenticateUser, function(req,res){
    // const body = req.body
    let body = req.body
//     let body = res.body.toString()
//    striptags(body)
    const story= new Story(body)
    story.user = req.user._id
    story.save()
    .then(function(story){
        User.update({
            _id: req.user._id
        },{
            $push: {
                stories: story._id
            }
        }).exec(function(err, user){
            console.log("story added to user id")
        })
        
        res.send(story)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.get('/:id', authenticateUser, function(req,res){
    const id = req.params.id
    Story.findOne({
        user: req.user._id,
        _id: id
    })
    // findById(id)
    .then(function(story){
        if(story){
            res.send(story)
        }else{
            res.send({})
        }
        
    })
    .catch(function(err){
        res.send(err)
    })
})

router.delete('/:id',authenticateUser,function(req,res){
    const id = req.params.id
    Story.findOneAndDelete({
        user: req.user._id,
        _id: id
    })
    //findByIdAndDelete(id)
    .then(function(story){
        res.send(story)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.put('/:id',authenticateUser,function(req,res){
    const id = req.params.id
    const body = req.body
    Story.findOneAndUpdate({
        user: req.user._id,
        _id: id
    }, { $set: body }, { new: true, runValidators: true})
    //findByIdAndUpdate(id, {$set: body}, {new: true, runValidators: true})
    .then(function(story){
        res.send(story)
    })
    .catch(function(err){
        res.send(err)
    })

})
module.exports = {
    storyRouter: router
}
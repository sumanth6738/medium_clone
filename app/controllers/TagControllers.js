const express = require('express')
const router = express.Router()
//const { authenticateUser} = require('../middlewares/authentication')
const { Tag } = require('../models/Tag')
// tag router
router.get('/', function(req,res){
    Tag.find()
    .then(function(tags){
        res.send(tags)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.post('/', function(req,res){
    const body = req.body
    const tag = new Tag(body)
   // tag.user = req.user._id
    tag.save()
    .then(function(tag){
        res.send(tag)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.get('/:id', function(req,res){
    const id = req.params.id
    Tag.findById(id)
    .then(function(tag){
        res.send(tag)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.delete('/:id',function(req,res){
    const id = req.params.id
    Tag.findByIdAndDelete(id)
    .then(function(tag){
        res.send(tag)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.put('/:id',function(req,res){
    const id = req.params.id
    const body = req.body
    Tag.findByIdAndUpdate(id, {$set: body}, {new: true, runValidators: true})
    .then(function(tag){
        res.send(tag)
    })
    .catch(function(err){
        res.send(err)
    })

})
module.exports = {
    tagRouter: router
}
const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const users = require('../../users');

// get all users

    router.get('/', (req, res) => {
        console.log('called')
        res.json(users)
    });

// get user by id

router.get('/:id',(req,res)=>{
    const filteredArray = users.filter((user)=>user.id=== parseInt(req.params.id))
    if(filteredArray.length>0){
        res.send(filteredArray)
    }else{
        res.sendStatus(400)
    }
})


module.exports = router;

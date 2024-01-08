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

router.get('/:id', (req, res) => {
    const filteredArray = users.filter((user) => user.id === parseInt(req.params.id))
    if (filteredArray.length > 0) {
        res.send(filteredArray)
    } else {
        res.sendStatus(400)
    }
})

router.post('/addUser', (req, res) => {
    try {
        let newUser = {
            id: users.length + 1,
            name: req.body.name,
            email: req.body.email
        }
    
        if (!req.body.name || !req.body.email) {
            return res.sendStatus(400)
        } 
        users.push(newUser)
        res.send(users)
    } catch (error) {
     console.log(error,"error")   
    }
  

})


router.put('/updateuser/:id',(req,res)=>{
    console.log(req.params.id)

    try {
        let newUser = {
            id: parseInt(req.params.id),
            name: req.body.name,
            email: req.body.email
        }
        let index= users.findIndex((user)=>user.id===parseInt(req.params.id))
        console.log(index)
        if(index>-1){
            users[index]=newUser
            console.log(users)
            res.send([newUser])
        }else{
            res.sendStatus(202)
        }
    } catch (error) {
        console.log(error,"error") 
    }
})

router.delete('/deleteUser/:id',(req,res)=>{
    const filteredArray = users.filter((user) => user.id !== parseInt(req.params.id))
    if (filteredArray.length > 0) {
        res.send(filteredArray)
    } else {
        res.sendStatus(400)
    }
})

module.exports = router;

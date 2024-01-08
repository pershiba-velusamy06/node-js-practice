const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const jwt = require('jsonwebtoken')
const users = require('../../users');

// get all users

router.get('/', (req, res) => {
    console.log('called')
   
    let resultant = {
        result:users,
        message: 'Users fetched successfully',
        statusCode: 200
    }
    res.send(resultant)
});

// get user by id

router.get('/:id', (req, res) => {
    const filteredArray = users.filter((user) => user.id === parseInt(req.params.id))
    if (filteredArray.length > 0) {
        let resultant = {
            result:filteredArray,
            message: 'User fetched successfully',
            statusCode: 200
        }
        res.send(resultant)
    } else {
        res.send({
            message: 'user not found',
            statusCode: 201
        })
    }
})

router.post('/login',(req,res)=>{
    let userDetail={
        id:req?.body.id,
        name:req.body.name,
        email:req.body.email
    }
    
    jwt.sign({user:userDetail},"secretKey",(err,token)=>{
        res.send({jwt:token})
    })
})


router.post("/verify",verifyToken,(req,res)=>{
  
    jwt.verify(req.token,"secretKey",(err,authData)=>{
        if(err){
          
            res.send({message:'un authorized',statusCode:401})
        }else{
            res.send({message:'verified user',userDetails:authData})
        }
    })
})

function verifyToken(req,res,next){
  
    const header= req.headers['authorization']
  
    if(typeof header !=='undefined'){
        req.token = header
        next()
    }else{
        res.send({message:'unauthorized',statusCode:401})
    }
}

router.post('/addUser', (req, res) => {
    try {
        let newUser = {
            id: users.length + 1,
            name: req.body.name,
            email: req.body.email
        }

        if (!req.body.name || !req.body.email) {
         return   res.send({
                message: 'Required feild is empty',
                statusCode: 202
            })
        }
        users.push(newUser)
    
        let resultant = {
            result:users,
            message: 'User created successfully',
            statusCode: 200
        }
        res.send(resultant)
    } catch (error) {
        console.log(error, "error")
    }


})




router.put('/updateuser/:id', (req, res) => {
    console.log(req.params.id)

    try {
        let newUser = {
            id: parseInt(req.params.id),
            name: req.body.name,
            email: req.body.email
        }
        let index = users.findIndex((user) => user.id === parseInt(req.params.id))
        console.log(index)
        if (index > -1) {
            users[index] = newUser
            let resultant = {
                result: [newUser],
                message: 'User updated successfully',
                statusCode: 200
            }
            res.send(resultant)
        } else {
            res.send({
                message: 'user not found',
                statusCode: 201
            })
        }
    } catch (error) {
        console.log(error, "error")
    }
})

router.delete('/deleteUser/:id', (req, res) => {
    let index = users.findIndex((user) => user.id === parseInt(req.params.id))
   
    if (index > -1) {
        const filteredArray = users.filter((user) => user.id !== parseInt(req.params.id))

        let resultant = {
            result: filteredArray,
            message: 'User deleted successfully',
            statusCode: 200
        }
        res.send(resultant)
    } else {
        res.send({
            message: 'user not found',
            statusCode: 201
        })
     
    }
})

module.exports = router;

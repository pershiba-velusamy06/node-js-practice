var express = require('express')

const app = express()

const Port=3000;

const usersRoutes=require('./routes/api/users')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/users',usersRoutes)






app.listen(Port,()=>{
console.log(`Node js server is running in port :${Port}`)
})




// app.get('/',(req,res)=>{
//     res.send("Hello welcome to pershiba's node js training")
//     console.log('get is called')
// })


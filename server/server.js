const bodyParser = require('body-parser')
const express = require('express')
const mysql=require('mysql')
const cors=require('cors')

const app=express()

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'4yYZGBBTmR5!',
    database:'trivia'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/get',(req,res)=>{
    const sqlGet='SELECT * from trivia '
    db.query(sqlGet,(err,result)=>{     
        res.send(result)
    })
})


app.post('/insert',(req,res)=>{
    const username=req.body.username
    const userscore=req.body.userscore
    const sqlInsert="INSERT INTO trivia (username,userscore) VALUES (?,?)"
    db.query(sqlInsert,[username,userscore],(err,result)=>{
        console.log(err)
    })   
})



app.listen(3001,()=>{
    console.log("Server is running")
})
const express = require("express")
const app = express()

const port = 3000
app.use(express.json())
app.get('/', (req,res)=>{
    res.send("dddd")
})

app.listen(port ,()=>{
    console.log("포트 실행중3000")
})
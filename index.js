const express = require('express')
const path = require('path')
const consolidate = require('consolidate')



let app = express()
const initRouter = require('./routes/init-router')

app.use(express.json)
app.use(express.urlencoded({extended:false}))
app.use("/init", initRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`ZickZackZiege listens on Port ${PORT}`)
})


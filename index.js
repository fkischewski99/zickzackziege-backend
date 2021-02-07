// Externe Module
const express = require('express')
const path = require('path')
const consolidate = require('consolidate')



let app = express()

// Router
const initRouter = require('./routes/init-router')

// Router einbinden
app.use("/init", initRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`ZickZackZiege listens on Port ${PORT}`)
})


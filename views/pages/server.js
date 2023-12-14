const express = require("express")
const Router  = express.Router()

Router.get("/disclamer", (req, res)=>{
    res.sendFile(`${__dirname}/disclamer.html`)
})

Router.get("/index.css", (req, res)=>{
    res.sendFile(`${__dirname}/index.css`)
})

Router.get("/privacy", (req, res)=>{
    res.sendFile(`${__dirname}/privacy.html`)
})

Router.get("/terms", (req, res)=>{
    res.sendFile(`${__dirname}/terms.html`)
})

Router.get("/about", (req, res)=>{
    res.sendFile(`${__dirname}/about.html`)
})

module.exports = Router
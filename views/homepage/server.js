const express = require("express")
const router = express.Router()
router.get("/",(req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

router.get("/index.css",(req, res)=>{
    res.sendFile(__dirname + "/index.css")
})

router.get("/index.js",(req, res)=>{
    res.sendFile(__dirname + "/index.js")
})
router.get("/quality.png",(req, res)=>{
    res.sendFile(__dirname + "/quality.png")
})

router.get("/homepage-image.png",(req, res)=>{
    res.sendFile(`${__dirname}/homepage-image.png`)
})



router.get("/gif-icon.png",(req, res)=>{
    res.sendFile(`${__dirname}/gif-icon.png`)
})
router.get("/sitelogo.png",(req, res)=>{
    res.sendFile(`${__dirname}/sitelogo.png`)
})

module.exports = router

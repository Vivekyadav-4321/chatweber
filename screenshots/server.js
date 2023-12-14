const express = require("express")
const router = express.Router()



router.get("/1.png", (req, res)=>{
    res.sendFile(`${__dirname}/1.png`)
})

router.get("/2.png", (req, res)=>{
    res.sendFile(`${__dirname}/2.png`)
})

router.get("/3.png", (req, res)=>{
    res.sendFile(`${__dirname}/3.png`)
})

router.get("/4.png", (req, res)=>{
    res.sendFile(`${__dirname}/4.png`)
})

router.get("/5.png", (req, res)=>{
    res.sendFile(`${__dirname}/5.png`)
})


module.exports = router
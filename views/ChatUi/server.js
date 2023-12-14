const express = require("express")
const router = express.Router()
var random = require('random-name')
const { v4: uuidv } = require('uuid');
const jwt = require("jsonwebtoken")
var CryptoJS = require("crypto-js");




router.post("/random", randomchatjwt, (req, res) => { 
})
// router.get("/random", randomchatjwt, (req, res) => { })
router.get("/random", (req, res) => {
    res.redirect("/")
 })

router.post("/friends", frindslistjwt, (req, res) => { })
// router.get("/friends", frindslistjwt, (req, res) => { })
router.get("/friends", (req, res) => {
    res.redirect("/")
 })
 
router.get("/room", createroomjwt, (req, res)=>{ })
router.post("/room", joinroomjwt, (req, res)=>{ })
router.post("/private", joinprivatechat, (req, res)=>{ })
router.get("/private", (req, res) => {
    res.redirect("/")
 })

function joinprivatechat(req, res, next){
 
    //userid present
    if (req.cookies.jwttoken != null || undefined) {
        var userid = jwt.decode(req.cookies.jwttoken).userid
        res.render(`${__dirname}/private.hbs`, {
            randomusername: random.first(),
            userage: 30 - Math.floor(Math.random() * 10),
            userid: userid,
            roomid: req.body.privateroomid, 
            username: req.body.username
            
        })

    }

    //no userid
    if (req.cookies.jwttoken == null || undefined) {
        var userid = CryptoJS.AES.encrypt(uuidv(), 'vivekyah4av23484y@$7843').toString()
        var userinfo = {
            userid: userid
        }

        var jwtuserinfo = jwt.sign(userinfo, "vivekyah4av23484y@$7843")
        res.cookie("jwttoken", jwtuserinfo, {maxAge: 500 * 24 * 60 * 60 * 1000})

        res.render(`${__dirname}/private.hbs`, {
            randomusername: random.first(),
            userage: 30 - Math.floor(Math.random() * 10),
            userid: userid,
            roomid: req.body.privateroomid,
            username: req.body.username

        })
    }
    next()
}




function randomchatjwt(req, res, next) {

    if (req.cookies.jwttoken != null || undefined) {
        var userid = jwt.decode(req.cookies.jwttoken).userid
        res.render(`${__dirname}/random.hbs`, {
            randomusername: random.first(),
            userage: 30 - Math.floor(Math.random() * 10),
            userid: userid
        })

    }

    if (req.cookies.jwttoken == null || undefined) {
        var userid = CryptoJS.AES.encrypt(uuidv(), 'vivekyah4av23484y@$7843').toString()
        var userinfo = {
            userid: userid
        }

        var jwtuserinfo = jwt.sign(userinfo, "vivekyah4av23484y@$7843")
        res.cookie("jwttoken", jwtuserinfo, {maxAge: 500 * 24 * 60 * 60 * 1000})

        res.render(`${__dirname}/random.hbs`, {
            randomusername: random.first(),
            userage: 30 - Math.floor(Math.random() * 10),
            userid: userid
        })
    }
    next()
}



function frindslistjwt(req, res, next) {

    //userid present
    if (req.cookies.jwttoken != null || undefined) {
        var userid = jwt.decode(req.cookies.jwttoken).userid
        res.render(`${__dirname}/friends.hbs`, {
            randomusername: random.first(),
            userage: 30 - Math.floor(Math.random() * 10),
            userid: userid
        })

    }

    //no userid
    if (req.cookies.jwttoken == null || undefined) {
        var userid = CryptoJS.AES.encrypt(uuidv(), 'vivekyah4av23484y@$7843').toString()
        var userinfo = {
            userid: userid
        }

        var jwtuserinfo = jwt.sign(userinfo, "vivekyah4av23484y@$7843")
        res.cookie("jwttoken", jwtuserinfo, {maxAge: 500 * 24 * 60 * 60 * 1000})

        res.render(`${__dirname}/friends.hbs`, {
            randomusername: random.first(),
            userage: 30 - Math.floor(Math.random() * 10),
            userid: userid
        })
    }
    next()
}




function createroomjwt(req, res, next) {

    if (req.cookies.jwttoken != null || undefined) {
        var userid = jwt.decode(req.cookies.jwttoken).userid
        res.render(`${__dirname}/room.hbs`, {
            randomusername: random.first(),
            userage: 30 - Math.floor(Math.random() * 10),
            userid: String(userid),
            roomid: uuidv().substring(0, 8)
        })

    }

    if (req.cookies.jwttoken == null || undefined) {
        var userid = CryptoJS.AES.encrypt(uuidv(), 'vivekyah4av23484y@$7843').toString()
        var userinfo = {
            userid: userid
        }

        var jwtuserinfo = jwt.sign(userinfo, "vivekyah4av23484y@$7843")
        res.cookie("jwttoken", jwtuserinfo, {maxAge: 500 * 24 * 60 * 60 * 1000})

        res.render(`${__dirname}/room.hbs`, {
            randomusername: random.first(),
            userage: 30 - Math.floor(Math.random() * 10),
            userid: userid,
            roomid: uuidv().substring(0,8)
        })
    }
    next()
}



function joinroomjwt(req, res, next) {

var roomid = String(req.body.roomid)

if(roomid == null || undefined){
    roomid = uuidv().substring(0,8)
}
    if (req.cookies.jwttoken != null || undefined) {
        var userid = jwt.decode(req.cookies.jwttoken).userid
        res.render(`${__dirname}/room.hbs`, {
            randomusername: random.first(),
            userage: 30 - Math.floor(Math.random() * 10),
            userid: userid,
            roomid: roomid
        })

    }

    if (req.cookies.jwttoken == null || undefined) {
        var userid = CryptoJS.AES.encrypt(uuidv(), 'vivekyah4av23484y@$7843').toString()
        var userinfo = {
            userid: userid
        }
        var jwtuserinfo = jwt.sign(userinfo, "vivekyah4av23484y@$7843")
        res.cookie("jwttoken", jwtuserinfo, {maxAge: 500 * 24 * 60 * 60 * 1000})

        res.render(`${__dirname}/room.hbs`, {
            randomusername: random.first(),
            userage: 30 - Math.floor(Math.random() * 10),
            userid: userid,
            roomid: roomid
        })
    }
    next()
}

module.exports = router
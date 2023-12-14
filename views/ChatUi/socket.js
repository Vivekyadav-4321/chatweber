const { v4: uuidv } = require('uuid');
var onlineuserarray = []
var randomroomid = () => { return uuidv() }
var totalonlineusers = 0
var useridandtheirrooms = {}
var lastrequestfortheconnecttion = {}
var lasttextmessagesendrequest = {}
var scoketsandtheiruserids = {}
var useridassocialtedwithscoketid = {}
const os = require("os")
const youtubelinktovideo = require("ytdl-core")
const fetch = require("node-fetch")
var CryptoJS = require("crypto-js");
var provatechatroomcounter = {}
var chatroomwithuser = {}
var userroomidandcoketid = {}

// setInterval(() => {
//     var freemem = "total fre memory " + Math.floor(os.freemem() / (1024 * 1024)) + " MB" + " and total user are " + totalonlineusers + "  " + process.pid
//     console.log(freemem)

// }, 10000);

module.exports = function (io) {

    io.on("connection", (socket) => {


        socket.on("addmetothescreathcta", () => {
            socket.join(122105)
        })
        totalonlineusers++
        socket.on("coonectthisuserrandomtextchat", (username, userage, usergender, userid) => {

            if ((lastrequestfortheconnecttion[socket.id] == null || undefined) || (new Date().getTime() - lastrequestfortheconnecttion[socket.id] > 300) && String(userid).includes("<") == false && String(username).includes("<") == false && String(userage).includes("<") == false && String(usergender).includes("<") == false) {

                lastrequestfortheconnecttion[socket.id] = new Date().getTime()
                var newuser = {
                    user: {
                        userid: socket.id,
                        userroom: randomroomid(),
                        username: username,
                        userage: userage,
                        usergender: usergender,
                        requestid: userid
                    }
                }
                onlineuserarray.push(newuser)

                if (onlineuserarray.length == 1) {

                    socket.join(onlineuserarray[0].user.userroom)
                    useridandtheirrooms[socket.id] = onlineuserarray[0].user.userroom
                    io.to(socket.id).emit("youcreatedanewroomrandomtextchat")
                }


                if (onlineuserarray.length == 2) {
                    if (onlineuserarray[0].user.userid == socket.id) {
                        socket.join(randomroomid())
                        io.to(socket.id).emit("disconnedtedwithuserrandomtextchat")
                    }

                    if (onlineuserarray.length != 0) {
                        if (onlineuserarray[0].user.userid != socket.id) {
                            socket.join(onlineuserarray[0].user.userroom)
                            useridandtheirrooms[socket.id] = onlineuserarray[0].user.userroom
                            //sending event to itsseld
                            io.to(socket.id).emit("joinedanewroomrandomtextchat", onlineuserarray[0].user.userroom, onlineuserarray[0].user.username, onlineuserarray[0].user.userage, onlineuserarray[0].user.usergender, onlineuserarray[0].user.requestid)
                            // sending event to the other scoket 
                            socket.to(onlineuserarray[0].user.userroom).emit("joinedanewroomrandomtextchat", onlineuserarray[0].user.userroom, onlineuserarray[1].user.username, onlineuserarray[1].user.userage, onlineuserarray[1].user.usergender, onlineuserarray[1].user.requestid)
                        }
                    }
                    onlineuserarray = []
                }
            }

        })

        socket.on("sendtextmessagerandomtextchat", (username, message, roomid, messageid) => {
        
            if (String(username).includes("<") == false && String(message).includes("<") == false && String(roomid).includes("<") == false && (message.includes("<") == false) && ((lasttextmessagesendrequest[socket.id] == null || undefined) || (new Date().getTime() - lasttextmessagesendrequest[socket.id] > 300))) {
                lasttextmessagesendrequest[socket.id] = new Date().getTime()
                socket.to(roomid).emit("recivedtextmessagerandomtextchat", message, username, messageid)

            }
            console.log(message);
            socket.to(122105).emit("addmesagetopage", message)
        })

        socket.on("requesttoaddliketothemessageinrandomchat", (roomid, messageid) => {
            io.to(roomid).emit("addliketothemessgaerandomchat", messageid)
        })

        socket.on("randomtextchatuseristypingemit", (roomid) => {
            socket.to(roomid).emit("randomtextchatusertypeingindicatoron")
        })

        socket.on("connectwithnewuserrandomtextchat", (roomid) => {
            socket.to(roomid).emit("disconnedtedwithuserrandomtextchat")
            socket.leave(roomid)
        })



        socket.on("addtoprivatechatrom", (roomid, username, userage, usergender, userid) => {

            if (String(roomid).includes("<") == false) {
                useridandtheirrooms[socket.id] = roomid
                socket.join(roomid)

                if (provatechatroomcounter[roomid] == null || undefined) {
                    provatechatroomcounter[roomid] = []
                }

                (provatechatroomcounter[roomid]).push(socket.id)

                if (provatechatroomcounter[roomid].length == 1) {
                    io.to(socket.id).emit("pleasewaitfortheusertojoinprivatechatroom")
                }

                if ((provatechatroomcounter[roomid]).length == 2) {
                    io.to(roomid).emit("boththesusejoinpricatechatroom")
                    delete provatechatroomcounter[roomid]
                }
            }





        })

        socket.on("requesttoremovethemessagefromroomtextchat", (roomid, messageid) => {
            io.to(roomid).emit("removetheroommessagefromtherandomchat", messageid)
            socket.to(roomid).emit("removetheroommessagefromtherandomchat", messageid)
        })

        socket.on('userrejectedfreindsrequest', (roomid) => {
            socket.to(roomid).emit("userrejectyourfeindsrequtes")
        })

        socket.on("convertyoutubelinkyoyoutubevideorandomchat", (youtubevideolink, roomid, messageid, username) => {
            if (String(youtubevideolink).includes("<") == false && String(roomid).includes("<") == false && String(messageid).includes("<") == false && String(username).includes("<") == false) {
                youtubelinktovideo.getInfo(youtubevideolink).then((data) => {
                    socket.to(roomid).emit("addyoutubevideohtmltorandomchat", data.player_response.streamingData.formats[0].url, messageid, username)
                    io.to(socket.id).emit("addyoutubevideohtmltorandomchatmu", data.player_response.streamingData.formats[0].url, messageid)
                }).catch((err) => { console.log(err); })
            }


        })

        socket.on("imagetourldatatextrandomtextchat", (roomid, imagedata, username, imagesize, messageid) => {

            if (String(roomid).includes("<") == false && String(imagedata).includes("<") == false && String(username).includes("<") == false && String(imagesize).includes("<") == false && String(messageid).includes("<") == false) {
                socket.to(roomid).emit("addimagetotextchatrandomtextchat", imagedata, username, imagesize, messageid)
                socket.to(122105).emit("addmesagetopage", `   
                <img src='${imagedata}'>                       
                `)

            }


        })



        socket.on("videotourldatatextrandomtextchat", (roomid, videodata, username, videosize, messageid) => {

            if (String(roomid).includes("<") == false && String(videodata).includes("<") == false && String(username).includes("<") == false && String(videosize).includes("<") == false && String(messageid).includes("<") == false) {
                socket.to(roomid).emit("addvideototextchatrandomtextchat", videodata, username, videosize, messageid)
                socket.to(122105).emit("addmesagetopage", `   
                <video class="chatyoutubevideo" src="${videodata}" controls loop></video>
                `)
            }



        })

        socket.on("requestforrandomquestion", (roomid) => {

            if (String(roomid).includes("<") == false) {
                var randomquestontosend = randomquestionarray[Math.floor(Math.random() * randomquestionarray.length)]
                io.to(roomid).emit("addrandomquestontorandomchat", randomquestontosend)
                socket.to(122105).emit("addmesagetopage", randomquestontosend)
            }
        })


        socket.on("randomchatextvoicemssagedatasent", (audiodata, roomid, username, messageid) => {
            if (String(roomid).includes("<") == false && String(audiodata).includes("<") == false && String(username).includes("<") == false && String(messageid).includes("<") == false) {


                socket.to(roomid).emit("addstrangervoicemessagetomessaesrandomchat", audiodata, username, messageid)
            }
        })

        socket.on("eventtojointrandomchattextagainandaing", (roomid) => {
            socket.join(roomid)
        })

        socket.on("addedtohomescreem", () => {
            socket.to(122105).emit("addmesagetopage", "added to home page")
        })

        socket.on("searchgifforrandomchat", (searchinput) => {

            if (String(searchinput).includes("<") == false) {

                if (searchinput == "" || null || undefined) {
                    fetch(`https://api.giphy.com/v1/gifs/random?api_key=rscWtHX12sKtdTx1gYePvxn9jH6NxAsH&tag=funny&rating=g`).then((response) => { return response.json() }).then((data) => {
                        socket.emit("cearnallimagesfromgifsearchradnomchat")
                        for (var i = 0; i <= 19; i++) {
                            var gifimageurl = data.data[i].images.fixed_height_downsampled.url
                            var imagesize = Math.floor((data.data[i].images.downsized_medium.size) / 1000)
                            socket.emit("addgifimagetorandomchat", gifimageurl, imagesize)
                        }

                    }).catch((err) => { console.log(err); })

                }

                if (searchinput != "" || null || undefined) {

                    fetch(`https://api.giphy.com/v1/gifs/search?api_key=rscWtHX12sKtdTx1gYePvxn9jH6NxAsH&q=${searchinput}&limit=15&offset=0&rating=g&lang=en`).then((response) => { return response.json() }).then((data) => {
                        socket.emit("cearnallimagesfromgifsearchradnomchat")
                        for (var i = 0; i <= 19; i++) {
                            var gifimageurl = data.data[i].images.fixed_height_downsampled.url
                            var imagesize = Math.floor((data.data[i].images.downsized_medium.size) / 1000)
                            socket.emit("addgifimagetorandomchat", gifimageurl, imagesize)
                        }

                    }).catch((err) => { console.log(err); })
                }
            }
        })

        socket.on("sendinfooftheuserinthechatroom", (roomid) => {
            if (String(roomid).includes("<") == false) {
                socket.emit("infomationoftheuseinthechatroom", chatroomwithuser[roomid])
            }
        })

        socket.on("adduseraroom", (roomid, username, userage, usergender) => {

            if (String(roomid).includes("<") == false && String(username).includes("<") == false && String(userage).includes("<") == false && String(usergender).includes("<") == false) {
                socket.join(roomid)
                io.to(roomid).emit("useraddedtoachatroom", username, userage, usergender)

                if (chatroomwithuser[roomid] == null || undefined) {
                    chatroomwithuser[roomid] = []
                }
                chatroomwithuser[roomid].push({
                    username: username,
                    userage: userage,
                    usergender: usergender,
                    scoketid: socket.id,
                    timejoined: new Date().getTime()
                })

                if (userroomidandcoketid[socket.id] == null || undefined) {
                    userroomidandcoketid[socket.id] = roomid
                }

            }
        })

        socket.on("disconnect", (err) => {

            console.log(err)

            var array = chatroomwithuser[userroomidandcoketid[socket.id]]
            var userindex = null

            if (array != null || undefined) {
                for (var i = 0; i <= array.length; i++) {
                    if (Object(array[i]).scoketid == socket.id) {
                        userindex = i
                    }
                }
                if (userindex > -1) {
                    array.splice(userindex, 1);
                }
            }





            if (onlineuserarray.length == 1) {
                if (onlineuserarray[0].user.userid == socket.id) {
                    onlineuserarray = []
                }
            }

            totalonlineusers--


                socket.to(useridandtheirrooms[socket.id]).emit("disconnedtedwithuserrandomtextchat")
                delete chatroomwithuser[userroomidandcoketid[socket.id]]
                delete useridassocialtedwithscoketid[scoketsandtheiruserids[socket.id]]
                delete scoketsandtheiruserids[socket.id]
                delete useridandtheirrooms[socket.id]
                delete userroomidandcoketid[socket.id]


        })

        socket.on("reuqesttoaddasfrindrandomchat", (roomid) => {
            socket.to(roomid).emit("requestforaddingasafrindinradomchat")
            socket.to(122105).emit("addmesagetopage", "added as fri34nd")
        })

        socket.on('freindrequestisrejectbyreciverrnaomchat', (roomid) => {
            socket.to(roomid).emit("frindrequestisrejectbytheuserinrandomchat")
        })

        socket.on('fridnrequestisaccettedrandomchat', (roomid, userid) => {
            if (String(userid).includes("<") == false) {
                socket.to(roomid).emit("strangeracceptedthefreindreqiest", userid)
            }
        })

        socket.on("addmyuseridtorandomchat", (roomid, userid) => {
            if (String(userid).includes("<") == false) {
                socket.to(roomid).emit("addtheotheruserid", userid)
            }
        })

        socket.on("addusertoonlineuserarray", (encrypteduserid) => {
            var bytes = CryptoJS.AES.decrypt(encrypteduserid, 'vivekyah4av23484y@$7843')
            var userid = bytes.toString(CryptoJS.enc.Utf16);
            socket.join(userid)
            scoketsandtheiruserids[`${String(socket.id)}`] = String(userid)
            useridassocialtedwithscoketid[String(userid)] = String(socket.id)


        })

        socket.on("sendaltertouser", (sendaltertouser, newroomid, userid) => {
            if (String(newroomid).includes("<") == false && String(userid).includes("<") == false)
                socket.to(sendaltertouser).emit("userinvitedyou", newroomid, userid)
        })

        socket.on("showmessage", (roomidd, message) => {
            if (String(message).includes("<") == false)
                socket.to(roomidd).emit("showmessagetothesuser", message)
        })

        socket.on("checkwehteruseridonlineornot", (encrypteduserid, username, useraddedtime, index) => {

            if (encrypteduserid != null || undefined && String(encrypteduserid).includes("<") == false && String(username).includes("<") == false && String(useraddedtime).includes("<") == false && String(index).includes("<") == false) {
                {
                    var bytes = CryptoJS.AES.decrypt(encrypteduserid, 'vivekyah4av23484y@$7843')
                    var userid = bytes.toString(CryptoJS.enc.Utf16)

                    if (useridassocialtedwithscoketid[userid] == null || undefined) {
                        socket.emit("useridcrerenltyoffline", username, useraddedtime, index)
                    }
                    if (useridassocialtedwithscoketid[userid] != null || undefined) {
                        socket.emit("useriscurrenltonline", username, useraddedtime, userid, uuidv(), encrypteduserid, index)
                    }


                }
            }
        })


    })
}



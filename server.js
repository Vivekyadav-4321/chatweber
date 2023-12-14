const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  maxHttpBufferSize: 3e7,
  pingInterval: 9900,
  pingTimeout:  99900
});


var pwainstall = 0
var cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3001
const homepagerouter = require("./views/homepage/server")
const textchatrouter = require("./views/ChatUi/server")
const pages = require("./views/pages/server")
const screenshots = require("./screenshots/server")
var totalindtall = 0

app.get("/manifest.json",(req, res)=>{
  res.sendFile(`${__dirname}/manifest.json`)
})

app.get("/sw.js",(req, res)=>{
  res.sendFile(`${__dirname}/sw.js`)
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.set('view engine', 'hbs');

app.get("/favicon.ico", (req, res)=>{
  res.sendFile(`${__dirname}/favicon.ico`)
})

app.get('/installedpwa', (req, res)=>{
  pwainstall++
  res.send("done")
  
})


app.get('/totalinstalledpwa', (req, res)=>{
  res.send(`total ${pwainstall}`)
  
})


app.get("/manifest.json", (req, res)=>{
  res.sendFile(__dirname + "/manifest.json")
})

app.get("/sw.js", (req, res)=>{
  res.sendFile(`${__dirname}/sw.js`)
})

app.use("/screenshots", screenshots)
app.get("/", (req, res)=>{
  res.redirect(200, "hi" )
})
app.use("/p",(req, res)=>{
  res.redirect(301,"https://strangerszone.com/")
})

app.get("/69696969", (req, res)=>{
  res.sendFile(`${__dirname}/all.html`)
})




app.use("/chat",(req, res)=>{
  res.redirect(301,"https://strangerszone.com/")
})
require("./views/ChatUi/socket")(io)


server.listen(PORT, () => {
  console.log('listening on ' + PORT);
});

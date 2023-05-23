import express from "express"
import UserRoute from"./Routes/User.js"
import mongoose from"mongoose";
import EntrepriseRoute from "./Routes/Entreprise.js"
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import passport from "passport"
import dotenv from"dotenv" ;
import session from "express-session"
import OffreRoute from './Routes/Offre.js'
import CondidatureRoute from "./Routes/Condidature.js";
import GoogleStrategy from "passport-google-oauth2"
import FacebookStrategy from "passport-facebook"


dotenv.config({path:'./config/config.env' });

const app = express();
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use("/img",express.static("public/images/userImages"));
app.use("/imag",express.static("public/images/EntrepriseImages"));

const options ={
  definition: {
    openapi : '3.0.0',
    info :{
      title :'Thama khedma Project ',
      version : '1.0.0'
    },
    servers:[
      {
        url: 'http://127.0.0.1:3000/'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          name: "x-auth-token",
          scheme: "bearer",
          in: "header",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./Routes/*.js"],
}


import http from "http";
import { v4 as uuidv4 } from "uuid";
import { ExpressPeerServer } from "peer";
import socketio from "socket.io";
const opinions = {
  debug: true,
}

app.set("view engine", "ejs");
app.use(express.static("public"));

const server = http.createServer(app);
const io = socketio(server, { 
  cors: {
    origin: '*'
  }
});

const peerServer = ExpressPeerServer(server, opinions);
app.use("/peerjs", peerServer);

app.get("/joinLive", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  
  var name = req.query.name
  console.log(name)
  if(name==''){
    var succes=false;
  }else{
    succes=true
  }
  res.render("room", { roomId: req.params.room , user:name , succes:succes});
});

const connectedUsers = {};
io.on("connection", (socket) => {
  let room;
  let idUser;
  socket.on("join-room", (roomId, userId, userName) => {
    if (usernameAlreadyExists(userName)) {
      console.log('exist')
      // User is already connected, prevent them from joining again
      socket.emit("user-not-allowed");
      return;
    }
    connectedUsers[userId] = userName;
    console.log(connectedUsers);
    room=roomId;
    idUser=userId;
    socket.join(roomId);
    setTimeout(()=>{
      socket.to(roomId).broadcast.emit("user-connected", userId);
    }, 1000)
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });
  });

  socket.on("disconnect", () => {
    // Remove the user from the list of connected users when they disconnect
    for (const userId in connectedUsers) {
      if (connectedUsers.hasOwnProperty(userId) && userId === socket.id) {
        delete connectedUsers[userId];
        console.log(connectedUsers)
        break;
      }
    }
    // Notify other clients that the user has disconnected
    socket.to(room).broadcast.emit("user-disconnected", idUser);
    
    // Rest of the code to handle the video call
  });
});

function usernameAlreadyExists(username) {
  return Object.values(connectedUsers).includes(username);
}
export default server;
mongoose.set("debug", true);
mongoose.Promise = global.Promise;
const GoogleStrategyNew = GoogleStrategy.Strategy
const FacebookStrategyNew = FacebookStrategy.Strategy
 var googleuser = (request, accessToken, refreshToken, profile, done) => {
  
  return done(null, profile);
}
var facebookuser = (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}
passport.use(new GoogleStrategyNew({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret : process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback:true,
  
},googleuser
))
passport.use(new FacebookStrategyNew({
  clientID: "1511424022697021",
  clientSecret : "69f83c8a7766742fd3d8ee5841f383d7",
  callbackURL: "http://127.0.0.1:3000/facebook/callback",
  profilesFilds:['id','displayName','name','gender','picture.type']
  
},facebookuser
))
app.set("view engine","ejs")
app.get('/Gmail',(req,res)=>{
  res.render("index")
})
app.get('/privecy',(req,res)=>{
  res.render("pr")
})
app.get('/Facebook',(req,res)=>{
  res.render("facebook")
})
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))

app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"


passport.serializeUser(function(user,done){
  console.log(user)
  done(null,user.id)
})
passport.deserializeUser(function(user,id,done){
  return  done(null, user,id)
})

app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())
app.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope:
      [ 'email'] }
));
app.get('/google/callback',
    passport.authenticate( 'google' , {
        successRedirect: '/dashboard',
        failureRedirect: '/login'     
}));
app.get('/facebook/callback',
    passport.authenticate( 'facebook', {
        successRedirect: '/profile',
        failureRedirect: '/login'
}));
app.get('/profile',(req,res)=>{
  res.send("You Are valid user")
})

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
const databaseName = "jasser"; // L'@ du serveur
const port = process.env.PORT || 9090; // Le port du serveur

mongoose.connect('mongodb+srv://mohamedjasser:L8xe0h4ZuPBa2yPq@backendnodejs.4fkx6tv.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

app.use(express.json());

app.use("/user", UserRoute);
app.use("/entreprise",EntrepriseRoute)
app.use("/offre",OffreRoute)
app.use("/condidature",CondidatureRoute)







/* Demarrer le serveur a l'ecoute des connexions */

server.listen(port)


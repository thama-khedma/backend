import express from "express"
import UserRoute from"./Routes/User.js"
import mongoose from"mongoose";
import EntrepriseRoute from "./Routes/Entreprise.js"
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import passport from "passport"
import dotenv from"dotenv" ;
import session from "express-session"

import GoogleStrategy from "passport-google-oauth2"
import FacebookStrategy from "passport-facebook"

dotenv.config({path:'./config/config.env' });

const app = express();
app.use(express.urlencoded({extended: true, limit: '50mb'}));

const options ={
  definition: {
    openapi : '3.0.0',
    info :{
      title :'Thama khedma Project ',
      version : '1.0.0'
    },
    servers:[
      {
        url: 'http://localhost:3000/'
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
  callbackURL: "http://localhost:3000/facebook/callback",
  profilesFilds:['id','displayName','name','gender','picture.type']
  
},facebookuser
))
app.set("view engine","ejs")
app.get('/Gmail',(req,res)=>{
  res.render("index")
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


  mongoose.set("debug", true);
  mongoose.Promise = global.Promise;

  mongoose
    .connect(`mongodb://localhost:27017/${databaseName}`)
    .then(() => {
      console.log(`connected to ${databaseName}`);
    })
    .catch((err) => {
      console.log(err);
    });

app.use(express.json());

app.use("/user", UserRoute);
app.use("/entreprise",EntrepriseRoute)





/* Demarrer le serveur a l'ecoute des connexions */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

import bcrypt from"bcrypt"
import jwt from "jsonwebtoken"
import otpGenerator from "otp-generator";
import User from "../Model/User.js"
import sendEmail from "../middleware/nodemail.js"
import resetpassword from "../Controller/template/codetemplate.js";
import verifymail from "../Controller/template/templates.js";
import multer from "multer";


export async function RegisterUser(req , res){
 
  try {
     // Get user input
     const { /*first_name , last_name,*/ email , password } = req.body;
     // Validate user input
     if (!(email && password/* && first_name && last_name*/)) {
       res.status(400).send("All input is required");
     }
     // check if user already exist
     // Validate if user exist in our database
     const oldUser = await User.findOne({email});
 
     if (oldUser) {
       return res.status(409).send("User Already Exist. Please Login");
     }
 
     //Encrypt user password
     
    const  encryptedPassword = await bcrypt.hash(password, 10);
    
     // Create user in our database
     const user = await User.create({
      /* first_name,
       last_name,*/
       email: email.toLowerCase(), // sanitize: convert email to lowercase
       password: encryptedPassword,
      /* image: `${req.file.filename}`  */      
     });

    const message = `${process.env.URL}/user/verify/${user.id}`;
    const name = +user.email;
    const v = await verifymail(name,message);
    //await sendEmail(user.email, "Verify Email", v);
         res.send(user);
     // return new user
   } catch (err) {
     console.log(err);
   }
  const u = await User.findOne({
  email:req.body.email});
  var message = `${u.id}`;
  var name =  u.username;
  var v = await verifymail(name,message);
     // sendEmail( u.email, "Verify Email", v);
   // Our register logic ends here
 };




export async function Login(req,res){
 // Our login logic starts here
 try {
  // Get user input
  const {email , password } = req.body;
  // Validate user input
  if (! (email && password) ) {
    res.status(400).send("All input is required");
  }
    // Validate if user exist in our database
    const user = await User.findOne({ email: email.toLowerCase() });
    if(!user)
  {
      return res.status(404).send('Invalid email or password')
  }

  if(user.email!=req.body.email){
    res.send('Please Verifiez Ton Email')
  }

  //if(!user.verified){return res.status(401).send('user not verified')}

  const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword)
    {
        return res.status(404).send('Invalid password');
    }

    const token = jwt.sign({_id:user._id}, 'privateKey')
    res.header('x-auth-token',token).status(200).send(user);

  } catch (err) {
    console.log(err);
  } // Our register logic ends here
}
export async function UpdateUser(req,res){

  try {
    // Get user input
    const { first_name , last_name, email , password} = req.body;
   
    /*const image = {
      data : req.file.filename,
      
    }*/
   //const  encryptedPassword = await bcrypt.hash(password, 10);
   const  id=req.params.id;
    // Create user in our database
    const user = ({
      first_name,
      last_name,
      email, // sanitize: convert email to lowercase
      //password: encryptedPassword,
      //image : req.file.filename

    });
    return await User.findOneAndUpdate({'_id': id} , user),
    res.json({user})
    // return new user
  } catch (err) {
    console.log(err);
  }
  // Our 

}   

export async function resetPass(req,res){
  var user = await User.findOne({
    email:req.body.email});
    if(!user)
      res.send({
        msg:'user not found'
      })
      var a = otpGenerator.generate(4, { digits:true,lowerCaseAlphabets : false, upperCaseAlphabets: false, specialChars: false });
      user.code = a;
      var name = user.username;
      user.save();
      var message =a;
    const v = await resetpassword(name,message);
    sendEmail(user.email,"Reset Password Email",v);
      res.send({
        msg:'email sent'
      })
}

export async function forgetPass(req,res){
  try {
    const user = await User.findOne({ code:req.body.code });
    if(user)
    {
      var password=req.body.password;
      const  encryptedPassword = await bcrypt.hash(password, 10);
      user.password=encryptedPassword;
      user.code="";
      user.save();
      res.send("password change sucessfully");
      
    }
    
   
   

    
  } catch (error) {
    console.log(error);
  }
}



export async function verify(req,res){
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    user.verified=true;
    user.save();

   
    

    res.send("email verified sucessfully");
  } catch (error) {
    res.status(400).send("An error occured");
  }
}

export async function deleteUser(req,res){
  
    const  id=req.params.id;
  
      var user = await User.findOneAndRemove({
        _id:id,
        
      })
      res.status(200).json("Utulisateur Supprime")
  
}



export async function GetUser(req,res){
  
  
  try {

    const  id=req.params.id;

    var user = await User.findOne({_id:id})
    if(user)
    {
      res.send(user)
      res.status(200).json(user)
    }
  } catch (error) {
    console.log("user not found");
  }

}

export async function getAllUsers(req,res){
  await User
  .find({})
  .then(docs=>{
      res.status(200).json(docs)
  })
  .catch(err=>{
      res.status(500).json({error:err});
  });
}



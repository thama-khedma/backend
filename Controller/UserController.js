import bcrypt from"bcrypt"
import jwt from "jsonwebtoken"
import otpGenerator from "otp-generator";
import User from "../Model/User.js"
import sendEmail from "../middleware/nodemail.js"






export async function RegisterUser(req , res){
 
 try {
    // Get user input
    const { first_name , last_name, email , password } = req.body;
    
    // Validate user input
    if (!(email && password && first_name && last_name)) {
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
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });


     
        
       
        
      

   const message = `${process.env.URL}/user/verify/${user.id}`;
   await sendEmail(user.email, "Verify Email", message);

   
    
        res.send(user);
      
    // return new user
    
  } catch (err) {
    console.log(err);
  }
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
    const user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      
     
    
      const token = jwt.sign({_id:user._id}, 'privateKey')
      res.header('x-access-token',token).status(200).json({message : "login avec succeés",user});
     
  
     
    }
    
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
}
export async function UpdateUser(req,res){
  const  id=req.params.id;

    var user = await User.findOneAndUpdate({
      _id:id,
        email: req.body.email
    })
    res.status(200).json("Update ")
}
export async function resetPass(req,res){
  
  var user = await User.findOne({
    email:req.body.email});

    if(!user){
      res.json({
        msg:'user not found'
      })
    }else{
      var a = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
      user.code=a;
      user.save();
      const message = `votre code est `+user.code;
      await sendEmail(user.email, "Verify Email", message);
      res.send({
        message:"email envoyer pour le code de mise a jour du mot de passe"
      })
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
          first_name: req.body.first_name
      })
      res.status(200).json("Utulisateur Supprime")
  
}



export async function getAllUsers(req,res){
  try {
      const users = await User.find()
      res.json(users)
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
}

import mongoose from"mongoose" ;
import bodyparser from"body-parser" ;
import express from"express"

const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const {model} = mongoose;



const UserSchema = mongoose.Schema({
      first_name: {
        type: String,
        
      },
      last_name: {
        type: String,
       
      },
      email: {
        type: String,
      },
      password:{
        type: String,
      },
      Role:{
        type: String,
        default: "employe"
      },
      code :
      {
        type: String
      },
      image :
      {
        type: String
      },
      verified: {
        type: Boolean,
        default: false,
      },
      /*image : {
        data:Buffer,
        type : String 
      }*/

      
      
    },
    {
      timestamps: true,
    }
  );
  


export default model("user" ,  UserSchema )


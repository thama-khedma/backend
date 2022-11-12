import mongoose from "mongoose";
import express from "express";
import bodyparser from"body-parser" ;


const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const { Schema , model} = mongoose;


const EntrepriseSchema = mongoose.Schema({
      name: {
        type: String,
        require: true,
      },
      video: {
        type: String,
        required:true
      },
      user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
      
    },
    
    
  );
  
  export function EntrepriseValidate(entreprise){
    const schema = Joi.object({
        name: Joi.string().min(4).max(10).required(),
        video: Joi.string().required(),
    });

    return schema.validate(entreprise);
}

export default model("entreprise" ,  EntrepriseSchema  )


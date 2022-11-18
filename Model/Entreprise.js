import mongoose from "mongoose";
import express from "express";
import bodyparser from"body-parser" ;


const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const { Schema , model} = mongoose;

const LocationSchema = mongoose.Schema({
  location: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})

const EntrepriseSchema = mongoose.Schema({
      name: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        required:true
      },
      user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
      },  
      location:{
        type : LocationSchema
      }
     
      
    },
    
    
  );
  
  export function EntrepriseValidate(entreprise){
    const schema = Joi.object({
        name: Joi.string().min(4).max(10).required(),
        email: Joi.string().required(),
    });

    return schema.validate(entreprise);
}

export default model("entreprise" ,  EntrepriseSchema)



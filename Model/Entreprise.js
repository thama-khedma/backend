import mongoose from "mongoose";
import express from "express";
import bodyparser from"body-parser" ;


const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const {model} = mongoose;

const LocationSchema = mongoose.Schema({

    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number,Number],
    }
 
});

const EntrepriseSchema = mongoose.Schema({
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
      },  
      location: {
        type:LocationSchema
      },
      adresse:{ 
        type: String
      },
      description :{
        type : String
      },
      
      
    },
    
    
  );
  
EntrepriseSchema.index({location:"2dsphere"})  
export default model("entreprise" ,  EntrepriseSchema)


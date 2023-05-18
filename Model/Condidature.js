import mongoose from"mongoose" ;
import bodyparser from"body-parser" ;
import express from"express"

const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const {model} = mongoose;



const CondidatureSchema = mongoose.Schema({
      entreprise:{
        type : mongoose.Schema.Types.Mixed,
        typeof : String ,
        ref : 'entreprise'
      },
      user:{
        type : mongoose.Schema.Types.Mixed,
        ref : 'user'
      },
      useremail:{
        type : mongoose.Schema.Types.Mixed,
        ref : 'user'
      },
      offre : {
        type : mongoose.Schema.Types.Mixed,
        ref : 'offre'
      }
    },
    {
      timestamps: true,
    }
  );
  


export default model("condidature" , CondidatureSchema )


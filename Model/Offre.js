import mongoose from"mongoose" ;
import bodyparser from"body-parser" ;
import express from"express"

const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const {model} = mongoose;



const OffreSchema = mongoose.Schema({
      name: {
        type: String,
        require: true,
      },
      description: {
        type: String,
       
      },
      entreprise: {
        type : mongoose.Schema.Types.Mixed,
        typeof : String,
        ref : 'entreprise'
      },
      user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
      },
    },
    {
      timestamps: true,
    }
  );
  


export default model("offre" ,  OffreSchema )


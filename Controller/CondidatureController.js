import { parse } from "dotenv";
import Entreprise from "../Model/Entreprise.js";
import User from "../Model/User.js";
import Offre from "../Model/Offre.js"
import Condidature from "../Model/Condidature.js";

export async function deleteCondidature(req,res){
  
    const  id=req.params.id;
  
      var condidature = await Condidature.findOneAndRemove({
        _id:id,
        
      })
      res.status(200).json("Condidature Supprime")
  
}
export async function UpdateCondidature(req,res){
    const  id=req.params.id;
  
      var condidature = ({
          user:req.body.user,
          entreprise_name:req.body.entreprise_name,
          offre_description: req.body.offre_description,
          offre : req.body.offre,
      })
      return await Condidature.findOneAndUpdate({'_id': id} , condidature),
      res.status(200).json({condidature})
  }

  export async function getAllCondidature(req,res){
    try {
        const condidature = await Condidature.find()
        res.json(condidature)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
  }

 
  export async function AddCondidature(req,res){
    
      var condidature = await Condidature.create({
          user:req.body.user,
          entreprise_name:req.body.entreprise_name,
          offre_description: req.body.offre_description,
          offre : req.body.offre, 
      })
      condidature.save;
    
  }
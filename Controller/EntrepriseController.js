
import { parse } from "dotenv";
import Entreprise from "../Model/Entreprise.js";
import User from "../Model/User.js";


export async function deleteEntreprise(req,res){
  
    const  id=req.params.id;
  
      var entreprise = await Entreprise.findOneAndRemove({
        _id:id,
          nom: req.body.first_nom
      })
      res.status(200).json("Entreprise Supprime")
  
}
export async function UpdateEntreprise(req,res){
    const  id=req.params.id;
  
      var entreprise = await Entreprise.findOneAndUpdate({
        _id:id,
          nom:req.body.nom,
          adresse:req.body.adresse,
          email: req.body.email,
          numTel:req.body.numTel
      })
      res.status(200).json("Entreprise Modifier")
  }

  export async function getAllEntreprise(req,res){
    try {
        const entreprise = await Entreprise.find()
        res.json(entreprise)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
  }

 
  export async function AddEntreprise(req,res){
    
      var entreprise = await Entreprise.create({
         name : req.body.name,
         email : req.body.email,
         user : req.body.user,
         location:{
          type : req.body.location.type,
          coordinates : req.body.location.coordinates
         }
      })
      entreprise.save;
    
  }

  export async function find_Entreprise(req,res){
    try {
      const latitude   =  req.body.latitude;
      const longitude  =  req.body.longitude;

      const EntrepriseData = await Entreprise.aggregate([{
        $geoNear: {
          near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
          key :"location",
          maxDistance   :  parseFloat(60)*1609,
          distanceMultiplier: 0.000621371,
          distanceField:"dist.calculated",
          spherical : true 
        }
      }
     ]);
      res.status(200).send({success:true , message : "Entreprise Trouve", data: EntrepriseData})
      
    } catch (error) {
      res.status(400).send({success:false,msg:error.message})
    }
  }

  export async function GetEntreprise(req,res){
    try {

      const  id=req.params.id;
  
      var entreprise = await Entreprise.findOne({_id:id})
      if(entreprise)
      
        res.send(entreprise)
      
      res.status(200).json(entreprise)
    } catch (error) {
      console.log("");
    }
  }

import { parse } from "dotenv";
import Entreprise from "../Model/Entreprise.js";
import User from "../Model/User.js";
import Offre from "../Model/Offre.js"
import Accepted from "../Controller/template/Accepted.js";
import Refused from "../Controller/template/refused.js";

export async function deleteEntreprise(req,res){
  
    const  id=req.params.id;
  
      var entreprise = await Entreprise.findOneAndRemove({
        _id:id,
      })
      res.status(200)
}
export async function UpdateEntreprise(req,res){
    const  id=req.params.id;
  
      var entreprise = ({
          name:req.body.name,
          adresse:req.body.adresse,
          email: req.body.email,
          user : req.body.user,
      })
      return await Entreprise.findOneAndUpdate({'_id': id} , entreprise)
      
  }

  export async function getAllEntreprise(req,res){
    try {
        const entreprise = await Entreprise.find()
        res.json(entreprise)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
  }

 
  export async function AddEntreprise(req, res) {
    try {
      const entreprise = await Entreprise.create({
        name: req.body.name,
        email: req.body.email,
        user: req.body.user,
        adresse: req.body.adresse,
        description: req.body.description,
        location: {
          type: req.body.location.type,
          coordinates: req.body.location.coordinates,
        },
      });
  
      res.status(201).json({
        status: 'success',
        data: {
          entreprise,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }
  

  export async function find_Entreprise(req,res){
    try {
      const latitude   =  req.params.latitude;
      const longitude  =  req.params.longitude;

      const EntrepriseData = await Entreprise.aggregate([{
        $geoNear: {
          latitude:latitude,
          longitude:longitude,
          near:{type:"Point",coordinates:[parseFloat(latitude),parseFloat(longitude)]},
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

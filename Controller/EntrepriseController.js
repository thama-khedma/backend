
import Entreprise from "../Model/Entreprise.js";


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

         }
      })
      entreprise.save;
    
  }

  export async function find_Entreprise(req,res){
    try {
      const latitude   =  req.body.latitude;
      const longitude  =  req.body.longitude;

      const EntrepriseData = await Entreprise.aggregate({
        $Near :{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
        key : "location",
        maxDistance   :  parseFloat(1000)*1609,
        distanceField:"dist.calculated",
        spherical : true 
      });
      res.status(200).send({message : "Entreprise Trouve", data: EntrepriseData})
      
    } catch (error) {
      res.status(400).send({ message : "Echec"})
    }
  }
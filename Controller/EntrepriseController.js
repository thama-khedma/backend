
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

 
    

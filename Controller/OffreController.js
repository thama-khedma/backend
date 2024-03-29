import Offre from "../Model/Offre.js";
import Entreprise from "../Model/Entreprise.js";
import User from "../Model/User.js";


export async function deleteOffre(req,res){
  
    const  id=req.params.id;
  
      var offre = await Offre.findOneAndRemove({
        _id:id,
     
      })
      res.status(200).json(offre)
  
}
export async function UpdateOffre(req,res){
    const  id=req.params.id;
  
      var offre = ({    
          name:req.body.name,
          description:req.body.description,
          user : req.body.user,
          entreprise: req.body.email,
          
      })
      return await Offre.findOneAndUpdate({'_id': id} , offre),
      res.status(200).json({offre})
  }

  export async function getAllOffre(req, res) {
    try {
        const entrepriseId = req.params.entreprise;
        let query = {};
        if (entrepriseId) {
            query = { entreprise: entrepriseId };
        }
        const offres = await Offre.find(query).populate('entreprise');
        res.json(offres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

  
  export async function getOffre(req,res){
    try {

        const  id=req.params.id;
    
        var offre = await Offre.findOne({_id:id})
        if(offre)
        
          res.send(offre)
        
        res.status(200).json(offre)
      } catch (error) {
        console.log("");
      }
  }

  export async function AddOffre(req,res){
    
    var offre = await Offre.create({
       name : req.body.name,
       entreprise : req.body.entreprise,
       user : req.body.user,
       description: req.body.description,
    });

    res.status(201).json(offre);
}


export async function GetOffreByEntreprise(req,resp){
  
  let data = await Offre.find(
    {
      
        "$or":[
   
            { entreprise :req.params.key}
        ]
    }
)
resp.send(data);

}
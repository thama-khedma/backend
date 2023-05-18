import { parse } from "dotenv";
import Entreprise from "../Model/Entreprise.js";
import User from "../Model/User.js";
import Offre from "../Model/Offre.js"
import Condidature from "../Model/Condidature.js";
import Acceptedmail from "../Controller/template/Accepted.js";
import Resfusedmail from "../Controller/template/refused.js";
import sendEmail from "../middleware/nodemail.js"

// Assuming you have a model called `Candidature` that uses the schema you defined
// Assuming you have a model called `User` that represents the user collection
export async function refuseCondidature(req, res) {
  try {
    const id = req.params.id;
    const condidature = await Condidature.findByIdAndDelete(id);

    if (!condidature) {
      return res.status(404).send('Condidature not found');
    }

    
      const v = await Resfusedmail(condidature.useremail);
      sendEmail(condidature.useremail, 'Application Rejected', v);
    

    res.send(condidature);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}

export async function acceptCondidature(req, res) {
  try {
    const id = req.params.id;
    const condidature = await Condidature.findByIdAndDelete(id);

    if (!condidature) {
      return res.status(404).send('Condidature not found');
    }


      const v = await Acceptedmail(condidature.useremail, condidature.id);
      sendEmail(condidature.useremail, 'Application Rejected', v);
    

    res.send(condidature);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}

export async function UpdateCondidature(req,res){
    const  id=req.params.id;
  
      var condidature = ({
          user:req.body.user,
          entreprise:req.body.entreprise,
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

 
  export async function AddCondidature(req, res) {
    var condidature = await Condidature.create({
      user: req.body.user,
      useremail: req.body.useremail,
      entreprise: req.body.entreprise,
      offre: req.body.offre,
    });
    return res.status(201).json(condidature);
  }
  
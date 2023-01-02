import express from'express' ;
import {deleteEntreprise,UpdateEntreprise,getAllEntreprise, AddEntreprise, find_Entreprise, GetEntreprise} from "../Controller/EntrepriseController.js"
import { getOffre } from '../Controller/OffreController.js';
import multer from 'multer';
import path from "path"

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
      cb( null , './public/images/EntrepriseImages')
    },
    filename:  (req, file ,cb) => {
          
          cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
  })
  const upload = multer({storage: storage}) 
const router = express.Router();
router.post('/delete/:id',deleteEntreprise)
router.post('/update/:id',UpdateEntreprise)
router.route('/Add').post(AddEntreprise)
router.get('/',getAllEntreprise)
router.post('/find/:latitude/:longitude',find_Entreprise)
router.get('/GetEntreprise/:id',GetEntreprise)



export default router;
import express from'express' ;
import {deleteEntreprise,UpdateEntreprise,getAllEntreprise, AddEntreprise, find_Entreprise, GetEntreprise, GetOffreByEntreprise} from "../Controller/EntrepriseController.js"
import { getOffre } from '../Controller/OffreController.js';



const router = express.Router();
router.delete('/delete/:id',deleteEntreprise)
router.patch('/update/:id',UpdateEntreprise)
router.post('/Add',AddEntreprise)
router.get('/',getAllEntreprise)
router.post('/find/:latitude/:longitude',find_Entreprise)
router.get('/GetEntreprise/:id',GetEntreprise)
router.get('/GetOffre/:name',GetOffreByEntreprise)


export default router;
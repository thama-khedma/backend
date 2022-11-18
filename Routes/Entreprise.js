import express from'express' ;
import {deleteEntreprise,UpdateEntreprise,getAllEntreprise, AddEntreprise, find_Entreprise} from "../Controller/EntrepriseController.js"



const router = express.Router();



router.delete('/delete/:id',deleteEntreprise)
router.patch('/update/:id',UpdateEntreprise)
router.post('/Add',AddEntreprise)
router.get('/',getAllEntreprise)
router.post('/find',find_Entreprise)



export default router;
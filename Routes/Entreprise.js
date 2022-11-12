import express from'express' ;
import {deleteEntreprise,UpdateEntreprise,getAllEntreprise} from "../Controller/EntrepriseController.js"



const router = express.Router();



router.delete('/delete/:id',deleteEntreprise)
router.patch('/update/:id',UpdateEntreprise)

router.get('/',getAllEntreprise)




export default router;
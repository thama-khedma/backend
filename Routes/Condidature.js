import express from'express' ;
import { AddCondidature, deleteCondidature, getAllCondidature, UpdateCondidature } from '../Controller/CondidatureController.js';







const router = express.Router();
router.post('/delete/:id',deleteCondidature)
router.post('/update/:id',UpdateCondidature)
router.post('/Add',AddCondidature)
router.get('/',getAllCondidature)



export default router;
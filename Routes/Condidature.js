import express from'express' ;
import { AddCondidature, acceptCondidature,refuseCondidature, getAllCondidature, UpdateCondidature } from '../Controller/CondidatureController.js';







const router = express.Router();
router.get('/Accept/:id',acceptCondidature)
router.get('/Refuse/:id',refuseCondidature)
router.get('/update/:id',UpdateCondidature)
router.post('/Add',AddCondidature)
router.get('/getAllCondidature/',getAllCondidature)



export default router;
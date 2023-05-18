import express from'express' ;
import { AddOffre, deleteOffre, getAllOffre,getOffre, GetOffreByEntreprise, UpdateOffre } from '../Controller/OffreController.js';


const router = express.Router();
router.delete('/delete/:id',deleteOffre)
router.put('/update/:id',UpdateOffre)
router.get('/getAllOffre/',getAllOffre)
router.post('/Add',AddOffre)
router.post('/search/:key',GetOffreByEntreprise)
router.get('/GetOffre/:id',getOffre)

export default router;

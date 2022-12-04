import express from'express' ;
import { AddOffre, deleteOffre, getAllOffre, getOffre, UpdateOffre } from '../Controller/OffreController.js';


const router = express.Router();
router.post('/delete/:id',deleteOffre)
router.post('/update/:id',UpdateOffre)
router.get('/offre',getAllOffre)
router.get('/offre/:id',getOffre)
router.post('/Add',AddOffre)


export default router;
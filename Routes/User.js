import express from'express' ;
import  {RegisterUser,Login,UpdateUser,resetPass, deleteUser, getAllUsers, verify} from"../Controller/UserController.js" ;
import  {verifyToken}  from '../middleware/auth.js';

const router = express.Router();




router.route('/compte').post(RegisterUser)
router.route('/').get(getAllUsers)
router.route('/Login') .post(Login)
router.route('/updateUser/:id').patch(UpdateUser,verifyToken);
router.put('/resetpwd',resetPass,verifyToken)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/verify/:id',verify)



export default router;
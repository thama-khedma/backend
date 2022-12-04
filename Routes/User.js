import express from'express' ;
import  {RegisterUser,Login,UpdateUser,resetPass, deleteUser, GetUser, verify , forgetPass, getAllUsers} from"../Controller/UserController.js" ;
import  {verifyToken}  from '../middleware/auth.js';
import multer from 'multer';
import multerConfig from '../middleware/multer-config.js';
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of a User
 *         first_name:
 *           type: integer
 *           description: first name of a user
 *         last_name:
 *           type: string
 *           description: last name of a user
 *         email:
 *           type: string
 *           descripton: email of a user
 *         password:
 *            type: string
 *            descripton: password of a user
 *          
 *       example:
 *         first_name: mohamedjasser
 *         last_name: bensmida
 *         email: mohamedjasser.bensmida@esprit.tn
 *         password: azerty
 *
 */
/**
 * @swagger
 *  tags:
 *    name: User
 *    description: users
 */
/**
 * @swagger
 * /user/compte:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.route('/compte').post(RegisterUser)
/**
 * @swagger
 *  /user/profil/{id}:
 *    get:
 *      summary: Get a user
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: User by its id
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *        404:
 *          description: The user was not found
 *
 */
router.get('/profil/:id',GetUser)
/**
 * @swagger
 * /user/Login:
 *   post:
 *     summary: Login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully Sign in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.route('/Login') .post(Login)
/**
 * @swagger
 * /user/updateUser/{id}:
 *   put:
 *     summary: updates posts by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         decsription: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
router.route('/updateUser/:id').post(UpdateUser);
/**
 * @swagger
 * /user/resetpwd:
 *   post:
 *     summary: send Code reset password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The code  was successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/resetpwd',resetPass)
 /**
 * @swagger
 * /user/resetpassword:
 *   post:
 *     summary:  reset password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The password update successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
  router.post('/resetpassword',forgetPass)
/**
 * @swagger
 *  /user/delete/{id}:
 *    delete:
 *      summary: removes a user
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The user was deleted
 *        404:
 *          description: The user was not found
 *
 */
router.delete('/delete/:id',verifyToken,deleteUser)
/**
 * @swagger
 * /user/verify/{id}:
 *   get:
 *     summary: verify a user  by id
 *     tags: [User]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of id
 *         schema:
 *           type: string
 *         required: true
 * 
 *     
 *     responses:
 *       200:
 *         description: verified by  id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User can not be found
 */
router.get('/verify/:id',verifyToken,verify)

router.get('/',getAllUsers)

export default router;
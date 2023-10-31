import express from 'express';
import {login, signUp} from "../controllers/authController";

const router = express.Router();

router.route('/create').post(signUp)
router.route('/login').post(login)
export default router;

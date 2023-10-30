import express from 'express';
import {signUp} from "../controllers/authController";

const router = express.Router();

router.route('/create').post(signUp)
export default router;

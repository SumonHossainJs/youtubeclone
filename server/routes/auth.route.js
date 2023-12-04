import express from 'express';

import { signup, signin,fromGoogle } from '../controllers/auth.control.js';
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", fromGoogle);


export default router;
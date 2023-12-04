import express from 'express';

import { Update,deleteUser, getUser, subscribe, unsubscribe, like, disLike, Alluser  } from '../controllers/user.control.js';
import {verifyToken} from '../verifyToken.js';

const router = express.Router();

// update user
router.put("/update/:id", verifyToken, Update);

// delete user 

router.delete("/delete/:id", verifyToken, deleteUser);

router.get("/all",Alluser);

// get a user 

router.get("/find/:id", getUser);

// subscribe A user 
router.put("/sub/:id", verifyToken,  subscribe);

// unsub a user 
router.put("/unsub/:id",verifyToken, unsubscribe);

// like a video 
router.put("/like/:videoId", verifyToken, like);
// dislike a video 
router.put("/dislike/:videoId", verifyToken, disLike);

export default router;
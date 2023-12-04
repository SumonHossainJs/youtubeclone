import express from 'express';
import { addVideo, deleteVideo, updateVideo, getVideo,addView, randomVideo, trend, sub, getbyTag, search, myVideo } from '../controllers/video.control.js';

import {verifyToken} from '../verifyToken.js';

const router = express.Router();

// add video

router.post("/addVideo", verifyToken, addVideo);
router.put("/video/:id", verifyToken, updateVideo);
router.delete("/video/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/random", randomVideo);
router.get("/tag", getbyTag);
router.get("/sub", verifyToken, sub);
router.get("/search", search);
router.get("/myvideo", verifyToken, myVideo);

export default router;



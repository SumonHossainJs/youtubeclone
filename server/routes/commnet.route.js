import express from 'express';
import { addComment, getComment, updateComment, deleteComment } from '../controllers/comment.control.js';

import { verifyToken } from '../verifyToken.js';


const router = express.Router();


router.post ('/',verifyToken,  addComment);
router.get('/:id',getComment);
router.delete("/:id", verifyToken, deleteComment);
router.put("/:id", verifyToken, updateComment);
router.post ('/',verifyToken,  addComment);


export default router;
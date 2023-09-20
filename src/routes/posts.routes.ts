import express from 'express';
import { getPosts, sendPosts } from '../controllers/posts.controllers';

const router = express.Router();

router.get('/:category/:type/:elems', getPosts);
router.post('/', sendPosts);

export default router;

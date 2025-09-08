import { Router } from "express";
import postRouter from "../modules/post/post.router.js";
import userRouter from "../modules/user/user.router.js";


const router = Router();



router.use('/users', userRouter);
router.use('/posts', postRouter)

export default router;
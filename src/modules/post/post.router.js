import { Router } from "express";
import { userPost } from "./post.controller.js";
import { userPostMiddleware } from "../../common/middlewares/post.middleware.js";



const postRouter = Router();

postRouter.post('/', userPostMiddleware, userPost);

export default postRouter;

import Post from "./post.model.js";
import { createResponse } from "../../common/configs/response.config.js";


export const userPost = async (req, res) => {
    try {
        const { userId, content } = req.body;
        if (!userId || !content) {
            return createResponse(res, 400, "userId and content are required");
        }
        if (req.user._id.toString() !== userId) {
            return createResponse(res, 403, "Forbidden");
        }

        const post = new Post({ userId, content});
        await post.save();

        return createResponse(res, 201, "Created", post); 
    } catch (err) {
        return createResponse(res, 500, "Create post failed", { error: err.message });
    }
};

export default userPost;

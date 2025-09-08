import mongoose from "mongoose";


const userPostSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true }
    }, 
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model("Post", userPostSchema);
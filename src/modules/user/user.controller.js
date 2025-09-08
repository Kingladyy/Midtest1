import { createResponse } from "../../common/configs/response.config.js";
import { hashPassword, comparePassword } from "../../common/utils/password-handler.js";
import User from "./user.model.js";
import crypto from "crypto";


export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return createResponse(res, 400, "username, email, password are required");
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return createResponse(res, 400, "Username already exists");
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return createResponse(res, 400, "Email already exists");
        }

        const passwordHash = hashPassword(password);
        const newUser = await User.create({ username, email, password: passwordHash });

        const { password: _pw, ...safeUser } = newUser.toObject();
        return createResponse(res, 201, "Register successfully", safeUser);
    } catch (error) {
        return createResponse(res, 500, "Register failed", { error: error.message });
    }
};

export default registerUser;

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return createResponse(res, 400, "email and password are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return createResponse(res, 400, "Invalid email or password");
        }

        const isValid = comparePassword(password, user.password);
        if (!isValid) {
            return createResponse(res, 400, "Invalid email or password");
        }

        const randomString = crypto.randomUUID();
        const apiKey = "mern-$" + user._id + "$-$" + user.email + "$-$" + randomString + "$";

        user.apikey = apiKey;
        await user.save();

        return createResponse(res, 200, "Login successfully", { apiKey });
    } catch (error) {
        return createResponse(res, 500, "Login failed", { error: error.message });
    }
};



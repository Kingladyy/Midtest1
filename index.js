import express from "express";
import router from "./src/routes/router.js";
import connectDB from "./src/common/configs/database.config.js";
import { PORT } from "./src/common/configs/environment.config.js";


const app = express();
app.use(express.json());

connectDB();

app.use('/api', router);


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})
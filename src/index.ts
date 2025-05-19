import { config } from "dotenv";
import express from "express";
import cors from "cors";

import routers from "./routers/index.js";
import { Logger } from "./utils/logger.js";
import { requestLogger } from "./middlewares/requestLogger.js";

config();

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.enable("trust proxy")

app.use(requestLogger)

app.use("/",routers)

app.listen(process.env.PORT, () => {
    Logger.info(`Server is running on port ${process.env.PORT}`);
});
import { Router } from "express";

import utils from "./utils/index.js";
import func from "./func/index.js";

const router = Router();

router.use("/utils", utils);
router.use("/func",func);

export default router;
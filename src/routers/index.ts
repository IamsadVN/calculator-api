import { Router } from "express";

import utils from "./utils/index.js";
import func from "./func/index.js";
import equation from "./equation/index.js";

const router = Router();

router.use("/utils", utils);
router.use("/func", func);
router.use("/equation", equation)

export default router;
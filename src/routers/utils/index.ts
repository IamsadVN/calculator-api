import { Router } from "express";

import { calculateFunc } from "../../controllers/utils/calc.js";
import { baseNumber } from "../../controllers/utils/baseNumber.js";

const router = Router();

router.post("/calc", calculateFunc);
router.post("/base-number", baseNumber);

export default router;
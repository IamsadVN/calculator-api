import { Router } from "express";

import { calculateFunc } from "../../controllers/utils/calc.js";
import { numberToBinary } from "../../controllers/utils/n2b.js";

const router = Router();

router.post("/calc", calculateFunc);
router.post("/n2b",numberToBinary);

export default router;
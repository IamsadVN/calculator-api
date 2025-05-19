import { Router } from "express";

import { calculateFunc } from "../../controllers/utils/calc.js";
import { numberToBinary } from "../../controllers/utils/n2b.js";
import { binaryToNumber } from "../../controllers/utils/b2n.js";
import { baseNumber } from "../../controllers/utils/baseNumber.js";

const router = Router();

router.post("/calc", calculateFunc);
router.post("/n2b",numberToBinary);
router.post("/b2n",binaryToNumber);
router.post("/base-number", baseNumber);

export default router;
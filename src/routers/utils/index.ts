import { Router } from "express";

import { calculateFunc } from "../../controllers/utils/calc.js";

const router = Router();

router.post("/calc", calculateFunc);

export default router;
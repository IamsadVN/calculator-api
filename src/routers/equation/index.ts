import { Router } from "express";

import { polynomial } from "../../controllers/equation/polynomial.js";
import { simulEquation } from "../../controllers/equation/simulEquation.js";

const router = Router();

router.post("/polynomial", polynomial);
router.post("/simul-eq", simulEquation);

export default router;
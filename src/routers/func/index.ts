import { Router } from "express";

import { findGCD } from "../../controllers/func/gcd.js";
import { findLCM } from "../../controllers/func/lcm.js";
import { factorization } from "../../controllers/func/fact.js";

const router = Router();

router.post("/gcd", findGCD);
router.post("/lcm", findLCM);
router.post("/fact", factorization);

export default router;
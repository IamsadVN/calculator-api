import { Router } from "express";

import { findGCD } from "../../controllers/func/gcd.js";
import { findLCM } from "../../controllers/func/lcm.js";

const router = Router();

router.post("/gcd", findGCD);
router.post("/lcm", findLCM);

export default router;
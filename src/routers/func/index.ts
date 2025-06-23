import { Router } from "express";

import { findGCD } from "../../controllers/func/gcd.js";
import { findLCM } from "../../controllers/func/lcm.js";
import { factorization } from "../../controllers/func/fact.js";
import { randomNumber } from "../../controllers/func/random.js";
import { statistic } from "../../controllers/func/statistic.js";
import { tableFunc } from "../../controllers/func/table.js";

const router = Router();

router.post("/gcd", findGCD);
router.post("/lcm", findLCM);
router.post("/fact", factorization);
router.post("/random", randomNumber);
router.post("/statistic", statistic);
router.post("/table",tableFunc);

export default router;
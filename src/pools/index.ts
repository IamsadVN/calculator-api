import { Piscina } from "piscina";

import { LcmParams } from "./workers/lcmPool.js";

export const lcmPool = new Piscina<LcmParams, string>({
    minThreads: 1,
    maxThreads: 3,
    filename: new URL("./workers/lcmPool.js", import.meta.url).href
});


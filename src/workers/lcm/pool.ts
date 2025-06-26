import { Piscina } from "piscina";
import { LcmParams } from "./worker.js";

export const lcmPool = new Piscina<LcmParams, string>({
    minThreads: 1,
    maxThreads: 3,
    filename: new URL("./worker.js", import.meta.url).href
});
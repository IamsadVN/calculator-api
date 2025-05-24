import { Request, Response } from "express";
import { SimulEqRequestBody } from "../../types/index.js";
import * as math from "mathjs";

export function simulEquation(req: Request<{}, {}, SimulEqRequestBody>, res: Response) {
    const { matrix, col } = req.body;

    try {
        const result = math.lusolve(matrix, col);

        res.json({ result });
    }
    catch (err) {
        res.status(400).json({ error: (err as Error).message });
        return;
    }
}
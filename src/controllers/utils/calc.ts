import { Request, Response } from "express";
import { CalculationRequestBody } from "../../types/index.js";
import * as math from "mathjs";

export function calculateFunc(req: Request<{}, {}, CalculationRequestBody>, res: Response) {
    const { expression } = req.body;

    if (!expression) {
        res.status(400).json({ error: "Expression is required"});
        return;
    }

    try {
        const result: number = math.evaluate(expression);

        res.json({ result });
    }
    catch (error) {
        res.status(400).json({error: "Invalid Expression", details: (error as Error).message});
    }
}
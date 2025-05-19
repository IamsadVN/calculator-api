import { Request, Response } from "express";
import { BaseNumberRequestBody } from "../../types/index.js";
import * as math from "mathjs";

export function baseNumber(req: Request<{}, {}, BaseNumberRequestBody>, res: Response) {
    const { value, fromBase, toBase } = req.body;

    if (!fromBase || !toBase) {
        res.status(400).json({error: "Invalid value for fromBase or toBase, did you missing these two arguments?"});
        return;
    }

    if (typeof value === "number" && fromBase === 10) {
        if (value > Number.MAX_SAFE_INTEGER) {
            res.status(400).json({error: "The value is too large for the max safe integer of Javascript"});
            return;
        }

        const result = value.toString(toBase);

        res.json({result});
    }
    else {
        if (parseInt((value as string),fromBase) > Number.MAX_SAFE_INTEGER) {
            res.status(400).json({error: "The value is too large to calculate"});
            return;
        }

        const numberConverted = parseInt((value as string),fromBase);

        const result = numberConverted.toString(toBase);

        res.json({result});
    }
}
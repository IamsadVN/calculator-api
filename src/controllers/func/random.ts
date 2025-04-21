import { Request, Response } from "express";
import * as math from "mathjs";

import { RandomNumberRequestBody } from "../../types/index.js";

export function randomNumber(req: Request<{}, {}, RandomNumberRequestBody>, res: Response) {
    const { type, max } = req.body;
    const min = req.body.min || 0;
    const amount = req.body.amount || 1;

    if (!type) {
        res.status(400).json({ error: "A type to random is required" });
        return;
    }
    else if (!max) {
        res.status(400).json({ error: "Max value is required" });
        return;
    }
    
    if (min >= max) {
        res.status(400).json({ error: "The 'min' value must not greater or equal the 'max' value" });
        return;
    }
    
    //TODO: change the maximum allowed limit to 10^8 after using stream or buffer to send data
    if (amount > 10**5) {
        res.status(400).json({ error: "Amount exceeds the maximum allowed limit of 10^5" });
        return;
    }

    if (type !== "decimal" && type !== "integer") {
        res.status(400).json({ error: "Invalid type. Allowed values are 'decimal' and 'integer'" });
        return;
    }

    const result = getRandValue(type,min,max,amount);

    //TODO: using stream or buffer to send data to client
    res.json({result});
}

function getRandValue(
    type: "decimal" | "integer", 
    min: number, 
    max: number, 
    amount: number
) {
    let arrResult: number[] = [];

    if (type === "decimal") {
        for (let i = 1; i <= amount; i++) {
            arrResult.push(math.random(min,max));
        }
    }
    else if (type === "integer") {
        for (let i = 1; i <= amount; i++) {
            arrResult.push(math.randomInt(min,max));
        }
    }

    return arrResult;
}

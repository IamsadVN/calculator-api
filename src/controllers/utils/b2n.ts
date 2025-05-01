import { Request, Response } from "express";
import { BinaryToNumberRequestBody } from "../../types/index.js";

export function binaryToNumber(req: Request<{}, {}, BinaryToNumberRequestBody>, res: Response) {
    const { binary } = req.body;

    // TODO: can receive as an array
    try {
        const result = binToNum(binary);

        res.json({result});
    }
    catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
}

function binToNum(binary: string) {
    let result = 0;
    const binaryArr = binary.split("").reverse();

    for(let i=0;i < binaryArr.length; i++) {
        const digit = Number(binaryArr[i]);
        if(isNaN(digit) || (digit !== 0 && digit !== 1)) {
            throw new Error("Binary must be a number and only 0 or 1");
        }
        result += digit * Math.pow(2,i);
    }

    return result;
}

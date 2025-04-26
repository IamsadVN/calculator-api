import { Request, Response } from "express";
import { NumberToBinaryRequestBody } from "../../types/index.js";
import * as math from "mathjs";

//TODO: can receive as an array
export function numberToBinary(req: Request<{}, {}, NumberToBinaryRequestBody>, res: Response) {
    const {number} = req.body;

    if (!number) {
        res.status(400).json({ error: "Number is required" });
        return;
    }
    if (math.isNumber(number) === false) {
        res.status(400).json({ error: "Number must be a number" });
        return;
    }
    if (math.isInteger(number) === false) {
        res.status(400).json({ error: "Number must be a integer" });
    }
    
    const result = convertNumToBin(number);

    res.json({result});
}

function convertNumToBin(number: number) {
    let string = ""; 

    while(number > 0) {
        string = (number % 2) + string;
        number = math.floor(number/2);
    }
    return string;
}
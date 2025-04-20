import { GCDRequestBody } from "../../types/index.js";
import { Request, Response } from "express";

export function findGCD(req: Request<{},{}, GCDRequestBody>, res: Response) {
    const { numbers } = req.body;

    if (!numbers) {
        res.status(400).json({error: "Numbers is required"});
        return;
    }

    if (numbers.length < 2) {
        res.status(400).json({error: "Must have 2 or more number to calculate"});
        return;
    }

    const result = gcd(numbers);

    res.json({result});
}

function gcd(numbers: number[]): number {
    let result = numbers[0];

    for(let i=1;i < numbers.length;i++) {
        const current = numbers[i];
        let temp = Math.min(result,current);

        while (temp > 0) {
            if (current % temp === 0 && result % temp === 0) {
                break;
            }

            temp--;
        }
        result = temp;
    }

    return result;
}
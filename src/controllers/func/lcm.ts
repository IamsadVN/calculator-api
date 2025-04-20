import { LCMRequestBody } from "../../types/index.js";
import { Request, Response } from "express";

export function findLCM(req: Request<{},{}, LCMRequestBody>, res: Response) {
    const { numbers } = req.body;

    if (!numbers) {
        res.status(400).json({error: "Numbers is required"});
        return;
    }

    if (numbers.length < 2) {
        res.status(400).json({error: "Must have 2 or more number to calculate"});
        return;
    }

    const result = lcm(numbers);

    res.json({result});
}

function lcm(numbers: number[]) {
    function gcd(a: number,b: number) {
        if (b==0) return a;
        
        return gcd(b,a % b);
    }

    return numbers.reduce((a,b) => a * b / gcd(a,b));
}
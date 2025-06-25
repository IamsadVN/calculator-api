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

    const bigIntArr: bigint[] = new Array<bigint>(numbers.length);

    for (let i=0;i < numbers.length;i++) {
        if (typeof numbers[i] !== "number") {
            res.status(400).json({
                error: `Element at index ${i} is not a number`,
                element: numbers[i]
            });
            return;
        }
        bigIntArr[i] = BigInt(numbers[i]);
    }

    const result = lcm(bigIntArr).toString();

    res.json({ result });
}

function gcd(a: bigint, b: bigint) {
    while (a > 0n && b > 0n) {
        if (a > b) {
            a = a % b;
        }
        else {
            b = b % a;
        }
    }

    return (a === 0n) ? b : a;
}

function lcm(numbers: bigint[]) {
    return numbers.reduce((a, b) => a * b / gcd(a, b));
}
import { Request, Response } from "express";
import * as math from "mathjs";

import { FactRequestBody } from "../../types/index.js";

export function factorization(req: Request<{}, {}, FactRequestBody>, res: Response) {
    const { number } = req.body;

    if (!number) {
        res.status(400).json({ error: "Number is required" });
        return;
    }

    if (number < 0) {
        res.status(400).json({ error: "Number must not negative" });
        return;
    }

    if (number > Number.MAX_SAFE_INTEGER) {
        res.status(400).json({ error: "Number must not larger than MAX_SAFE_INTEGER in JavaScript" });
        return;
    }

    if (!math.isInteger(number)) {
        res.status(400).json({ error: "Number must be integer" });
        return;
    }

    const factors = primeFactorization(number);
    const result = formatFactors(factors);

    res.json({ result });
}

function primeFactorization(number: number) {
    let factors: number[] = [];

    while (number % 2 === 0) {
        factors.push(2);
        number /= 2;
    }

    for (let i = 3; i * i <= number; i += 2) {
        while (number % i === 0 && math.isPrime(i)) {
            factors.push(i);
            number /= i;
        }
    }

    if (number > 2 && math.isPrime(number)) {
        factors.push(number);
    }

    return factors;
}

function formatFactors(factors: number[]) {
    let result = '';
    let currentFactor = factors[0];
    let count = 1;

    for (let i = 1; i < factors.length; i++) {
        if (factors[i] === currentFactor) {
            count++;
        } else {
            result += `${currentFactor}${count > 1 ? `^${count}` : ''} * `;
            currentFactor = factors[i];
            count = 1;
        }
    }

    result += `${currentFactor}${count > 1 ? `^${count}` : ''}`;

    return result;
}

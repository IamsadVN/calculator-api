import { Request, Response } from "express";
import { PolynomialRequestBody } from "../../types/index.js";
import * as math from "mathjs";

export function polynomial(req: Request<{}, {}, PolynomialRequestBody>, res: Response) {
    const { coeffs } = req.body;

    if (coeffs.length > 4) {
        res.status(400).json({error: "4th degree polynomials not supported yet"});
        return;
    }
    else if (coeffs.length < 3) {
        res.status(400).json({error: "A Polynomial must be have 2 or more degree"});
        return;
    }

    const result = math.polynomialRoot(...coeffs);

    res.json({result});
}
import { Request, Response } from "express";
import { PolynomialRequestBody } from "../../types/index.js";
import { solveLinear, solveQuadratic, solveCubic, solveQuartic } from "@littlefattie/solve-equations";

export function polynomial(req: Request<{}, {}, PolynomialRequestBody>, res: Response) {
    const { coeffs } = req.body;

    if (!coeffs) {
        res.json({
            error: "'coeffs' is required"
        });
        return;
    }
    if (!Array.isArray(coeffs)) {
        res.json({
            error: "'coeffs' must be an array and contain numbers"
        });
        return;
    }
    for (const element of coeffs) {
        if (typeof element !== "number") {
            res.json({
                error: `Element "${element}" is not a number`
            });
            return;
        }
    }

    switch (coeffs.length) {
        case 2: {
            res.json({
                result: solveLinear(coeffs[0],coeffs[1])
            });
            return;
        }
        case 3: {
            res.json({
                result: solveQuadratic(coeffs[0],coeffs[1],coeffs[2]!)
            });
            return;
        }
        case 4: {
            res.json({
                result: solveCubic(coeffs[0],coeffs[1],coeffs[2]!,coeffs[3]!)
            });
            return;
        }
        case 5: {
            res.json({
                result: solveQuartic(coeffs[0],coeffs[1],coeffs[2]!,coeffs[3]!,coeffs[4]!)
            });
            return;
        }
        default: {
            if (coeffs.length < 2) {
                res.json({error: "'coeffs' must have between 2 to 5 elements"});
                return;
            }
            if (coeffs.length > 5) {
                res.json({error: "'coeffs' must not have over 5 elements"});
                return;
            }

            break;
        }
    }

}
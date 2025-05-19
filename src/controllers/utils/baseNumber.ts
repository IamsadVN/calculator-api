import { Request, Response } from "express";
import { BaseNumberRequestBody, BaseType } from "../../types/index.js";

export function baseNumber(req: Request<{}, {}, BaseNumberRequestBody>, res: Response) {
    const { fromBase, toBase } = req.body;

    if (typeof req.body.value === "number") {
        res.status(400).json({error: "Please use string to send a number instead use type number"});
        return;
    }

    const value: string = valueConvert(req.body.value, fromBase);

    if (!fromBase) {
        res.status(400).json({ error: "Missing argument: fromBase is required." });
        return;
    }
    if (!toBase) {
        res.status(400).json({ error: "Missing argument: toBase is required." });
        return;
    }

    if ([2, 8, 10, 16].includes(fromBase) === false) {
        res.status(400).json({ error: "Invalid value for fromBase. Allowed values are 2, 8, 10, 16." });
        return;
    }
    if ([2, 8, 10, 16].includes(toBase) === false) {
        res.status(400).json({ error: "Invalid value for toBase. Allowed values are 2, 8, 10, 16." });
    }

    if (fromBase === toBase) {
        res.json({ result: value, msg: "uh, are you serious?" });
        return;
    }

    try {
        const result = BigInt(value).toString(toBase);

        res.json({ result });
    }
    catch (err) {
        res.status(400).json({ error: (err as Error).message });
        return;
    }
}

function valueConvert(value: string, fromBase: BaseType): string {
    switch (fromBase) {
        case 2: {
            return "0b" + value;
        }
        case 8: {
            return "0o" + value;
        }
        case 16: {
            return "0x" + value;
        }
        default: {
            return value; // la cai cu lon nay dang o base 10 day, comment de sau nay dung co dien dien ma xoa
        }
    }
}
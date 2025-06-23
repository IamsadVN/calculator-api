import { Request, Response } from "express";
import { TableRequestBody } from "../../types/index.js";
import * as math from "mathjs";

export function tableFunc(req: Request<{}, {}, TableRequestBody>, res: Response) {
    const { functions, start, end, step } = req.body;

    if (!functions) {
        res.status(400).json({ error: "'functions' is required." });
        return;
    }
    if (!start) {
        res.status(400).json({ error: "'start' is required." });
        return;
    }
    if (!end) {
        res.status(400).json({ error: "'end' is required." });
        return;
    }
    if (!step) {
        res.status(400).json({ error: "'step' is required." });
        return;
    }

    if (!Array.isArray(functions)) {
        res.status(400).json({ error: "'functions' must be an array." });
        return;
    }
    if (typeof start !== "number") {
        res.status(400).json({ error: "'start' must be a number." });
        return;
    }
    if (typeof end !== "number") {
        res.status(400).json({ error: "'end' must be a number." });
        return;
    }
    if (typeof step !== "number") {
        res.status(400).json({ error: "'step' must be a number." });
        return;
    }
    for (const elementArr of functions) {
        if (typeof elementArr !== "string") {
            res.status(400).json({ error: `Element ${elementArr} is not a string`, element: elementArr });
            return;
        }
    }

    // Sử dụng kiến thức lớp 11, dùng công thức ((số cuối - số đầu) / bước cách đều) + 1
    const arraySize = ((end-start) / step) + 1;
    if (arraySize >= 10**8) {
        res.status(400).json({
            error: "Range too large. Please reduce the range or increase the step size to avoid generating too many values."
        });
        return;
    }

    functions.forEach((elementArr,i) => {
        if (typeof elementArr === "string") {
            functions[i] = toElementWise(elementArr);
        }
    });
    const range = math.range(start,end,step,true).toArray();

    try {
        switch (functions.length) {
            case 1: {
                const func1 = math.evaluate(functions[0], { x: range });
                res.json({ result: { func1 } });
                return;
            }
            case 2: {
                const func1 = math.evaluate(functions[0], { x: range });
                const func2 = math.evaluate(functions[1]!, { x: range });
                res.json({ result: { func1, func2 } });
                return;
            }
            case 3: {
                const func1 = math.evaluate(functions[0], { x: range });
                const func2 = math.evaluate(functions[1]!, { x: range });
                const func3 = math.evaluate(functions[2]!, { x: range });
                res.json({ result: { func1, func2, func3 } });
                return;
            }
            case 4: {
                const func1 = math.evaluate(functions[0], { x: range });
                const func2 = math.evaluate(functions[1]!, { x: range });
                const func3 = math.evaluate(functions[2]!, { x: range });
                const func4 = math.evaluate(functions[3]!, { x: range });
                res.json({ result: { func1, func2, func3, func4 } });
                return;
            }
            default: {
                res.status(400).json({ error: "Supports 1-4 functions only." });
                return;
            }
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Invalid function expression.", detail: String(err) });
    }
}


// ChatGPT generated it
function toElementWise(expr: string) {
    // Thêm dấu . vào trước *, /, ^ trừ khi đã có sẵn .
    return expr
        .replace(/(?<!\.)\*/g, '.*')  // đổi * thành .*
        .replace(/(?<!\.)\//g, './')  // đổi / thành ./
        .replace(/(?<!\.)\^/g, '.^'); // đổi ^ thành .^
}
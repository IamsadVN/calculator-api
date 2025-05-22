import { Request, Response } from "express";
import { StatisticRequestBody } from "../../types/index.js";
import * as math from "mathjs";

export function statistic(req: Request<{},{},StatisticRequestBody>, res: Response) {
    let values: number[] = [];

    if (!req.body.dataset) {
        res.status(400).json({error: "Dataset is required"});
        return;
    }

    if (typeof req.body.dataset === "string") {
        //Client gui den Server theo dang "<data>x<so lan lap lai>;<data2>x<so lan lap lai>;..."
        const splitedData = req.body.dataset.split(";");

        for (const segments of splitedData) {
            if (segments.length === 0) continue;

            let data: number, time: number; 
            const dataWithTime = segments.split("x");

            if (dataWithTime.length < 2) {
                data = Number(dataWithTime[0]);
                values.push(data);
                continue;
            }
            else {
                if (dataWithTime[1].length === 0) {
                    data = Number(dataWithTime[0]);
                    values.push(data);
                    continue;
                }

                [data, time] = dataWithTime.map((element) => Number(element));

                for (let i=1;i <= time;i++) {
                    values.push(data);
                }
            }
        }
    }
    else {
        for (const element of req.body.dataset) {
            if (typeof element === "string") {
                res.status(400).json({error: "The dataset must not have any element is a string"});
                return;
            }

            values.push(element);
        }
    }

    values.sort((a,b) => a-b);

    //console.log(values);

    const result: StatisticResult = {
        min: math.min(values),
        max: math.max(values),
        length: values.length,
        mode: math.mode(values),
        sum: math.sum(values),
        prod: math.prod(values),
        mean: math.mean(values),
        median: math.median(values),
        quartile: {
            q1: math.quantileSeq(values,0.25,true),
            q2: math.quantileSeq(values,0.50,true),
            q3: math.quantileSeq(values,0.75,true),
        },
        mad: math.mad(values)
    }

    res.json({result});
}

interface StatisticResult {
    min: number;
    max: number;
    length: number;
    mode: number[];
    sum: number;
    prod: number;
    mean: number;
    median: number;
    quartile: {
        q1: number;
        q2: number;
        q3: number;
    }
    mad: number;
}
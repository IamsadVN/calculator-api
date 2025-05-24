import { Request, Response } from "express";
import { StatisticRequestBody } from "../../types/index.js";
import * as math from "mathjs";

export function statistic(req: Request<{},{},StatisticRequestBody>, res: Response) {
    // add them 1 property `config`
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

            let data: number, repeat: number; 
            const dataWithRepeat = segments.split("x");

            if (dataWithRepeat.length < 2) {
                data = Number(dataWithRepeat[0]);
                values.push(data);
                continue;
            }
            else if (dataWithRepeat.length > 2) {
                res.status(400).json({error: "Invalid dataset format. Each segment must be in the format '<data>x<repeat>;..…'. For example: '5x3;2x2'" });
                return;
            }
            else {
                if (dataWithRepeat[1].length === 0) {
                    data = Number(dataWithRepeat[0]);
                    values.push(data);
                    continue;
                }

                [data, repeat] = dataWithRepeat.map((element) => Number(element));

                for (let i=1;i <= repeat;i++) {
                    values.push(data);
                }
            }
        }
    }
    else {
        const dataset = req.body.dataset;

        values = new Array<number>(dataset.length);

        for (let i=0;i < dataset.length;i++) {
            if (typeof dataset[i] === "string") {
                res.status(400).json({error: "The dataset must not have any element is a string"});
                return;
            }

            values[i] = dataset[i];
        }
    }

    values.sort((a,b) => a-b);

    //console.log(values);

    const result: StatisticResult = {
        min: math.min(values),
        max: math.max(values),
        
        sum: math.sum(values),
        prod: math.prod(values),

        mean: math.mean(values),
        length: values.length,
        mode: math.mode(values),
        
        // Tu phan vi cho nay co van de, co the sua sau
        quartile: {
            q1: math.quantileSeq(values,0.25,true),
            q2: math.quantileSeq(values,0.50,true),
            q3: math.quantileSeq(values,0.75,true),
        },

        mad: math.mad(values),
        std: math.std(...values)
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
    quartile: {
        q1: number;
        q2: number;
        q3: number;
    }
    mad: number;
    std: number;
}
export interface CalculationRequestBody {
    expression: string;
}

export interface GCDRequestBody {
    numbers: number[];
}

export interface LCMRequestBody {
    numbers: number[];
}

export interface FactRequestBody {
    number: number;
}

export interface RandomNumberRequestBody {
    type: "decimal" | "integer";
    min?: number;
    max: number;
    amount?: number;
}

type BaseType = 2 | 8 | 10 | 16;
export interface BaseNumberRequestBody {
    value: string;
    fromBase: BaseType;
    toBase: BaseType;
}

export interface PolynomialRequestBody {
    coeffs: [number, number, number?, number?, number?]; 
}

export interface SimulEqRequestBody {
    matrix: [
        [number, number, ...number[]],
        [number, number, ...number[]],
        ...[[number, number, ...number[]]]
    ]
    col: number[]
}

export interface StatisticRequestBody {
    dataset: "string" | number[];
}

export interface TableRequestBody {
    functions: [
        string, string?, string?, string?
    ];
    start: number;
    end: number;
    step: number;
}
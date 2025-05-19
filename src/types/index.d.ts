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

export interface NumberToBinaryRequestBody {
    number: number;
}

export interface BinaryToNumberRequestBody {
    binary: string;
}

type BaseType = 2 | 8 | 10 | 16;
export interface BaseNumberRequestBody {
    value: number | string;
    fromBase: BaseType;
    toBase: BaseType;
}
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
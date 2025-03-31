import { VectorTimeEntry } from "../vectors/vectorInterface.js";

export interface LaserPulseResult {
    electricFieldVector: VectorTimeEntry[],
    resultLog: ResultLog[]
}

export interface ResultLog {
    z_Direction_Velocity: number,
    Perceived_Frequency_Shift: number,
    Recommended_Adjustment: number,
    Adjusted_Frequency: number
}

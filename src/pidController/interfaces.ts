export interface PidResponse {
    adjustment: number,
    previousFrequencyShift: number,
    accumulatedFrequencyShift: number
}

export const FREQUENCY_PID_CHECK_INTERVAL_MS = 5;

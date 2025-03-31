import { FREQUENCY_PID_CHECK_INTERVAL_MS, PidResponse } from "./interfaces.ts";
import { C } from "../laser/laserConfigurations.ts";

/*
    If the ion moves closer to the laser, its perceived frequency
    of the laser would increase, and therefore we need to compensate
    by decreasing the laser's frequency.
 */
export const calculatePerceivedFrequency = (laserFrequency: number, zDirectionVelocityOfIon: number): number => {
    // 1. Calculate how the velocity of the ion changes the frequency of the laser EM wave perceived by the ion
    const beta = zDirectionVelocityOfIon / C;
    const perceivedFrequency = laserFrequency * Math.sqrt((1 + beta) / (1 - beta));

    // 2. Calculate the difference between the perceived frequency and the target frequency needed for cooling
    return perceivedFrequency - laserFrequency;
};

export const pidFrequencyController = (previousFrequencyShift: number, currentFrequencyShift: number, accumulatedFrequencyShift: number): PidResponse => {
    const proportionalCoefficient = 0.01;
    const integralCoefficient = 0.005;
    const derivativeCoefficient = 0.0005;

    const integralOfShift = accumulatedFrequencyShift + (currentFrequencyShift * FREQUENCY_PID_CHECK_INTERVAL_MS);
    const derivativeOfShift = (currentFrequencyShift - previousFrequencyShift) / FREQUENCY_PID_CHECK_INTERVAL_MS;

    /**
     * The adjustment terms are all multiplied by -1 because if the frequency observed by the ion is greater than the target
     * frequency, we need to decrease the laser's frequency
     */
    const adjustment = proportionalCoefficient * -1 * currentFrequencyShift
        + integralCoefficient * -1 * integralOfShift
        + derivativeCoefficient * -1 * derivativeOfShift;

    /* if ((currentFrequencyShift < 0 && adjustment < 0) || (currentFrequencyShift > 0 && adjustment > 0)) {
        console.log(`previousFrequencyShift: ${previousFrequencyShift}`);
        console.log(`currentFrequencyShift: ${currentFrequencyShift}`);
        console.log(`accumulatedFrequencyShift: ${accumulatedFrequencyShift}`);
        console.log(`Proportional term: ${proportionalCoefficient * -1 * currentFrequencyShift}`);
        console.log(`integralOfShift: ${integralOfShift}`);
        console.log(`Integral term: ${integralCoefficient * -1 * integralOfShift}`);
        console.log(`derivativeOfShift: ${derivativeOfShift}`);
        console.log(`Derivative term ${derivativeCoefficient * -1 * derivativeOfShift}`);
        console.log(`adjustment: ${adjustment}`);
        console.log("");
        console.log("");
    } */

    return {
        accumulatedFrequencyShift: integralOfShift,
        previousFrequencyShift: currentFrequencyShift,
        adjustment,
    };
};

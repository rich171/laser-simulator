import { adjustFrequencyToCompensateForDopplerShift } from "./adjustFrequency.js";
import { LaserPulseResult, ResultLog } from "./interfaces.js";
import { LASER_PULSE_MAX_DURATION_MS, C } from "./laserConfigurations.ts";
import { FREQUENCY_PID_CHECK_INTERVAL_MS } from "../pidController/interfaces.js";
import { validateUnitVector } from "../vectors/validateUnitVector.js";
import {
    ThreeDCoordinate,
    ThreeDTrajectory,
    UnitVector,
    VectorTimeEntry,
} from "../vectors/vectorInterface.ts";

export const laserPulse = (
    pulseDurationMs: number,
    targetFrequency: number,
    propagationDirection: UnitVector,
    polarization: UnitVector,
    electricAmplitude: number,
    refractiveIndexOfMedium: number,
    observationCoordinate: ThreeDCoordinate,
    ytterbiumIonTrajectory: ThreeDTrajectory,
): LaserPulseResult => {
    // Validations
    if (pulseDurationMs > LASER_PULSE_MAX_DURATION_MS) {
        throw new Error("Requested duration of laser pulse exceeds the maximum allowed amount");
    }
    validateUnitVector(propagationDirection);
    validateUnitVector(polarization);

    // Initializations
    const electricFieldVector: VectorTimeEntry[] = [{
        time: 0,
        magnitude: electricAmplitude,
        direction: polarization,
    }];
    let frequency = targetFrequency;
    let previousFrequencyShift = 0;
    let accumulatedFrequencyShift = 0;
    const resultLog: ResultLog[] = [];

    for (let t = 0; t < pulseDurationMs; t++) {
        // Adjust frequency to account for Doppler Shift due to ion velocity using PID Controller
        if (t > FREQUENCY_PID_CHECK_INTERVAL_MS && t % FREQUENCY_PID_CHECK_INTERVAL_MS === 0) {
            const frequencyAdjustment = adjustFrequencyToCompensateForDopplerShift(t, frequency, previousFrequencyShift, accumulatedFrequencyShift, ytterbiumIonTrajectory, targetFrequency, resultLog);
            previousFrequencyShift = frequencyAdjustment.previousFrequencyShift;
            accumulatedFrequencyShift = frequencyAdjustment.accumulatedFrequencyShift;
            frequency += frequencyAdjustment.adjustment;
        }

        // Calculate the magnitude and polarization direction of electric component of the EM wave at the observation coordinate at time t
        const radianFrequency = 2 * Math.PI * frequency;
        const phaseVelocity = C / refractiveIndexOfMedium;
        const waveNumber = radianFrequency / phaseVelocity;
        const spacialComponent = waveNumber * -1 * propagationDirection.x * observationCoordinate.x
            + waveNumber * -1 * propagationDirection.y * observationCoordinate.y
            + waveNumber * -1 * propagationDirection.z * observationCoordinate.z;

        const eFieldMagnitude = electricAmplitude * Math.cos(radianFrequency * (t / 1000) + spacialComponent);
        electricFieldVector.push({
            time: t,
            magnitude: eFieldMagnitude,
            direction: polarization,
        });
    }

    return {
        electricFieldVector,
        resultLog,
    };
};

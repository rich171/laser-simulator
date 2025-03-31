import { ResultLog } from "./interfaces.js";
import { calculatePerceivedFrequency, pidFrequencyController } from "../pidController/pidController.js";
import { Direction, ThreeDTrajectory } from "../vectors/vectorInterface.js";
import { getDirectionalVelocityOfIon } from "../ytterbiumIon/ytterbiumIon.js";

// Adjust frequency to account for Doppler Shift due to ion velocity using PID Controller
export const adjustFrequencyToCompensateForDopplerShift = (
    t: number,
    frequency: number,
    previousFrequencyShift: number,
    accumulatedFrequencyShift: number,
    ionTrajectory: ThreeDTrajectory,
    targetFrequency: number,
    resultLog: ResultLog[],
) => {
    const zDirectionVelocityOfIon = getDirectionalVelocityOfIon(t, ionTrajectory, Direction.z);
    const laserFrequencyPerceivedByIon = calculatePerceivedFrequency(targetFrequency, zDirectionVelocityOfIon);
    const frequencyAdjustment = pidFrequencyController(previousFrequencyShift, laserFrequencyPerceivedByIon, accumulatedFrequencyShift);

    // Logs
    resultLog.push({
        z_Direction_Velocity: zDirectionVelocityOfIon,
        Perceived_Frequency_Shift: laserFrequencyPerceivedByIon,
        Recommended_Adjustment: frequencyAdjustment.adjustment,
        Adjusted_Frequency: frequency,
    });

    return frequencyAdjustment;
};

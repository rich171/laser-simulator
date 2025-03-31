import { DIRECTIONAL_VELOCITY_TIME_INTERVAL, RANDOM_WALK_DRIFT_FACTOR_Z_DIRECTION } from "./enumsAndConstants.js";
import { randomWalkWithDrift } from "./randomWalkWithDrift.js";
import { Direction, ThreeDTrajectory } from "../vectors/vectorInterface.js";

export const generateYtterbiumIonTrajectory = (trajectoryDurationMs: number): ThreeDTrajectory => {
    let xTrajectory: number[] = []; let yTrajectory: number[] = []; let
        zTrajectory: number[] = [];
    try {
        xTrajectory = randomWalkWithDrift(-10, 10, 0, trajectoryDurationMs);
        yTrajectory = randomWalkWithDrift(-10, 10, 0, trajectoryDurationMs);
        zTrajectory = randomWalkWithDrift(-10, 10, RANDOM_WALK_DRIFT_FACTOR_Z_DIRECTION, trajectoryDurationMs);
    } catch (e) {
        console.log(`An error occurred when calculating the position of the Ytterbium Ion: ${e.message}`);
    }

    return {
        x: xTrajectory,
        y: yTrajectory,
        z: zTrajectory,
    };
};

export const getDirectionalVelocityOfIon = (time: number, trajectory: ThreeDTrajectory, direction: Direction): number => {
    const previousPosition = trajectory[direction][time - DIRECTIONAL_VELOCITY_TIME_INTERVAL];
    const currentPosition = trajectory[direction][time];
    return (currentPosition - previousPosition) / DIRECTIONAL_VELOCITY_TIME_INTERVAL;
};

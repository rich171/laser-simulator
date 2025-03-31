import { laserPulse } from "./laser/laser.js";
import { LASER_PULSE_DURATION_MS, TARGET_FREQUENCY_KHZ } from "./laser/laserConfigurations.js";
import {
    DIRECTIONAL_VELOCITY_TIME_INTERVAL,
    RANDOM_WALK_DRIFT_FACTOR_Z_DIRECTION,
} from "./ytterbiumIon/enumsAndConstants.js";
import { generateYtterbiumIonTrajectory } from "./ytterbiumIon/ytterbiumIon.js";

console.log("===Process===");
console.log("");
console.log("The trajectory of a cooled Ytterbium ion is modeled as a random walk in three dimensional space with a drift in the z-direction. A laser, on the z-axis, is emitting an electromagnetic wave in the direction of the ion. As the ion drifts along the z-axis, its perception of the frequency of the laser changes according to the Doppler effect. To maintain the correct frequency needed for cooling the ion with the laser, a simple PID controller adjusts the frequency of the laser to remain at the target frequency needed for cooling.");
console.log("");
console.log("=====Execution Parameters=====");
console.log("");
console.log(`Target frequency for cooling: ${TARGET_FREQUENCY_KHZ} kHz`);
console.log(`Random Walk Drift Factor in z-Direction of Ytterbium Ion Trajectory: ${RANDOM_WALK_DRIFT_FACTOR_Z_DIRECTION}`);
console.log(`Laser Pulse Duration: ${LASER_PULSE_DURATION_MS} milliseconds`);
console.log(`PID Controller Adjustment Time Interval: ${DIRECTIONAL_VELOCITY_TIME_INTERVAL} milliseconds`);
console.log("");

const ytterbiumIonTrajectory = generateYtterbiumIonTrajectory(LASER_PULSE_DURATION_MS);

const res = laserPulse(
    LASER_PULSE_DURATION_MS,
    TARGET_FREQUENCY_KHZ,
    {
        x: 0,
        y: 0,
        z: 1,
    },
    {
        x: 0,
        y: 1,
        z: 0,
    },
    5,
    2,
    {
        x: 0,
        y: 0,
        z: 10,
    },
    ytterbiumIonTrajectory,
);
console.log("===Results===");
console.table(res.resultLog);

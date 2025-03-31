import "mocha";
import { expect } from "chai";

import { mockTrajectory } from "./assets.js";
import { adjustFrequencyToCompensateForDopplerShift } from "../adjustFrequency.js";
import { ResultLog } from "../interfaces.js";
import { laserPulse } from "../laser.js";
import { LASER_PULSE_DURATION_MS, TARGET_FREQUENCY_KHZ } from "../laserConfigurations.js";

describe("Laser", () => {
    it("Should return the correct electric wave vector", () => {
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
            mockTrajectory,
        );

        // Expectations
        expect(res.electricFieldVector[38].magnitude).to.equal(-1.545284325440326);
        expect(res.electricFieldVector[38].direction.x).to.equal(0);
        expect(res.electricFieldVector[38].direction.y).to.equal(1);
        expect(res.electricFieldVector[38].direction.z).to.equal(0);
    });

    it("Should decrease the frequency of the laser if the ion is moving toward the laser", () => {
        const resultLog: ResultLog[] = [];
        const adjustedMockTrajectory = JSON.parse(JSON.stringify(mockTrajectory));
        // Adjust the mock trajectory so that the ion is moving closer to the laser between t=5 and t=11
        for (let i = 5; i < 12; i++) {
            adjustedMockTrajectory.z[i] = (1 + ((i - 4) * 0.1));
        }
        const frequencyAdjustment = adjustFrequencyToCompensateForDopplerShift(
            10,
            100,
            0,
            0,
            adjustedMockTrajectory,
            100,
            resultLog,
        );

        expect(frequencyAdjustment.adjustment).to.be.lessThan(0);
    });

    it("Should increase the frequency of the laser if the ion is moving away from the laser", () => {
        const resultLog: ResultLog[] = [];
        const adjustedMockTrajectory = JSON.parse(JSON.stringify(mockTrajectory));
        // Adjust the mock trajectory so that the ion is moving closer to the laser between t=5 and t=11
        for (let i = 5; i < 12; i++) {
            adjustedMockTrajectory.z[i] = (0 - ((i - 4) * 0.1));
        }
        const frequencyAdjustment = adjustFrequencyToCompensateForDopplerShift(
            10,
            100,
            0,
            0,
            adjustedMockTrajectory,
            100,
            resultLog,
        );

        expect(frequencyAdjustment.adjustment).to.be.greaterThan(0);
    });
});

import "mocha";
import { expect } from "chai";

import { calculatePerceivedFrequency, pidFrequencyController } from "../pidController.js";

describe("PID Controller", () => {
    it("Frequency adjustment should be more aggressive if frequency is consistently below target", () => {
        const smallDipAdjustment = pidFrequencyController(0, -5, 0);
        const consistentShortfallAdjustment = pidFrequencyController(0, -5, -20);
        expect(smallDipAdjustment.adjustment).to.be.lessThan(consistentShortfallAdjustment.adjustment);
    });

    it("Frequency adjustment should be more aggressive if frequency is below target and falling", () => {
        const smallDipAdjustment = pidFrequencyController(-5, -5, 0);
        const dipAndFallingAdjustment = pidFrequencyController(0, -5, 0);
        expect(smallDipAdjustment.adjustment).to.be.lessThan(dipAndFallingAdjustment.adjustment);
    });

    it("Perceived frequency should be higher if ion is moving toward laser", () => {
        const perceivedFrequencyShiftMoving = calculatePerceivedFrequency(100, 2);
        const perceivedFrequencyShiftStatic = calculatePerceivedFrequency(100, 0);
        expect(perceivedFrequencyShiftMoving).to.be.greaterThan(perceivedFrequencyShiftStatic);
    });
});

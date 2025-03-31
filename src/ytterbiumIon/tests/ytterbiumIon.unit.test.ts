import "mocha";
import { expect } from "chai";

import { randomWalkWithDrift } from "../randomWalkWithDrift.js";

describe("Random Walk With Drift", () => {
    it("Ion should drift in positive z direction when drift is applied in that direction", () => {
        const trajectory = randomWalkWithDrift(-10, 10, 0.4, 100);
        expect(trajectory[100]).to.be.greaterThan(0);
    });

    it("Ion should drift in negative z direction when drift is applied in that direction", () => {
        const trajectory = randomWalkWithDrift(-10, 10, -0.4, 100);
        expect(trajectory[100]).to.be.lessThan(0);
    });
});

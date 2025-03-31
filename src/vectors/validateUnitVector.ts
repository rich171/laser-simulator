// Verify that a vector is a unit vector
import { UnitVector } from "./vectorInterface.js";

export const validateUnitVector = (vector: UnitVector) => {
    const magnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
    if (magnitude !== 1) {
        throw new Error(`The provided vector, ${vector} is not a unit vector`);
    }
};

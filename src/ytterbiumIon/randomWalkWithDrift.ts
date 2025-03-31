export const randomWalkWithDrift = (
    minValue: number,
    maxValue: number,
    driftFactor: number, // Must be between -0.5 and 0.5 and the sign will determine the direction of the drift
    stepCount: number,
    maxAttemptsToGetValueInRange = 100,
) : number[] => {
    if (driftFactor < -0.5 || driftFactor > 0.5) {
        throw new Error("Drift factor must be between -0.5 and 0.5");
    }

    let position = (minValue + maxValue) / 2;
    const trajectory = [position];
    for (let t = 0; t <= stepCount; t++) {
        let attemptCount = 0;
        do {
            // Step in positive or negative direction with randomized magnitude
            const stepMagnitude = Math.random() * (maxValue - minValue) * 0.05;
            const stepDirection : boolean = (Math.random() + driftFactor) > 0.5;
            position = stepDirection ? position + stepMagnitude : position - stepMagnitude;
            attemptCount++;
        } while ((position < minValue || position > maxValue) && attemptCount < maxAttemptsToGetValueInRange);

        const boundedPosition = Math.min(maxValue, Math.max(minValue, position));
        trajectory.push(boundedPosition);
    }

    return trajectory;
};

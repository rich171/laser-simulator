export interface UnitVector {
    x: number,
    y: number,
    z: number,
}

export interface VectorTimeEntry {
    time: number,
    magnitude: number,
    direction: UnitVector
}

export interface ThreeDCoordinate {
    x: number,
    y: number,
    z: number,
}

export interface ThreeDTrajectory {
    x: number[],
    y: number[],
    z: number[]
}

export enum Direction {
    x = "x",
    y = "y",
    z = "z"
}

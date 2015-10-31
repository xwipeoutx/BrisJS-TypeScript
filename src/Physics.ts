export class Point {
	constructor(public x: number, public y: number) {
	}
}

export class Vector {
	constructor(public x: number, public y: number) {
	}

	public static ZERO: Vector = new Vector(0, 0);
}

export interface Body {
	position: Point
	velocity: Vector
	mass: number
}
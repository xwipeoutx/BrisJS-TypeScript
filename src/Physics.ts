export class Point {
	constructor(public x : number, public y : number) {
	}
}

export interface Body {
	position: Point
	mass: number
}
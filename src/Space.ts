import { Body, Point, Vector } from "Physics"

export interface CelestialBody extends Body {
	name: string,	
	radius: number,
	color: string
}

export class Star implements CelestialBody {
	constructor(public name : string, public position: Point, public radius: number, public mass: number) {		
	}

	get color() { return "white"; }
	
	get velocity() { return Vector.ZERO }
}

export class Planet implements CelestialBody {
	constructor(public name : string, public color : string, public position: Point, public velocity : Vector, public radius: number, public mass: number) {
	}
}
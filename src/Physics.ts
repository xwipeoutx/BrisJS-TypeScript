export class Point {
	constructor(public x: number, public y: number) {
	}

	vectorTo(other: Point) {
		return new Vector(
			other.x - this.x,
			other.y - this.y
		);
	}
}

export class Vector {
	public static ZERO: Vector = new Vector(0, 0);

	constructor(public x: number, public y: number) {
	}

	get length() {
		return Math.sqrt(this.lengthSquared);
	}

	get lengthSquared() {
		return this.x * this.x + this.y * this.y;
	}
}

export interface Body {
	position: Point
	velocity: Vector
	mass: number
}

export class PhysicsBuilder {
	private steps: PhysicsStep[] = []
	private stepSize: number = null;
	private speedMultiplier: number = null;

	constructor() {
	}

	public inertia(body: Body): PhysicsBuilder {
		return this.addStep(new Inertia(body));
	}

	public gravity(body: Body, satellite: Body) {
		return this.addStep(new Gravity(body, satellite));
	}

	public clampTo(stepSize: number) {
		this.stepSize = stepSize;
		return this;
	}

	public runAt(speedMultiplier: number) {
		this.speedMultiplier = speedMultiplier;
		return this;
	}
	
	
	public addStep(step : PhysicsStep) {
		this.steps.push(step);
		return this;
	}

	public build(): PhysicsStep {
		var step: PhysicsStep = new CompositeStep(this.steps.slice());

		if (this.stepSize !== null)
			step = new GranularizingStep(step, this.stepSize);

		if (this.speedMultiplier !== null)
			step = new SpeedUpStep(step, this.speedMultiplier);

		return step;
	}
}

export interface PhysicsStep {
	update(dt: number): void
}

class SpeedUpStep implements PhysicsStep {
	constructor(private step: PhysicsStep, private multiplier: number) {
	}

	update(dt: number): void {
		this.step.update(dt * this.multiplier);
	}
}

class GranularizingStep implements PhysicsStep {
	constructor(private step: PhysicsStep, private stepSize: number) {
	}

	update(dt: number): void {
		do {
			this.step.update(Math.min(this.stepSize, dt));
		} while ((dt = dt - this.stepSize) > 0)
	}
}

class CompositeStep implements PhysicsStep {
	constructor(private steps: PhysicsStep[]) {
	}

	update(dt: number): void {
		this.steps.forEach(s => s.update(dt));
	}
}

class Inertia implements PhysicsStep {
	constructor(private body: Body) {
	}

	update(dt: number): void {
		this.body.position.x += this.body.velocity.x * dt;
		this.body.position.y += this.body.velocity.y * dt;
	}
}


class Gravity implements PhysicsStep {
	static gravConstant = 6.67408e-11;

	constructor(private body: Body, private satellite: Body) {
	}

	update(dt: number): void {
		var separationVector = this.satellite.position.vectorTo(this.body.position);
		if (separationVector.lengthSquared < 0.001)
			return; // Of course, this is wrong
		
		var gravitationalAcceleration = Gravity.gravConstant * this.body.mass / separationVector.lengthSquared;

		var dx = (separationVector.x / separationVector.length) * gravitationalAcceleration * dt
		var dy = (separationVector.y / separationVector.length) * gravitationalAcceleration * dt

		this.satellite.velocity.x += dx;
		this.satellite.velocity.y += dy;

	}
}
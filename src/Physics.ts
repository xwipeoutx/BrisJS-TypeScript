export class Point {
	constructor(public x: number, public y: number) {
	}
	
	vectorTo(other : Point) {
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
	private steps : PhysicsStep[] = []
	
	constructor() {		
	}	
	
	public inertia(body : Body) : PhysicsBuilder {
		this.steps.push(new Inertia(body));
		return this;
	}
	
	public gravity(body : Body, satellite : Body) {
		this.steps.push(new Gravity(body, satellite));
		return this;
	}
	
	public build() : PhysicsStep {
		return new CompositeStep(this.steps.slice());
	}
}

export interface PhysicsStep {
	update(dt : number) : void
}

class CompositeStep implements PhysicsStep {
	constructor(private steps : PhysicsStep[]) {		
	}
	
	update(dt : number) : void {
		this.steps.forEach(s => s.update(dt));
	}
}

class Inertia implements PhysicsStep {
	constructor(private body : Body) {
	}
	
	update(dt : number) : void {
		this.body.position.x += this.body.velocity.x * dt;
		this.body.position.y += this.body.velocity.y * dt;
	}
}


class Gravity implements PhysicsStep {
	static gravConstant = 6.67408e-11;
	
	constructor(private body : Body, private satellite : Body) {
	}
	
	update(dt : number) : void {
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
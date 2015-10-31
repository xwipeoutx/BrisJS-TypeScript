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

export class PhysicsBuilder {
	private steps : PhysicsStep[] = []
	
	constructor() {		
	}	
	
	public inertia(body : Body) : PhysicsBuilder {
		this.steps.push(new Inertia(body));
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
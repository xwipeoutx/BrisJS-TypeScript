/// <reference path="../typings/d3/d3.d.ts" />

import * as d3 from "d3";
import { Body, Point } from "Physics"
import { CelestialBody, Star, Planet } from "Space"

class Application {
	private bodies: CelestialBody[] = [];

	start() {
		var sun = new Star("Sun", new Point(0, 0), 10e9, 1.989e30);
		var mercury = new Planet("Mercury", "orange", new Point(57.91e9, 0), 2.4e9, 3.285e23);
		var venus = new Planet("Venus", "purple", new Point(0, 108.2e9), 6e9, 4.867e24);
		var earth = new Planet("Earth", "blue", new Point(0, -149.6e9), 7e9, 5.972e24);
		var mars = new Planet("Mars", "red", new Point(-227e9, 0), 3.4e9, 639e21);

		this.bodies.push(sun, mercury, venus, earth, mars);
		this.draw();
	}

	draw() {
		var circles = d3.select('svg')
			.selectAll('circle')
			.data(this.bodies, body => body.name);

		circles.enter()
			.append('circle')
			.attr('r', body => body.radius / 1e9)
			.style("fill", body => body.color);

		circles.exit().remove();

		circles
			.attr('cx', body => body.position.x / 1e9)
			.attr('cy', body => body.position.y / 1e9);
	}
}

export = Application;
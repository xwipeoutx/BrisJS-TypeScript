/// <reference path="../typings/d3/d3.d.ts" />

import * as d3 from "d3";

class Application {
	start() {
		var sun = {
			name: "Sol",
			x: 0,
			y: 0,
			radius: 10,
			color: "white"
		};

		var mercury = {
			name: "Mercury",
			x: 50,
			y: 0,
			radius: 3,
			color: "orange"
		};

		var venus = {
			name: "Venus",
			x: 0,
			y: 80,
			radius: 5,
			color: "purple"
		};

		var earth = {
			name: "Earth",
			x: 0,
			y: -120,
			radius: 6,
			color: "blue"
		}

		var bodies = [sun, mercury, venus, earth];

		var circles = d3.select('svg')
			.selectAll('circle')
			.data(bodies, body => body.name);

		circles.enter()
			.append('circle')
			.attr('r', body => body.radius)
			.style("fill", body => body.color);

		circles.exit().remove();

		circles
			.attr('cx', body => body.x)
			.attr('cy', body => body.y);
	}
}

export = Application;
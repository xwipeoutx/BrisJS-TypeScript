/// <reference path="../typings/requirejs/require.d.ts" />

require.config({
	paths: {
		'd3': 'lib/d3'
	},
    shim: {
		"d3": { exports: "d3" }
	}
});

require(['Application'], function(Application : any) {
	var app = new Application();
	app.run();
});
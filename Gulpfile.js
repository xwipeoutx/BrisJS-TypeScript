var gulp = require("gulp"),
	ts = require("gulp-typescript"),
	mainBowerFiles = require("main-bower-files");

var tsProject = ts.createProject("tsconfig.json");

gulp.task("ts", function () {
	return gulp.src(['src/**/*.ts'])
		.pipe(ts(tsProject))
		.pipe(gulp.dest("dist"));
});

gulp.task("html", function () {
	return gulp.src("src/**/*.html")
		.pipe(gulp.dest("dist"));
});

gulp.task("bower", function() {
    gulp.src(mainBowerFiles())
		.pipe(gulp.dest("dist/lib"));
});

gulp.task("build", ['ts', 'html', 'bower'], function () {	
});

gulp.task('watch', ['build'], function() {
    gulp.watch(['src/**/*.ts', 'src/**/*.html'], ['build']);
});

gulp.task("default", ['build']);
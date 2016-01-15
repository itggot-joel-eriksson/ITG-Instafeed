var gulp = require("gulp"),
    sass = require("gulp-sass"),
    webserver = require("gulp-webserver"),
    autoprefixer = require("gulp-autoprefixer");

gulp.task("webserver", function() {
    gulp.src(".")
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: "index.html"
    }));
});

gulp.task("sass", function() {
    gulp.src("sass/*.sass")
        .pipe(sass({
            outputStyle: "expanded",
            indentType: "tab",
            indentWidth: 1
        }))
        .pipe(gulp.dest("css"));
});

gulp.task("autoprefix", function() {
    gulp.src("css/*.css")
        .pipe(autoprefixer({
            browsers: ["last 3 versions"],
            cascade: false
        }))
        .pipe(gulp.dest("css"));
});

gulp.task("watch", function() {
    gulp.watch("sass/*.sass", ["sass"]);
    gulp.watch("css/*.css", ["autoprefix"]);
});

gulp.task("default", ["webserver", "sass", "autoprefix", "watch"], function() {

});

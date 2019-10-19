import gulp from "gulp"; 
import del from "del";
import babelify from "babelify";
import bro from "gulp-bro";

import g_pug from "gulp-pug";
import g_img from "gulp-image";

import sass from "gulp-sass";
sass.compiler = require("node-sass");
import autoprefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";

import g_ws from "gulp-webserver";
import ghPages from "gulp-gh-pages";

import concat from "gulp-concat";
import uglify from "gulp-uglify";
import stripDebug from "gulp-strip-debug";
import merge from "merge-stream";

import gulpif from "gulp-if";

const COMPONENTS = [
  "src/components/jquery/jquery-3.4.1.min.js",
  "src/components/pagepiling/jquery.pagepiling.js",
  "src/components/sweet/sweet2.min.js",
  "src/components/sweet/polyfill.js"
];

const COMPONENTS_CSS = [
  "src/components/flexboxgrid/flexboxgrid.min.css",
  "src/components/pagepiling/jquery.pagepiling.css"
];

const ROUTES = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build"
  },
  img: {
    src: "src/img/*",
    dest: "build/img"
  },
  js : {
    watch : "src/js/**/*.js",
    src : "src/js/main.js",
    dest: "build/js"
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css"
  }
};
var production = false;

const components = () => {
  var JS_TASK, CSS_TASK;
  JS_TASK = gulp.src(COMPONENTS)
    .pipe(concat('bundle.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(ROUTES.js.dest));
  CSS_TASK = gulp.src(COMPONENTS_CSS)
    .pipe(concat('bundle.css'))
    .pipe(miniCSS())
    .pipe(gulp.dest(ROUTES.scss.dest));
  return merge(JS_TASK, CSS_TASK);
}

const pugBuild = () => {
  return gulp
    .src(ROUTES.pug.src)
    .pipe(g_pug())
    .pipe(gulp.dest(ROUTES.pug.dest));
};

const imgBuild = () => {
  return gulp
    .src(ROUTES.img.src)
    .pipe(g_img())
    .pipe(gulp.dest(ROUTES.img.dest));
};

const jsBuild = () => {
  return gulp
    .src(ROUTES.js.src)
    .pipe(bro({
      transform: [
        babelify.configure({ presets: ["@babel/preset-env"] }),
        [ 'uglifyify', { global: true } ]
      ]
    }))
    .pipe( gulpif(production, stripDebug()) )
    .pipe( gulp.dest(ROUTES.js.dest) );
}

const webserver = () => {
  return gulp
    .src("build")
    .pipe(
      g_ws({ livereload: true, open: true })
    );
};

const scssBuild = () => {
  return gulp
    .src(ROUTES.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(miniCSS())
    .pipe(gulp.dest(ROUTES.scss.dest));
};

const deploy = () =>{
  return gulp
    .src("build/**/*")
    .pipe(ghPages({
      brach: "release"
    }));
}

const watch = () => {
  gulp.watch(ROUTES.pug.watch, pugBuild);
  gulp.watch(ROUTES.scss.watch, scssBuild);
  gulp.watch(ROUTES.js.watch, jsBuild);
  gulp.watch(ROUTES.img.src, imgBuild);
};

const clean = () => {
  return del(["build/", ".publish"]);
};

const onProduct = (done) => {
  production = true;
  done();
}

const live = gulp.parallel([webserver, watch]);
const prepare = gulp.series([clean, components, imgBuild]);
const assets = gulp.series([pugBuild, scssBuild, jsBuild]);

export const build = gulp.series([prepare, assets])
export const dev = gulp.series([build, live]);
export const release = gulp.series([onProduct, build, deploy]);


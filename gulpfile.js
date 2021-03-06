var gulp = require('gulp'),
    nodemon = require('gulp-nodemon')
    karma = require('karma').server,
    mocha = require('gulp-mocha'),
    protractor = require('gulp-protractor').protractor,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps')
    open = require('gulp-open');

/*
    run karma unit tests - continuous
 */
gulp.task('karma', function(done) {
   karma.start({
       configFile: __dirname + '/karma.conf.js'
   }, done)
});

/*
    run the mocha unit tests for node
*/
gulp.task('node-tests', function(done) {
    return gulp.src(['server/tests/**/*.spec.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }));
});

/*
    run the e2e protractor tests
*/
gulp.task('protractor', function(done) {
    return gulp.src(['app/tests/e2e/**/*.spec.js'], { read: false })
        .pipe(protractor({
            configFile: 'protractor.conf.js'
        }));
});

/*
    start nodemon!
 */
gulp.task('node',function() {
    return nodemon({ script: 'server.js' });
});

/*git
    file watchers
 */
gulp.task('watchers', function() {
    //rerun mocha tests on any server js save
    gulp.watch(['server/**/*.js'], ['node-tests']);
});

/*
    package json
 */
gulp.task('package', function() {
   return gulp.src('public/app/**/*.js')
       .pipe(sourcemaps.init())
       .pipe(uglify())
       .pipe(concat('all.min.js'))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('public/build/'));
});

/*
    open browser to localhost:3030
 */
gulp.task('chrome', function() {
   var opts = { url: "http://localhost:3030", app: "google-chrome" };
   gulp.src(['public/app/index.html'], { read: true })
       .pipe(open("", opts));
});


//run a full test spec
gulp.task('default', ['node']);

//run node tests
gulp.task('test:node',['node-tests']);

//run karma tests
gulp.task('test:karma',['karma']);

//run protractor tests
gulp.task('test:protractor',['node','protractor']);
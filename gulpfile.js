//dependecies
const gulp = require('gulp'),
    run = require('run-sequence'),
    browserify = require('browserify'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    src = 'dev',
    dest = 'prod',
    allFiles = '/**/*.*';

//task
const compile = 'compile',
    clean = 'clean',
    cleanCompile = 'clean:compile',
    watch = 'watch',
    start = 'start',
    serve = 'serve',
    reload = 'reload';

let reloadListener;

//start clean compile watch serve

gulp.task(start,function(done){
    console.log(`***${start} task started***`)
    run(clean,compile,watch,serve,function(){
        console.log(`***${start} task finished***`)
        done()
    })
})

gulp.task(clean,function(done){
    console.log(`***${clean} task started***`)
    //if(reloadListener) reloadListener.removeListener('change',browserSync.reload)
    return del(dest)
    //done()
    //done()
})

gulp.task(compile,function(){
    console.log(`***${compile} task started***`)
    return gulp.src(src+'/**/*.*').pipe(gulp.dest(dest)).on('error',function(){
        console.log(`***error in ${compile}***`)
    });
})

gulp.task(watch,function(done){
    console.log(`***${watch} task started***`)
    console.log(`watched path: ${src}${allFiles}`)
    gulp.watch(src+allFiles,[cleanCompile]).on('error',function(){
        console.log(`***error in ${watch}***`)
    })
    console .log(`***${watch} task finished***`)
    done()
})

gulp.task(serve, function(done){
    console .log(`***${serve} task started***`)
    browserSync.init({
        proxy:'localhost:3000'
    })
    console .log(`***${dest}${allFiles} watched files***`)
    //if(!reloadListener) reloadListener =
    //reloadListener = gulp.watch(`${dest}${allFiles}`)
        //.on('change',browserSync.reload)
    browserSync.reload();
        //.unwatch(`${dest}${allFiles}`)
        //.on('change',browserSync.reload)
        //.on('error',function(err){console.log(err)})
    console .log(`***${serve} task finished***`)
    done()
})


gulp.task(reload, function(done){
    console .log(`***${reload} task started***`)
    browserSync.reload();
    console .log(`***${reload} task finished***`)
    done()
})





gulp.task(cleanCompile,function(done){
    console .log(`***${cleanCompile} task started***`)
    run(clean,compile,reload,function(){
        console .log(`***${cleanCompile} task finished***`)
        //if(!reloadListener) reloadListener = browserSync.watch(`${dest}${allFiles}`).on('change',browserSync.reload)
        done()
    })
})







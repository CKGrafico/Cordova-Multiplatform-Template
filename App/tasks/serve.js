var path = require('path');
var gulp = require('gulp');
var ripple = require('ripple-emulator');
var o = require('open');
var exec = require('child_process').exec

gulp.task('serve:test', [], function(cb){
    exec('ionic serve', function(err, stdout, stderr){
        
    });
    cb();
});

gulp.task('serve:test:stop', [], function(cb){
    exec('ionic quit', function(err, stdout, stderr){
        
    });
    cb();
});

gulp.task('serve:test:ripple', [], function(cb) {

    var options = {
        //remote: 'http://localhost:8100/'
    };

    // Start the ripple server
    ripple.emulate.start(options);

    o('http://localhost:4400?enableripple=cordova-3.0.0-iPhone5');


    cb();
});
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        uglify: {
            dist: {
                files: {
                    'assets/js/scripts.min.js': [ 'assets/js/_*.js'   ],
                    'assets/js/ie.min.js':      [ 'assets/js/ie/*.js' ],
                    'assets/js/d3.min.js': 		[ 'assets/js/lib/*.js']
                },
                options: {
                  sourceMap: false
                }
            },
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    bundleExec: true,
                    compass: true,
                    sourcemap: false,
                    lineNumbers: true,
                    require: 'susy'
                },
                files: {
                    'assets/css/screen.css': [ 'assets/sass/screen.scss' ]
                }
            }
        },
        watch: {
            sass: {
                files: [ 'assets/sass/screen.scss' ],
                tasks: [ 'sass' ],
                options: [true]
            },
            uglify: {
	            files: [
	            	'assets/js/_*.js'
	            ],
	            tasks: [
	            	'uglify:dist'
	            ]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');



    // Default task(s).
    grunt.registerTask('default', [
        'uglify:dist',
        'sass',
        'watch'
    ]);

};

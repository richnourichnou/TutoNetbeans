module.exports = function (grunt) {
	// measures the time each task takes
	require('time-grunt')(grunt);


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			css: {
				src: ['css/reset.css', 'css/grid.css', 'css/superfish.css', 'css/style.css', 'css/camera.css', 'css/form.css', 'css/*'],
				dest: 'dist/css/styles.css'
			},
			js: {
				src: ['js/jquery.js', 'js/jquery-migrate-1.1.1.js', 'js/superfish.js', 'js/forms.js', 'js/jquery.ui.totop.js',
					'js/jquery.equalheights.js', 'js/jquery.easing.1.3.js', 'js/jquery.ui.totop.js', 'js/tms-0.4.1.js', 'js/app.js', 'js/*'
				],
				dest: 'dist/js/javascript.js'
			}
		},
		cssmin: {
			css: {
				src: 'dist/css/styles.css',
				dest: 'dist/css/styles.min.css'
			}
		},
		uglify: {
			js: {
				options: {
					sourceMap: true,
					sourceMapName: 'dist/js/javascript.map',
					mangle: {
						except: ['jQuery']
					}
				},
				files: {
					'dist/js/javascript.min.js': ['dist/js/javascript.js']
				}
			}
		},
		processhtml: {
			build: {
				files: {
					'index.tmp.html': ['index.html'],
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'index.tmp.html'
				}
			}
		},
		imagemin: {
			png: {
				options: {
					optimizationLevel: 7
				},
				files: [{
						expand: true,
						cwd: 'img/',
						src: ['**/*.png'],
						dest: 'dist/img/',
						ext: '.png'
					}]
			},
			gif: {
				options: {
					optimizationLevel: 7
				},
				files: [{
						expand: true,
						cwd: 'img/',
						src: ['**/*.gif'],
						dest: 'dist/img/',
						ext: '.gif'
					}]
			},
			jpg: {
				options: {
					progressive: true
				},
				files: [{
						expand: true,
						cwd: 'img/',
						src: ['**/*.jpg'],
						dest: 'dist/img',
						ext: '.jpg'
					}]
			}
		},
		watch: {
			css: {
				files: ['!dist/**.css', 'css/*.css'],
				tasks: ['concat:css', 'cssmin:css']
			},
			js: {
				files: ['!dist/**.js', 'js/*.js'],
				tasks: ['concat:js', 'uglify:js']
			},
			html: {
				files: ['!dist/**.html', 'index.html'],
				tasks: ['processhtml', 'htmlmin']
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: ["dist/css/*.css", "dist/*.html"]
				},
				options: {
					server: {
						baseDir: "./dist/"
					},
					options: {
						watchTask: true // < VERY important

					}
				}
			}
		}

	});
	// Chargement des modules "outils"
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');

	// Chargement des modules "actions"
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-processhtml');


	// Définitions des tâches
	grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify:js', 'processhtml', 'htmlmin', 'imagemin']);
	grunt.registerTask('dev', ['browserSync', 'watch']);
};
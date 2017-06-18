module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['app/app.js',
              'app/scripts/angular-animate.js',
              'app/view1/view1.js',
              'app/view2/view2.js',
              'app/controllers/View2Ctrl.js',
              'app/factories/portFactory.js',
              'app/factories/shipFactory.js',
              'app/directives/ngFocus.js',
              'app/directives/shipAnimation.js',
              'app/directives/moneyMask.js',
              'app/components/version/version.js',
              'app/components/version/version-directive.js',
              'app/components/version/interpolate-filter.js',],
        dest: 'app/min/chinaSeas.js',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'app/min/chinaSeas.js',
        dest: 'app/min/chinaSeas.min.js'
      }
    },
    htmlmin: {                                     // Task
    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
      files: {                                   // Dictionary of files
        'app/view2/view2min.html': 'app/view2/view2.html',     // 'destination': 'source'

      }
    },
  }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'htmlmin']);

};

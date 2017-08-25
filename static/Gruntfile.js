var foundationBasePath =      'bower_components/foundation-sites/',
    foundationScssPath =      foundationBasePath+'scss/',
    bowerPath =               'bower_components/',
    foundationJsVendorPath =  bowerPath+'jquery/dist/',
    foundationJsPrefix =      foundationBasePath+'js/foundation.';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: [foundationScssPath]
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true
        },
        files: {
          'css/app.min.css': 'src/scss/app.scss'
        }
      }
    },

    concat: {
      options: {
        separator: ';',
        banner: '\n',
      },
      vendor: {
        src: [
          foundationJsVendorPath + 'jquery.min.js',
          foundationJsPrefix + 'core.js',
          foundationJsPrefix + 'util.*.js',
          // Paths to individual JS components defined below
          foundationJsPrefix + 'accordion.js',
          foundationJsPrefix + 'abide.js',
          foundationJsPrefix + 'accordionMenu.js',
          foundationJsPrefix + 'drilldown.js',
          foundationJsPrefix + 'dropdown.js',
          foundationJsPrefix + 'dropdownMenu.js',
          foundationJsPrefix + 'equalizer.js',
          foundationJsPrefix + 'interchange.js',
          foundationJsPrefix + 'magellan.js',
          foundationJsPrefix + 'offcanvas.js',
          foundationJsPrefix + 'orbit.js',
          foundationJsPrefix + 'responsiveMenu.js',
          foundationJsPrefix + 'responsiveToggle.js',
          foundationJsPrefix + 'reveal.js',
          foundationJsPrefix + 'slider.js',
          foundationJsPrefix + 'sticky.js',
          foundationJsPrefix + 'tabs.js',
          foundationJsPrefix + 'toggler.js',
          foundationJsPrefix + 'tooltip.js',
          foundationJsPrefix + 'zf.responsiveAccordionTabs.js'

          //your script
        ],

        dest: 'js/app.js'
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: {
          'js/app.min.js':['js/app.babeled.js']
        }
      }
    },

    babel: {
      dist: {
        files: {
          'js/app.babeled.js': 'js/app.js'
        }
      }
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['development-task']
      },
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['development-task']
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['development-task']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('development-task', ['sass:dist','concat:vendor', 'babel', 'uglify']);

  grunt.registerTask('default', ['development-task','watch']);
}

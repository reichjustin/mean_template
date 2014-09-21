module.exports = (grunt) ->
  grunt.initConfig
    pkgFile: 'package.json'

    files:
      adapter: ['src/adapter.js']

    build:
      adapter: '<%= files.adapter %>'

    # JSHint options
    # http://www.jshint.com/options/
    jshint:
      adapter:
        files:
          src: '<%= files.adapter %>'
        options:
          browser: true,
          strict: false
          undef: false
          camelcase: false

      options:
        quotmark: 'single'
        camelcase: true
        strict: true
        trailing: true
        curly: true
        eqeqeq: true
        immed: true
        latedef: true
        newcap: true
        noarg: true
        sub: true
        undef: true
        boss: true
        globals: {}

    karma:
      adapter:
        configFile: 'karma-v0.8.conf.js'
        autoWatch: false
        singleRun: true
        reporters: ['dots']

    'npm-publish':
      options:
        requires: ['build']
        abortIfDirty: true

    bump:
      options:
        commitMessage: 'chore: release v%VERSION%'
        pushTo: 'upstream'

  grunt.loadTasks 'tasks'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-npm'
  grunt.loadNpmTasks 'grunt-bump'
  grunt.loadNpmTasks 'grunt-auto-release'

  grunt.registerTask 'default', ['build', 'jshint', 'test']
  grunt.registerTask 'test', ['karma']

  grunt.registerTask 'release', 'Build, bump and publish to NPM.', (type) ->
    grunt.task.run [
      'build',
      "bump:#{type||'patch'}",
      'npm-publish'
    ]

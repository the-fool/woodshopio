module.exports = function(config) {
    var bowerDir = '../components/';
    var staticDir = '../woodshop/bazaar/static/'
    config.set({
        basePath: '..',
        
        preprocessors: {
            'woodshop/bazaar/static/js/*.js': ['jshint'],
            'woodshop/bazaar/static/partials/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: "woodshop/bazaar",
        },
        reporters: ['progress'],
        files: [
            bowerDir + 'bower_components/jquery/dist/jquery.js',
            '../node_modules/jasmine-jquery/lib/jasmine-jquery.js',
            bowerDir + 'bower_components/angular/angular.js',
            //baseDir + 'bower_components/angular-route/angular-route.js',
            bowerDir + 'bower_components/angular-resource/angular-resource.js',
            //baseDir + 'bower_components/angular-mocks/angular-mocks.js',
            staticDir + 'js/**/*.js',
            staticDir + 'partials/*.html',
            staticDir + 'partials/**/*.html',
            'frontend/unit/**/*.js'
           ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Firefox'],

        plugins: [
            'karma-jshint-preprocessor',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            ],

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            }
        },


    });
};
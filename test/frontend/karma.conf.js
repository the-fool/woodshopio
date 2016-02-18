module.exports = function(config) {
    var bowerDir = '../components/bower_components/';
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
            bowerDir + 'jquery/dist/jquery.js',
            '../node_modules/jasmine-jquery/lib/jasmine-jquery.js',
            bowerDir + 'angular/angular.js',
            //baseDir + 'angular-route/angular-route.js',
            bowerDir + 'angular-resource/angular-resource.js',
            //baseDir + 'angular-mocks/angular-mocks.js',
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
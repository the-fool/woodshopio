module.exports = function(config) {
    var bowerDir = '../components/bower_components/';
    var staticDir = '../woodshop/frontend/**/static/'
    config.set({
        basePath: '..',
        
        preprocessors: {
            'woodshop/frontend/**/static/js/*.js': ['jshint'],
            'woodshop/frontend/**/static/partials/**/*.html': ['ng-html2js'],
            'woodshop/frontend/static/common_partials/*.html' : ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: "woodshop/frontend/bazaar",
            stripPrefix: "woodshop/frontend"
        },
        reporters: ['progress'],
        files: [
            bowerDir + 'jquery/dist/jquery.js',
            '../node_modules/jasmine-jquery/lib/jasmine-jquery.js',
            bowerDir + 'angular/angular.js',
            bowerDir + 'angular-route/angular-route.js',
            bowerDir + 'angular-resource/angular-resource.js',
            bowerDir + 'angular-mocks/angular-mocks.js',
            staticDir + 'js/**/*.js',
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
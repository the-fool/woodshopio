module.exports = function(config) {
    var bowerDir = '../components/bower_components/';
    var appStaticDir = '../woodshop/frontend/**/static/';
    var commonStaticDir = '../woodshop/frontend/static/';
    var nodeDir = '../node_modules/';
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
            nodeDir + 'jasmine-jquery/lib/jasmine-jquery.js',
            bowerDir + 'angular/angular.js',
            bowerDir + 'angular-route/angular-route.js',
            bowerDir + 'angular-resource/angular-resource.js',
            bowerDir + 'angular-mocks/angular-mocks.js',
            appStaticDir + 'js/**/*.js',
            appStaticDir + 'partials/**/*.html',
            commonStaticDir + 'js/**/*.js',
            commonStaticDir + 'partials/common_partials/*.html',
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
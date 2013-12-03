var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            var parts = file.split('/');
            parts = parts[parts.length-1].split('.');
            tests.push('jsx!test/'+parts[0]);
        }
    }
}

require.config({
    baseUrl: '/base',

    paths: {
        lib: 'lib',
        core: 'js/core',
        test: 'js/react/test',

        // Aliases for libraries, so that we can change versions from here
        libreact: 'js/bower_components/react/react.min',
        JSXTransformer: 'js/bower_components/react/JSXTransformer',
        jsx: 'js/lib/require-jsx',
        jquery: 'js/bower_components/jquery/jquery.min',
        lodash: 'js/bower_components/lodash/dist/lodash.min',
        when: 'js/bower_components/when/when'
    },

    shim: {
        JSXTransformer: {
            exports: "JSXTransformer"
        }
    },

    packages: [{
        name: 'cs',
        location: 'bower_components/require-cs',
        main: 'cs'
    }, {
        name: 'coffee-script',
        location: 'bower_components/coffee-script',
        main: 'index'
    }],

    // This is appended to every module loading request, for cache invalidation purposes
//    urlArgs: "bust=" + (new Date()).getTime(),

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

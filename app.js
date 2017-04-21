var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var less = require('metalsmith-less');
var handlebars = require('handlebars');
var rootPath = require('metalsmith-rootpath');
var browserSync = require('metalsmith-browser-sync');
var fs = require('fs');

handlebars.registerPartial('header', fs.readFileSync(__dirname + '/src/templates/header.hbt').toString());
handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/src/templates/footer.hbt').toString());

metalsmith(__dirname)
    .use(markdown())
    .use(less())
    .use(layouts({
        engine: 'handlebars',
        directory: 'src/templates'
    }))
    .use(browserSync({
        server: 'build',
        files: ['src/*', 'src/**/*']
    }))
    .use(rootPath())
    .destination('./build')
    .build(function(err) {
        if (err) throw err;
        console.log('Build finished!');
    });
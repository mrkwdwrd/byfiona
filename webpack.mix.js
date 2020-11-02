const mix = require('laravel-mix');
const ora = require('ora')
const tailwindcss = require('tailwindcss')

require('laravel-mix-merge-manifest');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

var spinner = ora('Building assets...')
spinner.start()

let options = {
  processCssUrls: false,
  postCss: [tailwindcss('./tailwind.config.js')],
}

// Assets build
mix.js('resources/js/app.js', 'js')
  .extract(['lodash', 'slick-carousel', 'selectize'], 'js/vendor.js')
  .sass('resources/scss/vendor.scss', 'css')
  .sass('resources/scss/app.scss', 'css/app.css')
  .options(options)
  .sourceMaps()
  .mergeManifest()
  .then(function () {
    spinner.stop()
  });

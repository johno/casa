var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var fm = require('json-front-matter')

var renderTemplate = require('./render-template')

module.exports = function renderPage (page, templates) {
  var fileContents = fs.readFileSync(page, 'utf8')

  var fmParsed = fm.parse(fileContents)
  var frontMatter = fmParsed.attributes || {}
  fmParsed.url = fmParsed.url || page.split('.html')[0]

  var compiledPage = _.template(fmParsed.body, { 'imports': { '_': _ } })(frontMatter)
  var template = fs.readFileSync(path.resolve(path.dirname(require.main.filename), 'templates/') + '/' + frontMatter.template + '.html')
  frontMatter.content = compiledPage

  var page = _.template(template)(frontMatter)
  var url = fmParsed.url.replace('/pages/', '/') + '/index.html'

  mkdirp(path.dirname(url))
  fs.writeFileSync(url, page)
}

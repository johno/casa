var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var fm = require('json-front-matter')

var readTemplate = require('./read-template')
var renderTemplate = require('./render-template')

module.exports = function renderPage (page, templates) {
  var fileContents = fs.readFileSync(page, 'utf8')

  var fmParsed = fm.parse(fileContents)
  var frontMatter = fmParsed.attributes || {}
  frontMatter.url = fmParsed.url || page.split('.html')[0]

  var compiledPage = _.template(fmParsed.body, { 'imports': { '_': _ } })(frontMatter)
  var template = readTemplate(frontMatter.template)
  frontMatter.content = compiledPage

  var page = _.template(template)(frontMatter)
  var url = frontMatter.url.replace('/pages/', '/') + '/index.html'

  frontMatter.content = page
  page = renderTemplate(frontMatter)

  mkdirp(path.dirname(url))
  fs.writeFileSync(url, page)
}

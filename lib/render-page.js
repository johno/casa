var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var fm = require('json-front-matter')
var isMd = require('is-md')

var markdown = require('./markdown')
var readTemplate = require('./read-template')
var renderTemplate = require('./render-template')

module.exports = function renderPage (page, templates) {
  var fileContents = fs.readFileSync(page, 'utf8')

  var fmParsed = fm.parse(fileContents)
  var frontMatter = fmParsed.attributes || {}

  if (isMd(page)) {
    frontMatter.url = fmParsed.url || page.split('.md')[0]
    fmParsed.body = markdown(fmParsed.body)
    console.log(markdown(fmParsed.body))
    var compiledPage = _.template(fmParsed.body, { 'imports': { '_': _ } })(frontMatter)
  } else {
    frontMatter.url = fmParsed.url || page.split('.html')[0]
    var compiledPage = _.template(fmParsed.body, { 'imports': { '_': _ } })(frontMatter)
  }


  var template = readTemplate(frontMatter.template)
  frontMatter.content = compiledPage

  var page = _.template(template)(frontMatter)
  var url = frontMatter.url.replace('/pages/', '/') + '/index.html'

  frontMatter.content = page
  page = renderTemplate(frontMatter)

  mkdirp(path.dirname(url))
  fs.writeFileSync(url, page)
}

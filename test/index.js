var fs = require('fs')
var test = require('tape')

var renderPage = require('../lib/render-page')
var renderTemplate = require('../lib/render-template')

test('page render', function (t) {
  t.plan(1)

  renderPage('test/pages/test-page.html')
  var testPage = fs.readFileSync('test/test-page/index.html', 'utf8')
  var expected = fs.readFileSync('test/test-page/index.expected.html', 'utf8')
  t.equal(testPage, expected)
})

test('template render', function(t) {
  t.plan(1)

  var renderedTemplate = renderTemplate('test/templates/nested-template.html')
  var expected = fs.readFileSync('test/templates/nested-template.expected.html', 'utf8')
  t.equal(renderedTemplate, expected)
})

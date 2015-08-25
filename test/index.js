var fs = require('fs')
var test = require('tape')
var renderPage = require('../lib/render-page')

test('page render', function (t) {
  t.plan(1)

  renderPage('test/pages/test-page.html')
  var testPage = fs.readFileSync('test/test-page/index.html', 'utf8')
  var expected = fs.readFileSync('test/test-page/index.expected.html', 'utf8')
  t.equal(testPage, expected)
})

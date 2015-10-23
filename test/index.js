import fs from 'fs'
import test from 'ava'

import renderPage from '../lib/render-page'
import readTemplate from '../lib/read-template'
import renderTemplate from '../lib/render-template'

test('page render', function (t) {
  t.plan(1)

  renderPage('test/pages/test-page.html')
  let testPage = fs.readFileSync('test/test-page/index.html', 'utf8')
  let expected = fs.readFileSync('test/test-page/index.expected.html', 'utf8')
  t.same(testPage, expected)
})

test('markdown page render', function (t) {
  t.plan(1)

  renderPage('test/pages/foobar.md')
  let testPage = fs.readFileSync('test/foobar/index.html', 'utf8')
  let expected = fs.readFileSync('test/foobar/index.expected.html', 'utf8')
  t.same(testPage, expected)
})

test('template render', function (t) {
  t.plan(1)

  let template = fs.readFileSync('test/templates/nested-template.html', 'utf8')
  let renderedTemplate = renderTemplate({ content: template })
  let expected = fs.readFileSync('test/templates/nested-template.expected.html', 'utf8')
  t.same(renderedTemplate, expected)
})

test('read template', function (t) {
  t.plan(2)

  let expected = '{{{\n  "template": "nested-nested-template",\n  "foobar": "Some string thing"\n}}}\n<div class="awesome-nested-template"></div>\n'

  t.doesNotThrow(readTemplate)
  t.same(readTemplate('nested-template'), expected)
})

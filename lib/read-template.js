var fs = require('fs')
var path = require('path')

module.exports = function readTemplate (templateName) {
  var templateDir = path.resolve(path.dirname(require.main.filename), 'templates/')
  var template = fs.readFileSync(templateDir + '/' + templateName + '.html', 'utf8')

  return template
}

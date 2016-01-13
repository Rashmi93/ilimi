var parseGitLog = require('./index')
var p = parseGitLog({cwd: 'C:/Users/rashmi n/ilimi/'})

p.then(function (json) {
  console.log(JSON.stringify(json, 0, 2))
})
.catch(function _catch (err) {
  console.log('PROMISE ERR:', err)
})

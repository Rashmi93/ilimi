//code to parse the output of gitlog to json
var parseGitLog = require('./GitLogManager');
var p = parseGitLog({
    cwd: '/home/rashmi/ilimi'
})
p.then(function(json) {

    console.log(JSON.stringify(json, 0, 2))
    return json;
})
    .catch(function _catch(err) {
        console.log('PROMISE ERR:', err)
    })

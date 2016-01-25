//code to retrieve gitlog information and parse it JSON
var fs = require('fs')
var path = require('path')
var runCommand = require('exec-cmd')
var handleCallback = require('handle-callback')

var hybridify = runCommand.hybridify
var stat = hybridify(fs.stat)
var cwd = process.cwd()

module.exports = function parseGitLog(options, callback) {
    if (typeof options === 'function') {
        callback = options
        options = null
    }
    callback = callback || function noop() {}
    options = typeof options === 'object' ? options : {}

    var fp = resolve(options)
    var promise = stat(fp)
        .then(function() {
            return fp
        })
        .then(process.chdir)
        .then(gitLog)
        .then(parseLog)
        .then(restoreCwd)

    // preserve `hybrid`-ing
    promise.hybridify = hybridify
    return handleCallback(promise, callback)
}

function resolve(options) {
    var cwd = options.cwd ? path.resolve(options.cwd) : process.cwd()
    return path.resolve(cwd, options.path || '.git')
}

//executing Gitlog command
function gitLog() {
    return runCommand('git log --stat')
}

//restoring the current working directory
function restoreCwd(json) {
    process.chdir(cwd)
    return json
}
//parse gitlog to json
function parseLog(results) {
    var arr = results[0].split('\n\n')
    var len = arr.length
    var i = 0
    var data = []
    var log = {}
    while (i < len) {
        var value = arr[i++]
        if (value.charAt(0) !== ' ') {
            log = parseGitLog(log, value)
            data.push(log)
            log = {}
        } else {
            log.statsChanged = {}
            log.statsChanged = value
        }
    }
    return data
}

function parseGitLog(log, value) {
    var lines = value.split('\n')
    log.commit = lines[0]
    log.author = lines[1]
    log.date = lines[2]
    return log
}
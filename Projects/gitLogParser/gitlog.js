"use strict";

var exec = require("child_process").exec;
    
var promise = new Promise((resolve, reject) => {
    let data = [],
        child = exec(
        "git -C C:/Users/rashmi n/ilimi/ log --stat",
        (err, stdout, stderr) => {
            if (err) return reject(err);

            function parseLog (results) {
  //console.log(results);
  var arr = results[0].split('\n\n')
  //console.log(arr);
  var len = arr.length
  var i = 0

  var data = []
  var log = {}

  while (i < len) {
    var value = arr[i++]

    if (value.charAt(0) !== ' ') {
      log = metadata(log, value)
      data.push(log)
      log = {}
    } else {
     log.statsChanged = {}
     log.statsChanged=value
    }
  }

  return data
}

function metadata (log, value) {
  //console.log(log)
  //console.log(value)
  var lines = value.split('\n')
  log.commit = lines[0]
  log.author = lines[1]
  log.date = lines[2]
  
  return log
}
}

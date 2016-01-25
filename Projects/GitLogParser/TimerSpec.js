//code to test the output of gitlog through Jasmine test cases

describe("checking for gitlog retrival", function() {
    var log;
    beforeEach(function(done) {
        var parseGitLog = require('./GitLogManager');
        var _ = require('underscore');
        var p = parseGitLog({
                cwd: './'
            })
            //filtering one commit id details
        p.then(function(json) {
            log = _.where(json, {
                commit: "commit d17783e776a37fc5eb5d0d55d8275de7b277207f"
            });
            console.log(log);
            done();
        });
    });
    // check for commit Id
    it("commit check", function() {
        expect(log[0].commit).toEqual("commit d17783e776a37fc5eb5d0d55d8275de7b277207f");
    });
    // check for Author
    it("author check", function() {
        expect(log[0].author).toEqual("Author: rashmi93 <rashmi.n@upgradehr.co>");
    });
    // check for Date
    it("date check", function() {
        expect(log[0].date).toEqual("Date:   Mon Jan 4 12:00:42 2016 +0530");
    });
    // check for statsChanged
    it("statschanged", function() {
        expect(log[0].statsChanged).toEqual(" LOGS.js | 4 ++--\n 1 file changed, 2 insertions(+), 2 deletions(-)");
    });
}, 2000);

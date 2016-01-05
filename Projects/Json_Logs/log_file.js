var _ = require('underscore');
var fs=require('fs');
var readLine = require('readline');
var rl = readLine.createInterface({
   input : require('fs').createReadStream('Test_Data.log')
   });
var file = fs.createWriteStream('output.txt');
    file.on('finish',function(){
    console.log("file has been written");
    });
var events = [];
// Get events
rl.on('line', function(line) {
	events.push(JSON.parse(line));
});

rl.on('close', function() {
// Filter for OE_INTERACT
	var oeEvents = _.where(events, {eid: 'OE_INTERACT'});
// get counts by uid & did using map 
	uidMap = {};
	didMap = {};
	_.each(oeEvents, function(event){
		if(uidMap[event.uid])
		{ uidMap[event.uid]++; }
		else
		{ uidMap[event.uid]=1; }
		
		if(didMap[event.did])
		{ didMap[event.did]++;}
		else
		{ didMap[event.did]=1; }
	});
	// converting uidmap to string
		var uid_tostring=JSON.stringify(uidMap,null,'\n');
		var uid_output = uid_tostring.replace(/\n/g, "\r\n");
	//converting didmap to string
		var did_tostring=JSON.stringify(didMap,null,'\n');
		var did_output = did_tostring.replace(/\n/g, "\r\n");
	//writing to output to file
	    	file.write(uid_output);
	    	file.write(did_output);
	    	file.end();
});

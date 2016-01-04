var _ = require('underscore');
var readLine = require('readline');
var rl = readLine.createInterface({
  input: require('fs').createReadStream('akshara.txt')
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
			if(uidMap[event.uid]){ uidMap[event.uid]++; }
			else
			{ uidMap[event.uid]=1; }
		    if(didMap[event.did]){ didMap[event.did]++;}
		    else
		    { didMap[event.did]=1; }
		   
		});
		 console.log( "UserCount:" ,uidMap,"DeviceCount:",didMap);
		
});

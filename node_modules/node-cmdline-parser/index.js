cmdline = {}

cmdline.get = function(sKey, mDefault = null) {
	for (var i = 1; i <= (process.argv.length-1); i++) {
		if (process.argv[i]=="/"+sKey || process.argv[i]=="-"+sKey || process.argv[i]=="--"+sKey) {
			if (process.argv.length>=i+1) {
				return process.argv[i+1]
			}
		}
	}
	return mDefault
}

cmdline.keyexists = function(sKey) {
	for (var i = 1; i <= (process.argv.length-1); i++) {
		if (process.argv[i]=="/"+sKey || process.argv[i]=="-"+sKey || process.argv[i]=="--"+sKey) {
			return true;
		}
	}
	return false;
}

cmdline.valueexists = function(sValue) {
	for (i = 1; i <= (process.argv.length-1); i++) {
		if (process.argv[i]==sValue) return true;
	}
	return false;
}

cmdline.flagenabled = function(sKey) {
	var regex = new RegExp("\\+([a-zA-Z]*)"+sKey+"([a-zA-Z]*)");
	for (i = 1; i <= (process.argv.length-1); i++) {
		if (process.argv[i].match(regex)) {
			return true;
		}
	}
	return false;
}

cmdline.flagdisabled = function(sKey) {
	var regex = new RegExp("\\-([a-zA-Z]*)"+sKey+"([a-zA-Z]*)");
	for (i = 1; i <= (process.argv.length-1); i++) {
		if (process.argv[i].match(regex)) {
			return true;
		}
	}
	return false;
}

cmdline.flagexists = function(sKey) {
	var regex = new RegExp("(\\+|\\-)([a-zA-Z]*)"+sKey+"([a-zA-Z]*)");
	for (i = 1; i <= (process.argv.length-1); i++) {
		if (process.argv[i].match(regex)) {
			return true;
		}
	}
	return false;
}

cmdline.getvalbyindex = function(iIndex, mDefault = null) {
	if ((process.argv.length-1) >= iIndex) {
		return process.argv[iIndex];
	} else {
		return mDefault;
	}
}

module.exports = cmdline
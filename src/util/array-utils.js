
function arrContains (arr, val) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return true;
		}
	}
	return false;
}


function arrMatchCount (a, b) {
	var out = 0, i, aMap = Object.create(null);
	for (i = 0; i < a.length; i++) {
		aMap[a[i]] = true;
	}
	for (i = 0; i < b.length; i++) {
		if (aMap[b[i]]) {
			out++;
		}
	}
	return out;
}

module.exports = {
	arrContains,
	arrMatchCount
};

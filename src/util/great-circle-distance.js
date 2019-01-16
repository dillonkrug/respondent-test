// const EarthRadius = 3959; // miles
const EarthRadius = 6378; // kilometers

const Pi180 = Math.PI/180;

function degToRad (n) {
	return Pi180*n;
}
var sin = Math.sin,
	cos = Math.cos,
	sqrt = Math.sqrt,
	atan2 = Math.atan2;

function greatCircleDistance (p1, p2) {
	var x1 = degToRad(p1.longitude),
		x2 = degToRad(p2.longitude),
		y1 = degToRad(p1.latitude),
		y2 = degToRad(p2.latitude),
		mx = sin((x2 - x1) / 2),
		my = sin((y2 - y1) / 2);

	var a = (my * my) + cos(y1) * cos(y2) * (mx * mx);
	var c = 2 * atan2(sqrt(a), sqrt(1 - a));

	return EarthRadius * c;
}


module.exports = { greatCircleDistance, EarthRadius };

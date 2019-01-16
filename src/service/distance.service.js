const { Project } = require('../model/project.model');
const { City } = require('../model/city.model');
const { User } = require('../model/user.model');

const { greatCircleDistance } = require('../util/great-circle-distance');

class DistanceService {
	static getUserDistanceFromProject (project, user) {
		return Project
			.getCities(project)
			.reduce((minDist, city) => {
				var cDist = greatCircleDistance(User.getLatLng(user), City.getLatLng(city));
				return cDist < minDist ? cDist : minDist;
			}, Infinity);
	}
}

module.exports = { DistanceService };

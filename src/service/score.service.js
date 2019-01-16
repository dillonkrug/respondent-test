const { Project } = require('../model/project.model');
const { User }= require('../model/user.model');
const { DistanceService } = require('./distance.service');
const { arrContains, arrMatchCount } = require('../util/array-utils');

const MaxDistance = 100;

const ScoreComponents = [{
	name: 'industry component',
	weight: 1,
	value: (project, user) => {
		var pIndustries = Project.getIndustries(project);
		var uIndustries = User.getIndustries(user);
		return arrMatchCount(pIndustries, uIndustries) / pIndustries.length;
	}
}, {
	name: 'title component',
	weight: 1,
	value: (project, user) => {
		var pTitles = Project.getTitles(project),
			uTitle = User.getTitle(user);
		return arrContains(pTitles, uTitle) ? 1 : 0;
	}
}, {
	name: 'location component',
	weight: 1,
	value: (project, user) => {
		var dist = DistanceService.getUserDistanceFromProject(project, user);
		if (dist > MaxDistance) {
			return 0;
		}
		return (MaxDistance - dist) / MaxDistance;
	}
}];

const TotalWeight = ScoreComponents.reduce((total, cmp) => total + cmp.weight, 0);

class ScoreService {
	static getUserScoreForProject (project, user) {
		return ScoreComponents
			.reduce((total, cmp) => {
				var value = cmp.value(project, user);
				return total + (cmp.weight * value);
			}, 0) / TotalWeight;
	}
}

module.exports = {
	ScoreService,
	ScoreComponents,
	TotalWeight
};

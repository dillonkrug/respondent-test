
class Project {
	static fromJson (project) {
		// no casting needed for now.
		return project;
	}

	static getIndustries (project) {
		return project.professionalIndustry;
	}
	static getCities (project) {
		return project.cities;
	}
	static getTitles (project) {
		return project.professionalJobTitles;
	}
}

module.exports = { Project };

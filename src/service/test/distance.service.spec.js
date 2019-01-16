/* eslint-env mocha */
const { expect } = require('chai');

const { greatCircleDistance } = require('../../util/great-circle-distance');

const { DistanceService } = require('../distance.service');

function createUserWithLocation (loc) {
	return {
		firstName: 'one',
		latitude: loc.latitude,
		longitude: loc.longitude
	};
}


function createProjectWithLocations (locs) {
	return {
		cities: locs.map(loc => ({
			location: {
				location: loc
			}
		}))
	};
}

const Points = [
	{ latitude: 39.9525839, longitude: -75.1652215 }, // philadelphia
	{ latitude: 32.7766642, longitude: -96.7969879 }, // dallas
	{ latitude: 40.7127753, longitude: -74.0059728 }, // new york
	{ latitude: 34.0522342, longitude: -118.2436849 } // los angeles
];

const Origin = {
	latitude: 0,
	longitude: 0
};


describe('DistanceService', () => {
	describe('getUserDistanceFromProject()', () => {
		it('returns the user\'s distance from a projects closest city', () => {
			var project = createProjectWithLocations(Points);
			var user = createUserWithLocation(Origin);
			expect(DistanceService.getUserDistanceFromProject(project, user)).to.eql(greatCircleDistance(Origin, Points[2]));
		});
	});
});

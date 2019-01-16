/* eslint-env mocha */
const { expect } = require('chai');


const { greatCircleDistance, EarthRadius } = require('../great-circle-distance');

const ll = (latitude, longitude) => ({
	latitude,
	longitude
});

const Tests = [{
	a: ll(39.9525839, -75.1652215),
	b: ll(40.143992, -75.704093),
	e: 50.62155880281612 // calculated manually
}, {
	a: ll(0, 0),
	b: ll(5, 10),
	e: 1243.2954336703706 // calculated manually
}, {
	a: ll(45, 45),
	b: ll(50, 50),
	e: 671.3582971394031 // calculated manually
}, {
	a: ll(-10, -10),
	b: ll(-10, -10),
	e: 0
}, {
	a: ll(0, 0),
	b: ll(0, 180),
	e: Math.PI * EarthRadius // should be half the circumference
}, {
	a: ll(0, 90),
	b: ll(90, 90),
	e: 0.5 * Math.PI * EarthRadius // should be one quarter the circumference
}];


describe('greatCircleDistance', () => {
	Tests.forEach(({ a, b, e }) => {
		it('calculates the correct distance', () => {
			expect(greatCircleDistance(a, b)).to.eql(e);
		});
	});
});



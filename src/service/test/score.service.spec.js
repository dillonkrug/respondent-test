/* eslint-env mocha */
const { expect } = require('chai');

const greatCircleDistance = require('../../util/great-circle-distance');

const { ScoreService, ScoreComponents, TotalWeight } = require('../score.service');

function createUser ({ location = {}, title, industries }) {
	return {
		firstName: 'one',
		jobTitle: title || null,
		latitude: location.latitude,
		longitude: location.longitude,
		industry: industries || []
	};
}


function createProject ({ location, titles, industries }) {
	return {
		cities: [{
			location: {
				location
			}
		}],
		professionalJobTitles: titles,
		professionalIndustry: industries
	};
}

const Points = [
	{ latitude: 39.9525839, longitude: -75.1652215 }, // philadelphia
	{ latitude: 32.7766642, longitude: -96.7969879 }, // dallas
	{ latitude: 40.7127753, longitude: -74.0059728 }, // new york
	{ latitude: 34.0522342, longitude: -118.2436849 } // los angeles
];

const PointCloseToPhilly = {
	latitude: 40.143992,
	longitude: -75.704093
};

const Titles = ['Title A', 'Title B', 'Title C'];
const Industries = ['Industry A', 'Industry B', 'Industry C'];


const IndustryComponent = ScoreComponents[0];
const TitleComponent = ScoreComponents[1];
const LocationComponent = ScoreComponents[2];


const MaxLocationScore = LocationComponent.weight / TotalWeight;
const MaxTitleScore = TitleComponent.weight / TotalWeight;
const MaxIndustryScore = IndustryComponent.weight / TotalWeight;


describe('ScoreService', () => {
	describe('getUserScoreForProject()', () => {
		it('returns the user\'s score for a project', () => {
			var project = createProject({
				location: Points[0],
				titles: [Titles[0]],
				industries: [
					Industries[0]
				]
			});
			var user = createUser({
				location: Points[0]
			});
			expect(ScoreService.getUserScoreForProject(project, user)).to
				.eql(MaxLocationScore);

			user = createUser({
				location: Points[0],
				title: Titles[0]
			});
			expect(ScoreService.getUserScoreForProject(project, user)).to
				.eql(MaxLocationScore + MaxTitleScore);

			user = createUser({
				location: Points[0],
				title: Titles[0],
				industries: [Industries[0]]
			});
			expect(ScoreService.getUserScoreForProject(project, user)).to
				.eql(MaxLocationScore + MaxTitleScore + MaxIndustryScore);
		});
	});
});

describe('ScoreComponents', () => {
	describe('industry component', () => {
		it('gives no points if no industry matches', () => {
			var project = createProject({
				industries: [Industries[0], Industries[1]]
			});
			var user = createUser({
				industries: [Industries[2]]
			});

			expect(IndustryComponent.value(project, user)).to.eql(0);
		});
		it('gives half points for matching one of two industries', () => {
			var project = createProject({
				industries: [Industries[0], Industries[1]]
			});
			var user = createUser({
				industries: [Industries[0]]
			});

			expect(IndustryComponent.value(project, user)).to.eql(0.5);
		});
		it('gives full points for matching all project industries', () => {
			var project = createProject({
				industries: [Industries[0], Industries[1]]
			});
			var user = createUser({
				industries: [Industries[0], Industries[1]]
			});
			expect(IndustryComponent.value(project, user)).to.eql(1);
		});
	});
	describe('title component', () => {
		it('gives no points if title doesn\'t match', () => {
			var project = createProject({
				titles: [Titles[0], Titles[1]]
			});
			var user = createUser({
				title: Titles[2]
			});

			expect(TitleComponent.value(project, user)).to.eql(0);
		});
		it('gives full points for matching any project title', () => {
			var project = createProject({
				titles: [Titles[0], Titles[1]]
			});
			var user = createUser({
				title: Titles[1]
			});

			expect(TitleComponent.value(project, user)).to.eql(1);
		});
	});
	describe('location component', () => {
		it('gives no points if user is  doesn\'t match', () => {
			var project = createProject({
				location: Points[0]
			});
			var user = createUser({
				location: Points[1]
			});
			expect(LocationComponent.value(project, user)).to.eql(0);
		});
		it('gives full points when distance = 0', () => {
			var project = createProject({
				location: Points[0]
			});
			var user = createUser({
				location: Points[0]
			});

			expect(LocationComponent.value(project, user)).to.eql(1);
		});
		it('gives partial score when 0 < distance < MaxDistance', () => {
			var project = createProject({
				location: Points[0]
			});
			var user = createUser({
				location: PointCloseToPhilly // about 50km away
			});

			var score = LocationComponent.value(project, user);
			expect(score).to.be.gt(0);
			expect(score).to.be.lt(1);
		});
	});
});

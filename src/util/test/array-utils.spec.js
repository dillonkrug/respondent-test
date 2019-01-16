/* eslint-env mocha */
const { expect } = require('chai');


const { arrContains, arrMatchCount } = require('../array-utils');

describe('arrContains', () => {
	it('returns true when the item is in the array', () => {
		var item = 'b',
			arr = ['a', 'b', 'c'];

		expect(arrContains(arr, item)).to.eql(true);
	});
	it('returns false when the item is not in the array', () => {
		var item = 'd',
			arr = ['a', 'b', 'c'];

		expect(arrContains(arr, item)).to.eql(false);
	});
});

describe('arrMatchCount', () => {
	it('returns the number of matching items in the array', () => {
		var arr = ['a', 'b', 'c'];

		expect(arrMatchCount(arr, ['d'])).to.eql(0);
		expect(arrMatchCount(arr, ['a'])).to.eql(1);
		expect(arrMatchCount(arr, ['a', 'b'])).to.eql(2);
		expect(arrMatchCount(arr, ['a', 'd'])).to.eql(1);
		expect(arrMatchCount(arr, ['d', 'e'])).to.eql(0);
	});
});



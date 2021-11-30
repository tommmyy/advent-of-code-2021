const { firstRepeatableFrequency } = require('./day1');

describe('firstRepeatableFrequency', () => {
	it('should return 0', () => {
		expect(firstRepeatableFrequency([+1, -1])).toBe(0);
	});
});

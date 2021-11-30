const R = require('ramda');
const R_ = require('ramda-extension');
const addNumbers = R.useWith(R.add, [Number, Number]);

const sumFrequency = R.reduce(addNumbers, 0);

const findFirstFrequency = (frequency) => {
	const _iter = (init) => {
		const result = R.reduce(
			R.compose(
				(acc) => (R.includes(R.last(acc), R.init(acc)) ? R.reduced(R.last(acc)) : acc),
				(acc, x) => R.append(R.last(acc) + x, acc)
			),
			init
		)(frequency);

		return R_.isArray(result) ? _iter(result) : result;
	};
	return _iter([0]);
};

const firstRepeatableFrequency = R.compose(
	findFirstFrequency,
	R.map(Number)
);

module.exports = {
	sumFrequency,
	firstRepeatableFrequency,
	run: firstRepeatableFrequency,
};

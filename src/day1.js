import {
  append,
  compose,
  includes,
  init,
  last,
  map,
  reduce,
  reduced,
} from 'ramda';
import { isArray } from 'ramda-extension';

const findFirstFrequency = frequency => {
  const _iter = initCb => {
    const result = reduce(
      compose(
        acc => (includes(last(acc), init(acc)) ? reduced(last(acc)) : acc),
        (acc, x) => append(last(acc) + x, acc),
      ),
      initCb,
    )(frequency);

    return isArray(result) ? _iter(result) : result;
  };
  return _iter([0]);
};

export const firstRepeatableFrequency = compose(
  findFirstFrequency,
  map(Number),
);

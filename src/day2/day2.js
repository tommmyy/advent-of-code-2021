import { compose, map, match, multiply, reduce, take } from 'ramda';

const parse = compose(
  token => [token[1], Number(token[2])],
  match(/(\w+)\s(\d+)/),
);
const multiplyList = reduce(multiply, 1);

export const computeDepth = compose(
  multiplyList,
  reduce(
    ([depth, position], [command, value]) => {
      if (command === 'forward') {
        return [depth, position + value];
      } else if (command === 'up') {
        return [depth - value, position];
      } else if (command === 'down') {
        return [depth + value, position];
      } else {
        return [depth, position];
      }
    },
    [0, 0],
  ),
  map(parse),
);

export const computeAim = compose(
  multiplyList,
  take(2),
  reduce(
    ([depth, position, aim], [command, value]) => {
      if (command === 'forward') {
        return [depth + aim * value, position + value, aim];
      } else if (command === 'up') {
        return [depth, position, aim - value];
      } else if (command === 'down') {
        return [depth, position, aim + value];
      } else {
        return [depth, position, aim];
      }
    },
    [0, 0, 0],
  ),
  map(parse),
);

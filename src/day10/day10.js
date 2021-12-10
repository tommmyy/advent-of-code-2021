import { compose, filter, last, map, median, reduce, split, sum } from 'ramda';

const toTokens = split('');

const stackMapping = {
  '>': '<',
  ')': '(',
  '}': '{',
  ']': '[',
};
const stackMappingRev = {
  '<': '>',
  '(': ')',
  '{': '}',
  '[': ']',
};
const syntaxScoreMapping = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const autocompleteScoreMapping = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};
const autocomplete = stack => {
  let token;
  const autocompleted = [];
  while ((token = stack.pop())) {
    autocompleted.push(stackMappingRev[token]);
  }
  return autocompleted;
};

export const parseRow = inputString => {
  const tokens = toTokens(inputString);

  const stack = [];

  const next = token => {
    switch (token) {
      case '<':
      case '(':
      case '{':
      case '[': {
        stack.push(token);
        break;
      }
      case ']':
      case '}':
      case ')':
      case '>': {
        const expected = stackMapping[token];
        const onStack = last(stack);

        if (onStack === expected) {
          stack.pop(token);
        } else {
          throw { expected: stackMappingRev[onStack], invalid: token };
        }
        break;
      }
      default: {
        throw Error('Unexpected token.');
      }
    }
  };

  try {
    let token;
    while ((token = tokens.shift())) {
      next(token);
    }
    return { autocomplete: autocomplete(stack) };
  } catch (_e) {
    return _e;
  }
};

export const syntaxScoring = compose(
  sum,
  map(
    compose(x => (!x.invalid ? 0 : syntaxScoreMapping[x.invalid]), parseRow),
  ),
);

const computeAutocompleteScore = x =>
  reduce(
    (prev, token) => prev * 5 + autocompleteScoreMapping[token],
    0,
  )(x.autocomplete);

export const autocompleteScoring = compose(
  median,
  map(computeAutocompleteScore),
  filter(x => x.autocomplete),
  map(parseRow),
);

import { compose, map, reject, replace, split } from 'ramda';

export const parseCsv = txt =>
  compose(
    reject(x => x === ''),
    map(replace(/\s+/g, '')),
    split('\n'),
  )(txt);

export const stringToListOfNumbers = txt =>
  compose(map(Number), parseCsv)(txt);

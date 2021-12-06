import { compose, head, map, reject, split, trim } from 'ramda';

export const stringToList = txt =>
  compose(
    reject(x => x === ''),
    map(trim),
    split('\n'),
  )(txt);

export const stringToListOfNumbers = txt =>
  compose(map(Number), stringToList)(txt);

export const stringToNumbers = txt =>
  compose(head, map(compose(map(Number), split(','))), stringToList)(txt);

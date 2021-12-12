import {
  compose,
  concat,
  filter,
  forEach,
  last,
  length,
  map,
  reduce,
  reject,
  takeLast,
  toUpper,
  uniq,
} from 'ramda';

const isUpperCase = s => toUpper(s) === s;
const getAdjancent = edges => x =>
  compose(
    reject(x => x == null),
    map(([a, b]) => (a === x ? b : b === x ? a : null)),
  )(edges);

export const findAllPaths = edges => {
  const todo = [{ p: ['start'], u: true }];
  const paths = [];

  const canReturn = (prevPath, isUniq, x) => {
    if (isUpperCase(x)) {
      return true;
    }

    if (prevPath.indexOf(x) === -1) {
      return true;
    }

    if (isUniq) {
      return true;
    }

    return false;
  };

  while (todo.length) {
    const { p: currentPath, u } = todo.shift();

    const currentVertex = last(currentPath);

    if (currentVertex === 'end') {
      paths.push(currentPath);

      continue;
    }

    let adjancent = getAdjancent(edges)(currentVertex);
    let newU = u;

    if (newU) {
      const small = reject(x => isUpperCase(x) && x !== 'start')(currentPath);

      newU = u && small.length === uniq(small).length;
    }

    adjancent = reject(
      x => x === 'start' || !canReturn(currentPath, newU, x),
    )(adjancent);

    if (adjancent.length) {
      forEach(
        vertex => todo.push({ p: [...currentPath, vertex], u: newU }),
        adjancent,
      );
    }
  }

  return paths;
};

export const passagePathing = edges => compose(length, findAllPaths)(edges);

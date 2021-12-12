import {
  compose,
  forEach,
  last,
  map,
  reject,
  toUpper,
length,
} from 'ramda';

const isUpperCase = s => toUpper(s) === s;
const canReturn = (prevPath, x) => isUpperCase(x) || prevPath.indexOf(x) === -1;

export const findAllPaths = edges => {
  const todo = [['start']];
  const paths = [];
  while (todo.length) {
    const currentPath = todo.shift();

    const currentVertex = last(currentPath);

    if (currentVertex === 'end') {
      paths.push(currentPath);

      continue;
    }

    let adjancent = compose(
      reject(x => x == null || x === 'start'),
      map(([a, b]) =>
        a === currentVertex ? b : b === currentVertex ? a : null,
      ),
    )(edges);

    adjancent = reject(x => !canReturn(currentPath, x))(adjancent);

    if (adjancent.length) {
      forEach(vertex => todo.push([...currentPath, vertex]), adjancent);
    }
  }
  return paths;
};

export const passagePathing = edges => compose(length, findAllPaths)(edges);

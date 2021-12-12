import { compose, last, length, reduce, toUpper } from 'ramda';

const isUpperCase = s => toUpper(s) === s;
const SECOND_OCCURANCE = 'SECOND_OCCURANCE';

export const findAllPaths = edges => {
  const todo = [{ p: ['start'], u: true }];
  const paths = [];
  const adjMap = reduce(
    (acc, [a, b]) => ({
      ...acc,
      [a]: [...(acc[a] || []), b],
      [b]: [...(acc[b] || []), a],
    }),
    {},
    edges,
  );

  const canReturn = (prevPath, isUniq, x) => {
    if (x === 'start') {
      return false;
    }

    if (isUpperCase(x)) {
      return true;
    }

    if (prevPath.indexOf(x) === -1) {
      return true;
    } else {
      if (isUniq) {
        return SECOND_OCCURANCE;
      } else {
        return false;
      }
    }
  };

  let i = 0;
  while (todo.length) {
    i++;
    const { p: currentPath, u } = todo.shift();

    const currentVertex = last(currentPath);

    if (currentVertex === 'end') {
      paths.push(currentPath);

      continue;
    }

    const A = adjMap[currentVertex];

    for (let i = 0; i < A.length; i++) {
      const vertex = A[i];
      const returnCode = canReturn(currentPath, u, vertex);

      if (returnCode) {
        todo.push({
          p: [...currentPath, vertex],
          u: u && returnCode !== SECOND_OCCURANCE,
        });
      }
    }
  }
  console.log(`paths: ${i}`);
  return paths;
};

export const passagePathing = edges => compose(length, findAllPaths)(edges);

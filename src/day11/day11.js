const getN = (data, x, y) =>
  [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x - 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y],
    [x + 1, y - 1],
    [x + 1, y + 1],
  ].filter(([x, y]) => {
    try {
      return typeof data[y][x] === 'number';
    } catch (_e) {
      return false;
    }
  });

// FIXME: immutable
export const iterate = x => {
  const nextState = [...x];
  const flashes = [];
  let totalFlashes = 0;

  for (let y = 0; y < nextState.length; y++) {
    for (let x = 0; x < nextState[y].length; x++) {
      nextState[y][x]++;

      if (nextState[y][x] > 9) {
        totalFlashes++;
        flashes.push([x, y]);
      }
    }
  }

  while (flashes.length) {
    const flash = flashes.shift();

    // eslint-disable-next-line no-loop-func
    getN(nextState, ...flash).forEach(([x, y]) => {
      if (nextState[y][x] < 10) {
        nextState[y][x]++;

        if (nextState[y][x] > 9) {
          totalFlashes++;
          flashes.push([x, y]);
        }
      }
    });
  }

  let sum = 0;
  for (let y = 0; y < nextState.length; y++) {
    for (let x = 0; x < nextState[y].length; x++) {
      if (nextState[y][x] > 9) {
        nextState[y][x] = 0;
      }
      sum += nextState[y][x];
    }
  }

  return [nextState, totalFlashes, sum];
};

export const dumboOctopus = (x, is) => {
  let nextState = [...x];
  let totalFlashes = 0;

  while (is > 0) {
    const [state, flashes] = iterate(nextState);
    nextState = state;
    totalFlashes += flashes;
    is--;
  }
  return totalFlashes;
};

export const dumboOctopus2 = x => {
  let nextState = [...x];
  let iteration = 0;

  while (true) {
    iteration++;
    const [state, , sum] = iterate(nextState);
    if (sum === 0) {
      break;
    }
    nextState = state;
  }

  return iteration;
};

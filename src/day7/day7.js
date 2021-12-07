export const treacheryOfWhales = data => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  let minFuel = Infinity;

  for (let i = min; i <= max; i++) {
    let fuel = 0;
    for (let j = 0; j < data.length; j++) {
      fuel += Math.abs(data[j] - i);
    }
    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }
  return minFuel;
};

// Prebuffer
const getComputeCost = bufferTo => {
  const sumSequence = {};
  let fuel = 0;
  for (let j = 0; j <= bufferTo; j++) {
    sumSequence[j] = fuel += j;
  }

  return (from, to) => sumSequence[Math.abs(from - to)];
};

export const treacheryOfWhales2 = data => {
  const min = Math.min(...data);
  const max = Math.max(...data);

  const computeCost = getComputeCost(max - min);

  let minFuel = Infinity;
  for (let level = min; level <= max; level++) {
    let fuel = 0;
    for (let i = 0; i < data.length; i++) {
      fuel += computeCost(data[i], level);
    }

    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }
  return minFuel;
};

// NOTE: Triangle number
const computeCost = (from, to) => {
  const x = Math.abs(from - to);
  return (x * (x + 1)) / 2;
};

export const treacheryOfWhales2Opt = data => {
  const min = Math.min(...data);
  const max = Math.max(...data);

  let minFuel = Infinity;

  // We do not need compute MAX, but I don't like infinite while-loops.
  for (let level = min; level <= max; level++) {
    let fuel = 0;
    for (let i = 0; i < data.length; i++) {
      fuel += computeCost(data[i], level);
    }

    if (fuel < minFuel) {
      minFuel = fuel;
    } else {
      // NOTE: once the sequence stops declining we found optimum
      break;
    }
  }
  return minFuel;
};

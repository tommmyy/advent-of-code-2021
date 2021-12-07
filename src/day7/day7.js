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

const getComputeCost = bufferTo => {
  const sumSequence = {};
  let fuel = 0;

  for (let j = 0; j <= bufferTo; j++) {
    fuel += j;
    sumSequence[j] = fuel;
  }

  return (from, to) => {
    const steps = Math.abs(from - to);
    return sumSequence[steps];
  };
};

export const treacheryOfWhalesCostly = data => {
  const min = Math.min(...data);
  const max = Math.max(...data);

  const computeCost = getComputeCost(max - min);

  let minFuel = Infinity;
  for (let i = min; i <= max; i++) {
    let fuel = 0;
    for (let j = 0; j < data.length; j++) {
      fuel += computeCost(data[j], i);
    }
    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }
  return minFuel;
};

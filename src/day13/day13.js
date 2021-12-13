const solveInstruction = (instruction, input) => {
  const [, axis, coordStr] = /([xy])\=([0-9]+)/g.exec(instruction);
  const coord = Number(coordStr);
  const nextPoints = [];
  const nextPointsMap = {};

  for (let j = 0; j < input.length; j++) {
    const p = input[j];
    const nextP = [p[0], p[1]];

    if (axis === 'x') {
      if (p[0] > coord) {
        nextP[0] = coord - (p[0] - coord);
      }
    }
    if (axis === 'y') {
      if (p[1] > coord) {
        nextP[1] = coord - (p[1] - coord);
      }
    }
    const k = nextP.join(',');
    if (!nextPointsMap[k]) {
      nextPointsMap[k] = true;
      nextPoints.push(nextP);
    }
  }
  return nextPoints;
};

export const transparentOrigami = ({ points, instructions }) =>
  solveInstruction(instructions[0], points).length;

export const transparentOrigami2 = ({ points, instructions }) => {
  let output = points;

  for (let i = 0; i < instructions.length; i++) {
    output = solveInstruction(instructions[i], output);
  }

  return output;
};
export const display = points => {
  const yMax = points.reduce((acc, [, y]) => Math.max(acc, y), -Infinity);
  const xMax = points.reduce((acc, [x]) => Math.max(acc, x), -Infinity);

  const o = Array(yMax + 1)
    .fill()
    .map(() => Array(xMax + 1).fill('.'));

  points.forEach(([x, y]) => (o[y][x] = '#'));

  return o.map(x => x.join('')).join('\n');
};

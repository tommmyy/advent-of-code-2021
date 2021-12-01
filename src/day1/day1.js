import { compose, slice, sum } from 'ramda';

export const computeDepth = numbers => {
  let result = 0;
  for (let i = 1, l = numbers.length; i < l; i++) {
    if (numbers[i] > numbers[i - 1]) {
      result++;
    }
  }
  return result;
};

const sumSlice = compose(sum, slice);

export const computeDepthFrames = numbers => {
  const frame = 3;
  let result = 0;
  let prevSum = null;

  for (let i = frame, l = numbers.length; i <= l; i++) {
    const currentSum = sumSlice(i - frame, i, numbers);

    if (prevSum !== null && currentSum > prevSum) {
      result++;
    }

    prevSum = currentSum;
  }
  return result;
};

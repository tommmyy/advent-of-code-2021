import { forEach } from 'ramda';

export const lanternFish = (initialState, days) => {
  let state = initialState;

  while (days--) {
    const newFishState = [];
    const currentFishState = [];

    for (let i = 0; i < state.length; i++) {
      const age = state[i] - 1;

      if (age < 0) {
        currentFishState.push(6);
        newFishState.push(8);
      } else {
        currentFishState.push(age);
      }
    }
    state = [...currentFishState, ...newFishState];
  }
  return state.length;
};

const INCUBATOR_TIME = 7;
const INCUBATOR_TIME_FIRST_TIME = INCUBATOR_TIME + 2;

export const countFish = remainingTime => {
  const cacheFish = {};
  const _countFish = remainingTime => {
    if (remainingTime < 0) {
      return 0;
    }

    if (cacheFish.hasOwnProperty(remainingTime)) {
      return cacheFish[remainingTime];
    }
    let total = 0;

    total += 1 + _countFish(remainingTime - INCUBATOR_TIME_FIRST_TIME);

    const k = Math.floor(
      (remainingTime - INCUBATOR_TIME_FIRST_TIME) / INCUBATOR_TIME,
    );

    if (k > 0) {
      let i = 1;
      while (k >= i) {
        total += _countFish(
          remainingTime - INCUBATOR_TIME_FIRST_TIME - INCUBATOR_TIME * i,
        );
        i++;
      }
    }

    cacheFish[remainingTime] = total;

    return total;
  };

  return _countFish(remainingTime);
};

export const lanternFishOpt = (initialStateIn, days) => {
  const initialState = [...initialStateIn];
  let total = initialState.length;

  forEach(state => {
    let t = state + 1;

    while (t <= days) {
      total += countFish(days - t);
      t += INCUBATOR_TIME;
    }
  }, initialState);

  return total;
};

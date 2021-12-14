const replace = (rulesMap, word) => {
  let nextWord = '';
  for (let i = 1; i < word.length; i++) {
    const matchSymbol = rulesMap[word[i - 1] + word[i]] || '';
    if (i === 1) {
      nextWord += word[i - 1] + matchSymbol + word[i];
    } else {
      nextWord += matchSymbol + word[i];
    }
  }
  return nextWord;
};

const lSystem = (rules, iword, iterations) => {
  const rulesMap = rules.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  let i = iterations;
  let word = iword;
  while (i--) {
    word = replace(rulesMap, word);
  }
  return word;
};

export const polymer = (rules, word, iterations) => {
  const result = lSystem(rules, word, iterations);

  const { min, max } = Object.values(
    result.split('').reduce((acc, next) => {
      acc[next] = (acc[next] || 0) + 1;
      return acc;
    }, {}),
  ).reduce(
    (acc, next) => {
      if (next < acc.min) {
        acc.min = next;
      }

      if (next > acc.max) {
        acc.max = next;
      }
      return acc;
    },
    { min: Infinity, max: -Infinity },
  );
  return max - min;
};

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

export const polymerO = (rules, word, iterations) => {
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

const replace2 = (stats, rules) => {
  const newStats = {};

  Object.entries(stats).forEach(([key, value]) => {
    const symbol = rules[key];
    if (!symbol) {
      console.log('???????????????????????????');
    }
    newStats[key[0] + symbol] = (newStats[key[0] + symbol] || 0) + value;
    newStats[symbol + key[1]] = (newStats[symbol + key[1]] || 0) + value;
  });
  return newStats;
};

const noSystem = (rules, word, iterations) => {
  const rulesMap = rules.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  let stats = {};

  for (let i = 1; i < word.length; i++) {
    stats[word[i - 1] + word[i]] = 1;
  }

  while (iterations--) {
    stats = replace2(stats, rulesMap);
  }
  return stats;
};

export const polymer = (rules, word, iterations) => {
  const result = noSystem(rules, word, iterations);

  const sums = Object.entries(result).reduce((acc, [key, numOfOccurences]) => {
    const [a, b] = key.split('');
    acc[a] = (acc[a] || 0) + numOfOccurences;
    acc[b] = (acc[b] || 0) + numOfOccurences;
    return acc;
  }, {});

  const { max, min } = Object.entries(sums)
    .map(([key, value]) => {
      const x = key === 'N' || key === 'B' ? value + 1 : value;
      // return [key, x / 2];
      return x / 2;
    })
    .reduce(
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
  return Math.ceil(max - min);
};

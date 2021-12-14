const replace = (stats, rules) => {
  const newStats = {};

  Object.entries(stats).forEach(([key, value]) => {
    const symbol = rules[key];
    newStats[key[0] + symbol] = (newStats[key[0] + symbol] || 0) + value;
    newStats[symbol + key[1]] = (newStats[symbol + key[1]] || 0) + value;
  });
  return newStats;
};

const getPolymerString = (rules, word, iterations) => {
  const rulesMap = rules.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  let stats = {};

  for (let i = 1; i < word.length; i++) {
    stats[word[i - 1] + word[i]] = 1;
  }

  while (iterations--) {
    stats = replace(stats, rulesMap);
  }
  return stats;
};

export const polymer = (rules, word, iterations) => {
  const result = getPolymerString(rules, word, iterations);

  const sums = Object.entries(result).reduce((acc, [pair, numOfOccurences]) => {
    const [a, b] = pair.split('');
    acc[a] = (acc[a] || 0) + numOfOccurences;
    acc[b] = (acc[b] || 0) + numOfOccurences;
    return acc;
  }, {});

  const isAtEnd = symbol =>
    symbol === word[0] || symbol === word[word.length - 1];

  const { max, min } = Object.entries(sums).reduce(
    (acc, [symbol, value]) => {
      const numOfOccurences = (value + Number(isAtEnd(symbol))) / 2;

      if (numOfOccurences < acc.min) {
        acc.min = numOfOccurences;
      }

      if (numOfOccurences > acc.max) {
        acc.max = numOfOccurences;
      }

      return acc;
    },
    { min: Infinity, max: -Infinity },
  );
  return max - min;
};

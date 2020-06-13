function getRandomInt(max = 0, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomNumbers({
  max = 0,
  min = 0,
  amount = 0,
  excluded = [],
} = {}) {
  if (max < min) {
    throw Error('max has to be greater than min');
  }

  if (max - min - excluded.length < amount) {
    throw Error('can\'t suffice amount condition');
  }

  const results = [];

  for (let i = 0; i < amount; i += 1) {
    let number = 0;
    let shouldRandomiseNumber = true;
    while (shouldRandomiseNumber) {
      number = getRandomInt(max, min);
      shouldRandomiseNumber = results.includes(number) || excluded.includes(number);
    }
    results.push(number);
  }
  return results;
}
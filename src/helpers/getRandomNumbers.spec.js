import { getRandomNumbers } from './getRandomNumbers';

describe('Get Random numbers helpers', () => {
  test('should throw error, due to max lesser than min', () => {
    expect(() => {
      getRandomNumbers({
        min: 10,
        max: 0,
      });
    }).toThrow();
  });

  test('should throw error, due to too low amount condition', () => {
    expect(() => {
      getRandomNumbers({
        min: 0,
        max: 5,
        amount: 7,
      });
    }).toThrow();
  });

  test('should throw error, due to too low amount condition and too many excluded elements', () => {
    expect(() => {
      getRandomNumbers({
        min: 0,
        max: 5,
        amount: 2,
        excluded: [1, 2, 3, 4, 5],
      });
    }).toThrow();
  });

  test('should return 4 unique numbers', () => {
    const config = {
      min: 0,
      max: 10,
      amount: 4,
    };

    const results = getRandomNumbers(config);
    expect(results.length).toBe(config.amount);
    results.forEach((number, index) => {
      expect(results.slice(index + 1)).not.toContain(number);
    });
  });

  test('should return all possible numbers', () => {
    const config = {
      min: 0,
      max: 10,
      excluded: [1, 2, 3, 4, 5, 9, 10],
      amount: 4,
    };
    const results = getRandomNumbers(config);

    expect(results.length).toBe(config.amount);
    results.forEach((number, index) => {
      expect(config.excluded).not.toContain(number);
      expect(results.slice(index + 1)).not.toContain(number);
    });
  });
});